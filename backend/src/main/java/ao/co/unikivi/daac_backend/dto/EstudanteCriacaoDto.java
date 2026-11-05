package ao.co.unikivi.daac_backend.dto;

import ao.co.unikivi.daac_backend.domain.enums.PapelUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EstudanteCriacaoDto(
        @NotBlank(message = "O nome nao pode estar vazio")
        @NotNull(message = "O nome e obrigatorio")
        String nomeCompleto,
        @NotNull(message = "O email e obrigatorio")
        @NotBlank(message = " O email nao pode estar vazio")
        @Email(message = "O formato de email deve ser exemplo@gmail.com")
        String email,
        @NotBlank(message = "A palavra-passe nao pode estar vazio")
        @NotNull(message = "A palavra-passe e obrigatoria")
        String palavraPasse,
        PapelUsuario papelUsuario,

        @NotNull(message = "O ID do curso é obrigatório")
        Long idCurso,

        String numeroMecanog,
        String numeroProcesso,
        String turma,

        @NotBlank(message = "O número do B.I. é obrigatório")
        String numeroBi,

        String telefone
) {}