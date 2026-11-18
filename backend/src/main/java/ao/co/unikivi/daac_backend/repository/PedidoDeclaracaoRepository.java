package ao.co.unikivi.daac_backend.repository;

import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PedidoDeclaracaoRepository extends JpaRepository<PedidoDeclaracao, Long> {
    Optional<PedidoDeclaracao> findByCodigo(String codigo);
    List<PedidoDeclaracao> findByEstudanteUsuarioId(Long idEstudante);
    @Query("SELECT p FROM PedidoDeclaracao p WHERE p.estado = :estado ORDER BY p.criadoEm ASC")
    List<PedidoDeclaracao> findByEstado(@Param("estado") EstadoPedido estado);

    @Query("""
    SELECT COUNT(p) 
    FROM PedidoDeclaracao p 
    WHERE p.estado = ao.co.unikivi.daac_backend.domain.enums.EstadoPedido.DISPONIVEL
      AND p.loteImpressao.dataGeracao >= :inicioDia 
      AND p.loteImpressao.dataGeracao < :fimDia
""")
    long contarDisponibilizadosNoPeriodo(
            @Param("inicioDia") LocalDateTime inicioDia,
            @Param("fimDia") LocalDateTime fimDia
    );
}