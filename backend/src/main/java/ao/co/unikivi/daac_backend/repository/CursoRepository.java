package ao.co.unikivi.daac_backend.repository;
import ao.co.unikivi.daac_backend.domain.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    Optional<Curso> findByNome(String nome);
    boolean existsByNome(String nome);
}