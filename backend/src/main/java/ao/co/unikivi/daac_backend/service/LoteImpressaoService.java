package ao.co.unikivi.daac_backend.service;


import ao.co.unikivi.daac_backend.dto.GerarLoteDto;
import ao.co.unikivi.daac_backend.domain.entity.LoteImpressao;
import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import ao.co.unikivi.daac_backend.dto.LoteMetricasDto;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.LoteImpressaoRepository;
import ao.co.unikivi.daac_backend.repository.PedidoDeclaracaoRepository;
import ao.co.unikivi.daac_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoteImpressaoService {

    private final LoteImpressaoRepository loteRepositorio;
    private final PedidoDeclaracaoRepository pedidoRepositorio;
    private final UsuarioRepository usuarioRepositorio;
    private final HistoricoAuditoriaService historicoAuditoriaService;
    DeclaracaoGeracaoService    declaracaoGeracaoService;

    public LoteImpressaoService(
            LoteImpressaoRepository loteRepositorio,
            PedidoDeclaracaoRepository pedidoRepositorio,
            UsuarioRepository usuarioRepositorio,
            HistoricoAuditoriaService historicoAuditoriaService,DeclaracaoGeracaoService    declaracaoGeracaoService) {
        this.loteRepositorio = loteRepositorio;
        this.pedidoRepositorio = pedidoRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.historicoAuditoriaService=historicoAuditoriaService;
        this.declaracaoGeracaoService=declaracaoGeracaoService;

    }

    // No LoteImpressaoServico.java
    public LoteMetricasDto obterMetricas() {
        long aguardam = pedidoRepositorio.findByEstado(EstadoPedido.AGUARDANDO_ASSINATURA).size();

        LocalDate hoje = LocalDate.now();
        LocalDateTime inicioDia = hoje.atStartOfDay(); // Ex: 2026-11-16T00:00:00
        LocalDateTime fimDia = hoje.plusDays(1).atStartOfDay(); // Ex: 2026-11-17T00:00:00

        long disponibilizadosHoje = pedidoRepositorio.contarDisponibilizadosNoPeriodo(inicioDia, fimDia);

        return new LoteMetricasDto(aguardam, disponibilizadosHoje);
    }

    @Transactional
    public String gerarLote(GerarLoteDto dto) {
        Usuario atendente = usuarioRepositorio.findById(dto.idAtendente())
                .orElseThrow(() -> new NotFoundException("Atendente não encontrado com o ID: " + dto.idAtendente()));

        List<PedidoDeclaracao> pedidos = pedidoRepositorio.findAllById(dto.idsPedidos());

        if (pedidos.isEmpty()) {
            throw new IllegalArgumentException("Nenhum pedido encontrado para os IDs fornecidos.");
        }

        // Criar o Lote de Impressao
        LoteImpressao lote = LoteImpressao.builder()
                .atendente(atendente)
                .build();

        LoteImpressao loteSalvo = loteRepositorio.save(lote);

        // Atualizar cada pedido para o estado DISPONIVEL e associar ao lote
        for (PedidoDeclaracao pedido : pedidos) {
            if (pedido.getEstado() != EstadoPedido.AGUARDANDO_ASSINATURA) {
                throw new IllegalStateException("O pedido " + pedido.getCodigo() + " não está a aguardar assinatura.");
            }
            declaracaoGeracaoService.gerarEArmazenarDeclaracao(pedido.getId());
            EstadoPedido estadoAnterior = pedido.getEstado();
            pedido.setEstado(EstadoPedido.DISPONIVEL);
            pedido.setLoteImpressao(loteSalvo); // Certifica-te de ter este setter na entidade PedidoDeclaracao
            pedidoRepositorio.save(pedido);

            // Registar na auditoria
            historicoAuditoriaService.registar(
                    pedido,
                    atendente,
                    estadoAnterior,
                    EstadoPedido.DISPONIVEL,
                    "Documento incluído no lote de impressão " + loteSalvo.getCodigoLote() + " e disponibilizado."
            );
        }

        return loteSalvo.getCodigoLote();
    }
}
