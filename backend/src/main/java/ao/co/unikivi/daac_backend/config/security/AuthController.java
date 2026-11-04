package ao.co.unikivi.daac_backend.config.security;

import ao.co.unikivi.daac_backend.dto.UsuarioCriacaoDto;
import ao.co.unikivi.daac_backend.dto.UsuarioRespostaDto;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(@Valid @RequestBody LoginRequestDto loginRequestDto, HttpServletRequest request) {
        var response= ResponseUtil.sucess(authService.login(loginRequestDto),"User logged successfully",request.getRequestURI());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UsuarioRespostaDto>> register(@Valid @RequestBody UsuarioCriacaoDto usuarioCriacaoDto, HttpServletRequest request) {
        var response= ResponseUtil.sucess(authService.register(usuarioCriacaoDto),"Usuário  registrado  com sucesso!",request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
