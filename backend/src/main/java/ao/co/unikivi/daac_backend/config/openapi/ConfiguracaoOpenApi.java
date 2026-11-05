package ao.co.unikivi.daac_backend.config.openapi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfiguracaoOpenApi {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API do Sistema DAAC - Gestão de Documentos Académicos")
                        .version("1.0.0")
                        .description("Documentação oficial da API REST para o sistema de gestão de declarações e documentos do DAAC (Universidade Kimpa Vita).")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
    }
}