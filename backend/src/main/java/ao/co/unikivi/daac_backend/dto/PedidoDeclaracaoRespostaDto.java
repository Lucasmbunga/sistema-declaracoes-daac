package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDeclaracaoRespostaDto(
        Long id,
        String codigo,
        Long idEstudante,
        String nomeEstudante,
        String numeroMecanogEstudante,
        EstadoPedido estado,
        String motivoRejeicao,
        LocalDateTime criadoEm,
        LocalDateTime atualizadoEm,
        List<AnexoRespostaDto> anexos
) {}