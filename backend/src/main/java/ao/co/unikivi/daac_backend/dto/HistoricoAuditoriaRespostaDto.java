package ao.co.unikivi.daac_backend.dto;


import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import java.time.LocalDateTime;

public record HistoricoAuditoriaRespostaDto(
        Long id,
        Long idPedido,
        String codigoPedido,
        Long idAtendente,
        String nomeAtendente,
        EstadoPedido estadoAnterior,
        EstadoPedido estadoAtual,
        String comentario,
        LocalDateTime criadoEm
) {}