package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.domain.entity.DeclaracaoGerada;
import ao.co.unikivi.daac_backend.domain.entity.Estudante;
import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.DeclaracaoGeradaRepository;
import ao.co.unikivi.daac_backend.repository.EstudanteRepository;
import ao.co.unikivi.daac_backend.repository.PedidoDeclaracaoRepository;
import ao.co.unikivi.daac_backend.util.ByteArrayMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Year;
import java.time.format.DateTimeFormatter;

@Service
public class DeclaracaoGeracaoService {

    private final PedidoDeclaracaoRepository pedidoRepositorio;
    private final DeclaracaoGeradaRepository declaracaoGeradaRepositorio;
    private final PdfGeradorService pdfGeradorServico;
    private final ArmazenamentoService armazenamentoService; // O teu serviço existente do Cloudflare R2
    private final EstudanteRepository estudanteRepository;

    public DeclaracaoGeracaoService(
            PedidoDeclaracaoRepository
                    pedidoRepositorio,
            DeclaracaoGeradaRepository declaracaoGeradaRepositorio,
            PdfGeradorService pdfGeradorServico,
            ArmazenamentoService armazenamentoService,EstudanteRepository estudanteRepository) {
        this.pedidoRepositorio = pedidoRepositorio;
        this.declaracaoGeradaRepositorio = declaracaoGeradaRepositorio;
        this.pdfGeradorServico = pdfGeradorServico;
        this.armazenamentoService = armazenamentoService;
        this.estudanteRepository=estudanteRepository;
    }

    @Transactional
    public DeclaracaoGerada gerarEArmazenarDeclaracao(Long idPedido) {
        PedidoDeclaracao pedido = pedidoRepositorio.findById(idPedido)
                .orElseThrow(() -> new NotFoundException("Pedido não encontrado com o ID: " + idPedido));

        // Verificar se já existe declaração gerada para este pedido
        var existente = declaracaoGeradaRepositorio.findByPedidoId(idPedido);
        if (existente.isPresent()) {
            return existente.get();
        }

        // Gerar número de declaração único formatado (Ex: 0462/DAAC/IP/2026)
        String anoAtual = String.valueOf(Year.now().getValue());
        String numeroDeclaracao = String.format("%04d/DAAC/IP/%s", pedido.getId(), anoAtual);

        // 1. Gerar os bytes do PDF com base no modelo oficial
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        String dataNascimentoStr = pedido.getDataNascimento() != null
                ? pedido.getDataNascimento().format(fmt)
                : "---";
        String dataEmissaoBiStr = pedido.getDataEmissaoBi() != null
                ? pedido.getDataEmissaoBi().format(fmt)
                : "---";

// Busca o curso associado ao estudante (ou usa o curso do pedido)
        Estudante estudante = estudanteRepository.findById(pedido.getEstudante().getId()).orElseThrow(()->new NotFoundException("Estudante nao encontrado"));

        byte[] pdfBytes = pdfGeradorServico.gerarDeclaracaoFrequenciaPdf(
                numeroDeclaracao,
                pedido.getEfeitoDeclaracao(),
                pedido.getEstudante().getUsuario().getNomeCompleto(),
                pedido.getNomePai(),
                pedido.getNomeMae(),
                dataNascimentoStr,
                pedido.getNumeroBi(),
                dataEmissaoBiStr,
                pedido.getEstudante().getNumeroMecanog(),
                pedido.getAnoFrequencia(),
                pedido.getEstudante().getCurso().getNome(),
                pedido.getAnoLetivo(),
                "Kavadiambuko   Maleka Lutandila Msc.",
                "Makiese Mavakala MSc."
        );

        // 2. Converter os bytes para MultipartFile usando a nossa classe utilitária
        String nomeFicheiro = numeroDeclaracao.replace("/", "_") + ".pdf";
        MultipartFile multipartFile = new ByteArrayMultipartFile(pdfBytes, nomeFicheiro, "application/pdf");

        // 3. Enviar para o R2 usando o teu método existente
        String urlR2 = armazenamentoService.carregarFicheiro(multipartFile, "declaracoes");

        // 4. Salvar os metadados na base de dados
        DeclaracaoGerada declaracao = DeclaracaoGerada.builder()
                .numeroDeclaracao(numeroDeclaracao)
                .idEstudante(pedido.getEstudante().getId())
                .nomeEstudante(pedido.getEstudante().getUsuario().getNomeCompleto())
                .urlArmazenamentoR2(urlR2)
                .pedido(pedido)
                .build();

        return declaracaoGeradaRepositorio.save(declaracao);
    }
    public String gerarUrlTemporariaPorPedido(Long idPedido) {
        DeclaracaoGerada declaracao = declaracaoGeradaRepositorio.findByPedidoId(idPedido)
                .orElseThrow(() -> new NotFoundException("Nenhuma declaração gerada encontrada para o pedido ID: " + idPedido));

        return armazenamentoService.obterUrlTemporaria(declaracao.getUrlArmazenamentoR2());
    }
}