package ao.co.unikivi.daac_backend.domain.entity;

import ao.co.unikivi.daac_backend.domain.enums.TipoDocumento;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "anexo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_pedido_declaracao", referencedColumnName = "id", nullable = false)
    private PedidoDeclaracao pedidoDeclaracao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_documento", nullable = false, length = 50)
    private TipoDocumento tipoDocumento;

    @Column(name = "url_documento", nullable = false)
    private String urlDocumento;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(name = "carregado_em", updatable = false)
    private LocalDateTime carregadoEm;

    @PrePersist
    public void prePersist() {
        this.carregadoEm = LocalDateTime.now();
    }
}
