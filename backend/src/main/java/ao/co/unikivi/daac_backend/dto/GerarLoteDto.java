package ao.co.unikivi.daac_backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record GerarLoteDto(
        @NotEmpty(message = "A lista de IDs de pedidos não pode estar vazia.")
        List<Long> idsPedidos,
        @NotNull(message = "O ID do atendente é obrigatório.")
        Long idAtendente
) {}