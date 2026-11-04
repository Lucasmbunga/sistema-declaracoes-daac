package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PedidoDeclaracaoRepository extends JpaRepository<PedidoDeclaracao, Long> {
    Optional<PedidoDeclaracao> findByCodigo(String codigo);
    List<PedidoDeclaracao> findByEstudanteId(Long idEstudante);
    List<PedidoDeclaracao> findByEstado(EstadoPedido estado);
}