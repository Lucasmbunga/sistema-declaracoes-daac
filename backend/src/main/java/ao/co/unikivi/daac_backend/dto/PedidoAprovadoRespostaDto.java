package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;

public record PedidoAprovadoRespostaDto(
        Long id,
        String nomeEstudante,
        String codigo,
        String matricula,
        String tipo,
        String dataAprovacao,
        EstadoPedido estado
) {}