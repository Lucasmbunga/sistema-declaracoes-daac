package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.validation.constraints.NotNull;

public record PedidoPorEstadoDto(@NotNull EstadoPedido estadoPedido) {
}
