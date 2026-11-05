package ao.co.unikivi.daac_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CursoCriacaoDto(
        @NotBlank(message = "O nome do curso é obrigatório")
        String nome,

        @NotNull(message = "A duração do curso é obrigatória")
        @Positive(message = "A duração deve ser um valor positivo (em anos)")
        Integer duracao
) {}
