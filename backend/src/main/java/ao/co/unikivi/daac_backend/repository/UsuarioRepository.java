package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.domain.enums.PapelUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByPapelUsuario(PapelUsuario papelUsuario);
}
