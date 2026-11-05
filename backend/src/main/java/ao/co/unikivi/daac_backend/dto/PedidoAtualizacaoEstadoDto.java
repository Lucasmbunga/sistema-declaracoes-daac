package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.validation.constraints.NotNull;

public record PedidoAtualizacaoEstadoDto(
        @NotNull(message = "O novo estado do pedido é obrigatório")
        EstadoPedido novoEstado,

        @NotNull(message = "O ID do atendente/técnico é obrigatório")
        Long idAtendente,

        String comentario
) {}
