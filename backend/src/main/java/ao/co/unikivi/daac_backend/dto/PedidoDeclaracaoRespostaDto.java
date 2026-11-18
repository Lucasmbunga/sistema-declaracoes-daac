package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDeclaracaoRespostaDto(
        Long id,
        String codigo,
        Long idEstudante,
        String nomeEstudante,
        String numeroMecanogEstudante,
        String numeroProcesso,
        String curso,
        EstadoPedido estado,
        String motivoRejeicao,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm,
        List<AnexoRespostaDto> anexos,
        @NotBlank String efeitoDeclaracao,
        @NotBlank String nomePai,
        @NotBlank String nomeMae,
        @NotNull LocalDate dataNascimento,
        @NotBlank String numeroBi,
        @NotNull LocalDate dataEmissaoBi,
        @NotBlank String anoFrequencia,
        @NotBlank String anoLetivo
) {}