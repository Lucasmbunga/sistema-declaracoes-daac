package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.PapelUsuario;

import java.time.LocalDateTime;

public record UsuarioRespostaDto(
        Long id,
        String nomeCompleto,
        String email,
        PapelUsuario papelUsuario,
        LocalDateTime criadoEm
) {}
