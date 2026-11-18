package ao.co.unikivi.daac_backend.repository;


import ao.co.unikivi.daac_backend.domain.entity.DeclaracaoGerada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeclaracaoGeradaRepository extends JpaRepository<DeclaracaoGerada, Long> {
    Optional<DeclaracaoGerada> findByNumeroDeclaracao(String numeroDeclaracao);
    List<DeclaracaoGerada> findByIdEstudante(Long idEstudante);
    Optional<DeclaracaoGerada> findByPedidoId(Long pedidoId);
}