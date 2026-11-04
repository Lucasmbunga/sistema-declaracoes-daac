package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.dto.UsuarioCriacaoDto;
import ao.co.unikivi.daac_backend.dto.UsuarioRespostaDto;
import ao.co.unikivi.daac_backend.exception.BusinessRuleException;
import ao.co.unikivi.daac_backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService{

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioRespostaDto registarUsuario(UsuarioCriacaoDto dto) {
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new BusinessRuleException("Já existe um usuário registado com este email: " + dto.email());
        }

        Usuario usuario = Usuario.builder()
                .nomeCompleto(dto.nomeCompleto())
                .email(dto.email())
                .palavraPasse(passwordEncoder.encode(dto.palavraPasse()))
                .papelUsuario(dto.papelUsuario())
                .build();

        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return mapearParaDto(usuarioSalvo);
    }

    @Transactional(readOnly = true)
    public UsuarioRespostaDto buscarPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));
        return mapearParaDto(usuario);
    }

    @Transactional(readOnly = true)
    public List<UsuarioRespostaDto> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Não é possível eliminar. Usuário não encontrado com o ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioRespostaDto mapearParaDto(Usuario usuario) {
        return new UsuarioRespostaDto(
                usuario.getId(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                usuario.getPapelUsuario(),
                usuario.getCriadoEm()
        );
    }
}
