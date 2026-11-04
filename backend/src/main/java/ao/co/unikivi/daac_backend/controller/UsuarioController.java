package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.UsuarioCriacaoDto;
import ao.co.unikivi.daac_backend.dto.UsuarioRespostaDto;
import ao.co.unikivi.daac_backend.service.UsuarioService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
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
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Long id,
            HttpServletRequest request) {

        usuarioService.eliminarUsuario(id);

        ApiResponse<Void> resposta = ResponseUtil.sucess(
                null,
                "Usuário eliminado com sucesso",
                request.getRequestURI()
        );

        return ResponseEntity.ok(resposta);
    }
}