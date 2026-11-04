package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.HistoricoAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HistoricoAuditoriaRepository extends JpaRepository<HistoricoAuditoria, Long> {
    List<HistoricoAuditoria> findByPedidoDeclaracaoId(Long idPedidoDeclaracao);
    List<HistoricoAuditoria> findByAtendenteId(Long idAtendente);
}
