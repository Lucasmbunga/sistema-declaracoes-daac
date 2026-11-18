package ao.co.unikivi.daac_backend.service;


import ao.co.unikivi.daac_backend.domain.entity.*;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import ao.co.unikivi.daac_backend.domain.enums.TipoDocumento;
import ao.co.unikivi.daac_backend.dto.*;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class PedidoDeclaracaoService {

    private final PedidoDeclaracaoRepository pedidoRepositorio;
    private final EstudanteRepository estudanteRepositorio;
    private final UsuarioRepository usuarioRepositorio;
    private final AnexoRepository anexoRepositorio;
    private final HistoricoAuditoriaRepository auditoriaRepositorio;
    private final ArmazenamentoService armazenamentoR2;
    private final AnexoService anexoService;
    private final HistoricoAuditoriaService historicoAuditoriaService;

    public PedidoDeclaracaoService(
            PedidoDeclaracaoRepository pedidoRepositorio,
            EstudanteRepository estudanteRepositorio,
            UsuarioRepository usuarioRepositorio,
            AnexoRepository anexoRepositorio,
            HistoricoAuditoriaRepository auditoriaRepositorio,
            ArmazenamentoService armazenamentoR2, AnexoService anexoService,HistoricoAuditoriaService historicoAuditoriaService) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.estudanteRepositorio = estudanteRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.anexoRepositorio = anexoRepositorio;
        this.auditoriaRepositorio = auditoriaRepositorio;
        this.armazenamentoR2 = armazenamentoR2;
        this.anexoService = anexoService;
        this.historicoAuditoriaService=historicoAuditoriaService;
    }

    @Transactional
    public PedidoDeclaracaoRespostaDto criarPedido(PedidoCriacaoDto dto, MultipartFile ficheiroBi, MultipartFile ficheiroComprovativo) {
        Estudante estudante = estudanteRepositorio.findById(dto.idEstudante())
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado "));

        String codigo = gerarCodigoUnico(estudante);
        PedidoDeclaracao pedido = PedidoDeclaracao.builder()
                .codigo(codigo)
                .estudante(estudante)
                .estado(EstadoPedido.PENDENTE)
                .anoFrequencia(dto.anoFrequencia())
                .anoLetivo(dto.anoLetivo())
                .dataEmissaoBi(dto.dataEmissaoBi())
                .dataNascimento(dto.dataNascimento())
                .efeitoDeclaracao(dto.efeitoDeclaracao())
                .nomeMae(dto.nomeMae())
                .nomePai(dto.nomePai())
                .numeroBi(estudante.getNumeroBi())
                .build();

        PedidoDeclaracao pedidoSalvo = pedidoRepositorio.save(pedido);

        String urlBi = armazenamentoR2.carregarFicheiro(ficheiroBi, "documentos/bi");
        Anexo AnexoBi = anexoService.salvarAnexo(pedidoSalvo, TipoDocumento.COPIA_BI, urlBi, ficheiroBi.getOriginalFilename());

        String urlComprovativo = armazenamentoR2.carregarFicheiro(ficheiroComprovativo, "documentos/comprovativos");
        Anexo AnexoComp = anexoService.salvarAnexo(pedidoSalvo, TipoDocumento.COMPROVATIVO_PAGAMENTO, urlComprovativo, ficheiroComprovativo.getOriginalFilename());

        return mapearParaDto(pedidoSalvo);
    }

    private String gerarCodigoUnico(Estudante estudante) {
        int posiSegundaLetra = estudante.getUsuario().getNomeCompleto().lastIndexOf(" ");
        char primeiraLetra = estudante.getUsuario().getNomeCompleto().charAt(0);
        char segundaLetra = estudante.getUsuario().getNomeCompleto().charAt(posiSegundaLetra+1);
        return String.format("%s%s%s%d", primeiraLetra, segundaLetra, estudante.getNumeroProcesso(), LocalDate.now().getYear());
    }

    @Transactional
    public PedidoDeclaracaoRespostaDto atualizarEstado(Long idPedido, PedidoAtualizacaoEstadoDto dto) {
        PedidoDeclaracao pedido = pedidoRepositorio.findById(idPedido)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado com o ID: " + idPedido));

        Usuario atendente = usuarioRepositorio.findById(dto.idAtendente())
                .orElseThrow(() -> new NotFoundException("Atendente não encontrado com o ID: " + dto.idAtendente()));

        EstadoPedido estadoAtual = pedido.getEstado();
        EstadoPedido novoEstado = dto.novoEstado();

        // 1. Estados terminais (imutáveis) não podem ser alterados
        if (estadoAtual == EstadoPedido.ENTREGUE || estadoAtual == EstadoPedido.REJEITADO) {
            throw new IllegalStateException("Não é possível alterar o estado de um pedido que já se encontra " + estadoAtual);
        }

        // 2. Validações restritas para Rejeição
        if (novoEstado == EstadoPedido.REJEITADO) {
            if (estadoAtual != EstadoPedido.PENDENTE) {
                throw new IllegalStateException("Um pedido só pode ser rejeitado enquanto estiver no estado PENDENTE.");
            }
            if (dto.comentario() == null || dto.comentario().isBlank()) {
                throw new IllegalArgumentException("O motivo/comentário é obrigatório para rejeitar um pedido.");
            }
        }

        // 3. Validação estrita da progressão sequencial de estados
        if (estadoAtual == EstadoPedido.PENDENTE && novoEstado != EstadoPedido.AGUARDANDO_ASSINATURA && novoEstado != EstadoPedido.REJEITADO) {
            throw new IllegalStateException("Um pedido PENDENTE apenas pode transitar para AGUARDANDO_ASSINATURA ou REJEITADO.");
        }

        if (estadoAtual == EstadoPedido.AGUARDANDO_ASSINATURA && novoEstado != EstadoPedido.DISPONIVEL) {
            throw new IllegalStateException("Um pedido em AGUARDANDO_ASSINATURA apenas pode transitar para DISPONIVEL.");
        }

        if (estadoAtual == EstadoPedido.DISPONIVEL && novoEstado != EstadoPedido.ENTREGUE) {
            throw new IllegalStateException("Um pedido DISPONÍVEL apenas pode transitar para ENTREGUE.");
        }

        // Atualiza o estado com segurança
        pedido.setEstado(novoEstado);
        PedidoDeclaracao pedidoAtualizado = pedidoRepositorio.save(pedido);

        // Registra na auditoria de forma limpa e única
        historicoAuditoriaService.registar(
                pedidoAtualizado,
                atendente,
                estadoAtual,
                novoEstado,
                dto.comentario()
        );

        return mapearParaDto(pedidoAtualizado);
    }

    @Transactional(readOnly = true)
    public List<PedidoDeclaracaoRespostaDto> listarTodos() {
        return pedidoRepositorio.findAll().stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PedidoDeclaracaoRespostaDto buscarPorId(Long id) {
        PedidoDeclaracao pedido = pedidoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado com o ID: " + id));
        return mapearParaDto(pedido);
    }

    public List<PedidoDeclaracaoRespostaDto> obterPedidosPorEstado(EstadoPedido estadoPedido){
        var pedidos=pedidoRepositorio.findByEstado(estadoPedido).stream().map(this::mapearParaDto).toList();
        return pedidos;
    }
    public FilaMetricasDto obterMetricasFila() {
        long aAnalisar = pedidoRepositorio.findByEstado(EstadoPedido.PENDENTE).size();
        long aguardandoAssinatura = pedidoRepositorio.findByEstado(EstadoPedido.AGUARDANDO_ASSINATURA).size();
        long devolvidos = pedidoRepositorio.findByEstado(EstadoPedido.REJEITADO).size();

        LocalDate hoje = LocalDate.now();
        LocalDateTime inicioDia = hoje.atStartOfDay();
        LocalDateTime fimDia = hoje.plusDays(1).atStartOfDay();
        long disponiveisHoje = pedidoRepositorio.contarDisponibilizadosNoPeriodo(inicioDia, fimDia);

        return new FilaMetricasDto(aAnalisar, aguardandoAssinatura, disponiveisHoje, devolvidos);
    }

    public List<PedidoDeclaracaoRespostaDto> obterPedidosPorIdEstudante(Long idEstudante){
        var estudantes=pedidoRepositorio.findByEstudanteUsuarioId(idEstudante).stream().map(this::mapearParaDto).toList();
        return estudantes;

    }
    @Transactional(readOnly = true)
    public List<PedidoAprovadoRespostaDto> listarPedidosAprovadosParaImpressao() {
        List<PedidoDeclaracao> pedidos = pedidoRepositorio.findByEstado(EstadoPedido.AGUARDANDO_ASSINATURA);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d 'de' MMMM 'de' yyyy", new Locale("pt", "PT"));

        return pedidos.stream().map(p -> new PedidoAprovadoRespostaDto(
                p.getId(),
                p.getEstudante().getUsuario().getNomeCompleto(),
                p.getCodigo(),
                p.getEstudante().getNumeroMecanog(),
                // Ajusta para o teu atributo que define o tipo de declaração
                "Declaração de Frequência",
                p.getCriadoEm() != null ? p.getCriadoEm().format(formatter) : "Data indisponível",
                p.getEstado()
        )).toList();
    }

    private PedidoDeclaracaoRespostaDto mapearParaDto(PedidoDeclaracao p) {
        List<Anexo> anexos = anexoRepositorio.findByPedidoDeclaracaoId(p.getId());
        List<AnexoRespostaDto> anexosDto = anexos.stream()
                .map(a -> new AnexoRespostaDto(a.getId(), a.getTipoDocumento(), a.getUrlDocumento(), a.getNome(), a.getCarregadoEm()))
                .collect(Collectors.toList());

        return new PedidoDeclaracaoRespostaDto(
                p.getId(),
                p.getCodigo(),
                p.getEstudante().getId(),
                p.getEstudante().getUsuario().getNomeCompleto(),
                p.getEstudante().getNumeroMecanog(),
                p.getEstudante().getNumeroProcesso(),
                p.getEstudante().getCurso().getNome(),
                p.getEstado(),
                p.getMotivoRejeicao(),
                p.getCriadoEm(),
                p.getAtualizadoEm(),
                anexosDto,
                p.getEfeitoDeclaracao(),
                p.getNomePai(),
                p.getNomeMae(),
                p.getDataNascimento(),
                p.getNumeroBi(),
                p.getDataEmissaoBi(),
                p.getAnoFrequencia(),
                p.getAnoLetivo()
        );
    }
}