package ao.co.unikivi.daac_backend.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "estudante")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Estudante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id", nullable = false, unique = true)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_curso", referencedColumnName = "id", nullable = false)
    private Curso curso;

    @Column(name = "numero_mecanog", unique = true, length = 50)
    private String numeroMecanog;

    @Column(name = "numero_processo", unique = true, length = 50)
    private String numeroProcesso;

    @Column(name = "turma", length = 50)
    private String turma;

    @Column(name = "numero_bi", nullable = false, unique = true, length = 20)
    private String numeroBi;

    @Column(name = "telefone", length = 20)
    private String telefone;
}