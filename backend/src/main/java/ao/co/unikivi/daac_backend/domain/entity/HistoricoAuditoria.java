package ao.co.unikivi.daac_backend.domain.entity;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historico_auditoria")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class HistoricoAuditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pedido_declaracao", referencedColumnName = "id", nullable = false)
    private PedidoDeclaracao pedidoDeclaracao;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_atendente", referencedColumnName = "id", nullable = false)
    private Usuario atendente;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_anterior", length = 35)
    private EstadoPedido estadoAnterior;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_atual", nullable = false, length = 35)
    private EstadoPedido estadoAtual;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
