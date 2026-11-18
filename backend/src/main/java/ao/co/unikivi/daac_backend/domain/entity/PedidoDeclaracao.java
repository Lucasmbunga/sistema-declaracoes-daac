package ao.co.unikivi.daac_backend.domain.entity;

import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lote_impressao_id")
    private LoteImpressao loteImpressao;
    @Column(name = "efeito_declaracao", nullable = false, length = 150)
    private String efeitoDeclaracao;

    @Column(name = "nome_pai", nullable = false, length = 200)
    private String nomePai;

    @Column(name = "nome_mae", nullable = false, length = 200)
    private String nomeMae;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "numero_bi", length = 50)
    private String numeroBi;

    @Column(name = "data_emissao_bi")
    private LocalDate dataEmissaoBi;

    @Column(name = "ano_frequencia", length = 30)
    private String anoFrequencia;

    @Column(name = "ano_letivo", length = 20)
    private String anoLetivo;

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
