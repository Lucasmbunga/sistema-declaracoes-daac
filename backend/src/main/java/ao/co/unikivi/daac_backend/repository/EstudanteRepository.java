package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.Estudante;
import jakarta.validation.constraints.NotBlank;
import org.flywaydb.core.internal.util.ClassUtils;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstudanteRepository extends JpaRepository<Estudante,Long> {
    Optional<Estudante> findByNumeroBi(@NotBlank(message = "O número do B.I. é obrigatório") String s);
    boolean existsByNumeroMecanog(String numeroMecanog);
    boolean existsByNumeroProcesso(String numeroProcesso);
}
