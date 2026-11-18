package ao.co.unikivi.daac_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PedidoCriacaoDto(
        @NotNull(message = "O ID do estudante é obrigatório")
        Long idEstudante,
        @NotBlank String efeitoDeclaracao,
        @NotBlank String nomePai,
        @NotBlank String nomeMae,
        @NotNull LocalDate dataNascimento,
        @NotBlank String numeroBi,
        @NotNull LocalDate dataEmissaoBi,
        @NotBlank String anoFrequencia,
        @NotBlank String anoLetivo
) {}
