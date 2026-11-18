package ao.co.unikivi.daac_backend.config.storage;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.net.URI;

@Configuration
public class ConfiguracaoR2 {

    private final StorageProperties propriedades;

    public ConfiguracaoR2(StorageProperties propriedades) {
        this.propriedades = propriedades;
    }

    @Bean
    public S3Client s3Client() {
        String endpointR2 = String.format("https://%s.r2.cloudflarestorage.com", propriedades.getAccountId());
        AwsBasicCredentials credenciais = AwsBasicCredentials.create(
                propriedades.getAccessKey(),
                propriedades.getSecretKey()
        );

        return S3Client.builder()
                .endpointOverride(URI.create(endpointR2))
                .credentialsProvider(StaticCredentialsProvider.create(credenciais))
                .region(Region.US_EAST_1)
                .build();
    }

    @Bean
    public S3Presigner s3Presigner() {
        String endpointR2 = String.format("https://%s.r2.cloudflarestorage.com", propriedades.getAccountId());
        AwsBasicCredentials credenciais = AwsBasicCredentials.create(
                propriedades.getAccessKey(),
                propriedades.getSecretKey()
        );

        return S3Presigner.builder()
                .endpointOverride(URI.create(endpointR2))
                .credentialsProvider(StaticCredentialsProvider.create(credenciais))
                .region(Region.US_EAST_1)
                .build();
    }
}