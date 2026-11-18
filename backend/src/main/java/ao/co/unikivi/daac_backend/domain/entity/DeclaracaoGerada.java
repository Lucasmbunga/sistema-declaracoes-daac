package ao.co.unikivi.daac_backend.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "declaracoes_geradas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeclaracaoGerada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numeroDeclaracao; // Ex: 0462/DAAC/IP/2026

    @Column(nullable = false)
    private Long idEstudante;

    @Column(nullable = false)
    private String nomeEstudante;

    @Column(nullable = false)
    private LocalDateTime dataGeracao;

    @Column(nullable = false, length = 500)
    private String urlArmazenamentoR2; // Caminho ou URL no Cloudflare R2

    @OneToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private PedidoDeclaracao pedido;

    @PrePersist
    public void prePersist() {
        this.dataGeracao = LocalDateTime.now();
    }
}