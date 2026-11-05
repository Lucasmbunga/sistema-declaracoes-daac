package ao.co.unikivi.daac_backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(
		title = "Sistema de Atendimento e emissão de declarações de frequência",
		version = "0.1",
		description = "Descrição da aplicação"
))
@SecurityScheme(
		name = "bearerAuth",
		description = "JWT auth",
		scheme = "bearer",
		type = SecuritySchemeType.HTTP,
		bearerFormat = "JWT",
		in = SecuritySchemeIn.HEADER
)
public class DaacBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DaacBackendApplication.class, args);
	}

}
