package ao.co.unikivi.daac_backend.domain.entity;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido_declaracao")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PedidoDeclaracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 36)
    private String codigo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_estudante", referencedColumnName = "id", nullable = false)
    private Estudante estudante;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private EstadoPedido estado;

    @Column(name = "motivo_rejeicao", columnDefinition = "TEXT")
    private String motivoRejeicao;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em")
    private LocalDateTime atualizadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
        if (this.estado == null) {
            this.estado = EstadoPedido.PENDENTE;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.atualizadoEm = LocalDateTime.now();
    }
}
