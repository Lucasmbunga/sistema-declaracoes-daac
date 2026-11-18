package ao.co.unikivi.daac_backend.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "lotes_impressao")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoteImpressao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codigoLote; // Ex: LOTE-2026-0001

    @Column(nullable = false)
    private LocalDateTime dataGeracao;

    @ManyToOne
    @JoinColumn(name = "atendente_id", nullable = false)
    private Usuario atendente;

    @OneToMany(mappedBy = "loteImpressao")
    private List<PedidoDeclaracao> pedidos;

    @PrePersist
    public void prePersist() {
        this.dataGeracao = LocalDateTime.now();
        if (this.codigoLote == null) {
            this.codigoLote = "LOTE-" + System.currentTimeMillis();
        }
    }
}
