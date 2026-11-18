package ao.co.unikivi.daac_backend.repository;


import ao.co.unikivi.daac_backend.domain.entity.LoteImpressao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoteImpressaoRepository extends JpaRepository<LoteImpressao, Long> {
}
