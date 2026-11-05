package ao.co.unikivi.daac_backend.dto;

import jakarta.validation.constraints.NotNull;

public record PedidoCriacaoDto(
        @NotNull(message = "O ID do estudante é obrigatório")
        Long idEstudante
) {}
