package ao.co.unikivi.daac_backend.config.security;

import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.dto.UsuarioCriacaoDto;
import ao.co.unikivi.daac_backend.dto.UsuarioRespostaDto;
import ao.co.unikivi.daac_backend.exception.BadCredentialsException;
import ao.co.unikivi.daac_backend.repository.UsuarioRepository;
import ao.co.unikivi.daac_backend.service.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final UsuarioService usuarioService;


    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, TokenService tokenService, UsuarioService usuarioService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.usuarioService = usuarioService;
    }

    public TokenResponseDto login(LoginRequestDto loginRequestDto) {
        var user = (Usuario) usuarioRepository.findByEmail(loginRequestDto.email());
        if(user == null || !passwordEncoder.matches(loginRequestDto.password(), user.getPalavraPasse())){
            throw new BadCredentialsException("Email or password incorrect");
        }

        String token= tokenService.generateToken(user);
        return new TokenResponseDto(token);
    }

    public UsuarioRespostaDto register(UsuarioCriacaoDto usuarioCriacaoDto){
        return usuarioService.registarUsuario(usuarioCriacaoDto);
    }
}
