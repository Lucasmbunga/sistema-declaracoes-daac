package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.PapelUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioCriacaoDto(
        @NotBlank(message = "O nome completo é obrigatório")
        String nomeCompleto,

        @NotBlank(message = "O email é obrigatório")
        @Email(message = "O formato do email é inválido")
        String email,

        @NotBlank(message = "A palavra-passe é obrigatória")
        @Size(min = 6, message = "A palavra-passe deve ter pelo menos 6 caracteres")
        String palavraPasse,

        @NotNull(message = "O papel do usuário é obrigatório")
        PapelUsuario papelUsuario
) {}