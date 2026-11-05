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

import java.util.List;
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

    public PedidoDeclaracaoService(
            PedidoDeclaracaoRepository pedidoRepositorio,
            EstudanteRepository estudanteRepositorio,
            UsuarioRepository usuarioRepositorio,
            AnexoRepository anexoRepositorio,
            HistoricoAuditoriaRepository auditoriaRepositorio,
            ArmazenamentoService armazenamentoR2, AnexoService anexoService) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.estudanteRepositorio = estudanteRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.anexoRepositorio = anexoRepositorio;
        this.auditoriaRepositorio = auditoriaRepositorio;
        this.armazenamentoR2 = armazenamentoR2;
        this.anexoService = anexoService;
    }

    @Transactional
    public PedidoDeclaracaoRespostaDto criarPedido(Long idEstudante, MultipartFile ficheiroBi, MultipartFile ficheiroComprovativo) {
        Estudante estudante = estudanteRepositorio.findById(idEstudante)
                .orElseThrow(() -> new RuntimeException("Estudante não encontrado com o ID: " + idEstudante));

        String codigo = gerarCodigoUnico(estudante);
        PedidoDeclaracao pedido = PedidoDeclaracao.builder()
                .codigo(codigo)
                .estudante(estudante)
                .estado(EstadoPedido.PENDENTE)
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
        return String.format("%s%s%s", primeiraLetra, segundaLetra, estudante.getNumeroProcesso());
    }

    @Transactional
    public PedidoDeclaracaoRespostaDto atualizarEstado(Long idPedido, PedidoAtualizacaoEstadoDto dto) {
        PedidoDeclaracao pedido = pedidoRepositorio.findById(idPedido)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado com o ID: " + idPedido));

        Usuario atendente = usuarioRepositorio.findById(dto.idAtendente())
                .orElseThrow(() -> new NotFoundException("Atendente não encontrado com o ID: " + dto.idAtendente()));

        EstadoPedido estadoAnterior = pedido.getEstado();
        pedido.setEstado(dto.novoEstado());

        PedidoDeclaracao pedidoAtualizado = pedidoRepositorio.save(pedido);

        // Registar na auditoria
        HistoricoAuditoria auditoria = HistoricoAuditoria.builder()
                .pedidoDeclaracao(pedidoAtualizado)
                .atendente(atendente)
                .estadoAnterior(estadoAnterior)
                .estadoAtual(dto.novoEstado())
                .comentario(dto.comentario())
                .build();
        auditoriaRepositorio.save(auditoria);

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
                p.getEstado(),
                p.getMotivoRejeicao(),
                p.getCriadoEm(),
                p.getAtualizadoEm(),
                anexosDto
        );
    }
}