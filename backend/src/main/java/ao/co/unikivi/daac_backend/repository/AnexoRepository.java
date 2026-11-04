package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnexoRepository extends JpaRepository<Anexo, Long> {
    List<Anexo> findByPedidoDeclaracaoId(Long idPedidoDeclaracao);
}
