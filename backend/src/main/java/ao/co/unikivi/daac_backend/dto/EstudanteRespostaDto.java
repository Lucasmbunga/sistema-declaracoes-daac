package ao.co.unikivi.daac_backend.dto;

public record EstudanteRespostaDto(
        Long id,
        Long idUsuario,
        String nomeCompletoUsuario,
        String emailUsuario,
        Long idCurso,
        String nomeCurso,
        String numeroMecanog,
        String numeroProcesso,
        String turma,
        String numeroBi,
        String telefone
) {}