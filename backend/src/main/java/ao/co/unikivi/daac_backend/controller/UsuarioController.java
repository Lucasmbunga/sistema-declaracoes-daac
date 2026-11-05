package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.UsuarioCriacaoDto;
import ao.co.unikivi.daac_backend.dto.UsuarioRespostaDto;
import ao.co.unikivi.daac_backend.service.UsuarioService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuários", description = "Gestão de utilizadores e credenciais do sistema DAAC")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    @Operation(summary = "Criar novo usuário", description = "Regista um novo utilizador no sistema com encriptação de palavra-passe.")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Dados inválidos ou email já existente")
    })
    public ResponseEntity<ApiResponse<UsuarioRespostaDto>> registar(
            @Valid @RequestBody UsuarioCriacaoDto dto,
            HttpServletRequest request) {

        UsuarioRespostaDto novoUsuario = usuarioService.registarUsuario(dto);

        ApiResponse<UsuarioRespostaDto> resposta = ResponseUtil.sucess(
                novoUsuario,
                "Usuário criado com sucesso",
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(resposta);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna os detalhes de um utilizador específico através do ID.")
    public ResponseEntity<ApiResponse<UsuarioRespostaDto>> buscarPorId(
            @PathVariable Long id,
            HttpServletRequest request) {

        UsuarioRespostaDto usuario = usuarioService.buscarPorId(id);

        ApiResponse<UsuarioRespostaDto> resposta = ResponseUtil.sucess(
                usuario,
                "Usuário encontrado com sucesso",
                request.getRequestURI()
        );

        return ResponseEntity.ok(resposta);
    }

    @GetMapping
    @Operation(summary = "Listar todos os usuários", description = "Retorna uma lista com todos os utilizadores registados.")
    public ResponseEntity<ApiResponse<List<UsuarioRespostaDto>>> listar(HttpServletRequest request) {
        List<UsuarioRespostaDto> usuarios = usuarioService.listarTodos();

        ApiResponse<List<UsuarioRespostaDto>> resposta = ResponseUtil.sucess(
                usuarios,
                "Lista de usuários obtida com sucesso",
                request.getRequestURI()
        );

        return ResponseEntity.ok(resposta);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuário", description = "Remove um utilizador do sistema pelo ID.")
    public ResponseEntity<ApiResponse<UsuarioRespostaDto>> eliminar(
            @PathVariable Long id,
            HttpServletRequest request) {

        ;

        ApiResponse<UsuarioRespostaDto> resposta = ResponseUtil.sucess(
                usuarioService.eliminarUsuario(id),
                "Usuário eliminado com sucesso",
                request.getRequestURI()
        );

        return ResponseEntity.ok(resposta);
    }
}