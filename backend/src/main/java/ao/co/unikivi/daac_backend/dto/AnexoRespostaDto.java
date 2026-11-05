package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.TipoDocumento;
import java.time.LocalDateTime;

public record AnexoRespostaDto(
        Long id,
        TipoDocumento tipoDocumento,
        String urlDocumento,
        String nome,
        LocalDateTime carregadoEm
) {}