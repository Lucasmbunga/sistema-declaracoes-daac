package ao.co.unikivi.daac_backend.service;


import ao.co.unikivi.daac_backend.domain.entity.HistoricoAuditoria;
import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import ao.co.unikivi.daac_backend.dto.HistoricoAuditoriaRespostaDto;
import ao.co.unikivi.daac_backend.repository.HistoricoAuditoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoricoAuditoriaService {

    private final HistoricoAuditoriaRepository auditoriaRepositorio;

    public HistoricoAuditoriaService(HistoricoAuditoriaRepository auditoriaRepositorio) {
        this.auditoriaRepositorio = auditoriaRepositorio;
    }

    /**
     * Regista uma nova entrada de auditoria no sistema.
     */
    @Transactional
    public void registar(PedidoDeclaracao pedido, Usuario atendente, EstadoPedido estadoAnterior, EstadoPedido estadoAtual, String comentario) {
        HistoricoAuditoria auditoria = HistoricoAuditoria.builder()
                .pedidoDeclaracao(pedido)
                .atendente(atendente)
                .estadoAnterior(estadoAnterior)
                .estadoAtual(estadoAtual)
                .comentario(comentario)
                .build();

        auditoriaRepositorio.save(auditoria);
    }

    @Transactional(readOnly = true)
    public List<HistoricoAuditoriaRespostaDto> listarPorPedido(Long idPedido) {
        return auditoriaRepositorio.findByPedidoDeclaracaoId(idPedido).stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<HistoricoAuditoriaRespostaDto> listarPorAtendente(Long idAtendente) {
        return auditoriaRepositorio.findByAtendenteId(idAtendente).stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<HistoricoAuditoriaRespostaDto> listarTodos() {
        return auditoriaRepositorio.findAll().stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    private HistoricoAuditoriaRespostaDto mapearParaDto(HistoricoAuditoria h) {
        return new HistoricoAuditoriaRespostaDto(
                h.getId(),
                h.getPedidoDeclaracao().getId(),
                h.getPedidoDeclaracao().getCodigo(),
                h.getAtendente() != null ? h.getAtendente().getId() : null,
                h.getAtendente() != null ? h.getAtendente().getNomeCompleto() : "Sistema",
                h.getEstadoAnterior(),
                h.getEstadoAtual(),
                h.getComentario(),
                h.getCriadoEm()
        );
    }
}