package ao.co.unikivi.daac_backend.domain.entity;


import ao.co.unikivi.daac_backend.domain.enums.PapelUsuario;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_completo", nullable = false, length = 150)
    private String nomeCompleto;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "palavra_passe", nullable = false)
    private String palavraPasse;

    @Enumerated(EnumType.STRING)
    @Column(name = "papel_usuario", nullable = false, length = 30)
    private PapelUsuario papelUsuario;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.papelUsuario==PapelUsuario.ADMINISTRADOR){
            return List.of(new SimpleGrantedAuthority("ROLE_ADMINISTRADOR"),new SimpleGrantedAuthority("ROLE_ATENDENTE"),new SimpleGrantedAuthority("ROLE_ESTUDANTE"));
        } else if (this.papelUsuario==PapelUsuario.ATENDENTE) {
            return List.of(new SimpleGrantedAuthority("ROLE_ATENDENTE"),new SimpleGrantedAuthority("ROLE_ESTUDANTE"));
        }
        else {
            return List.of(new SimpleGrantedAuthority("ROLE_ESTUDANTE"));
        }
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
