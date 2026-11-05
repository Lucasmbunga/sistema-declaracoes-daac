package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.config.storage.StorageProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class ServicoArmazenamentoR2 implements ArmazenamentoService {

    private final S3Client s3Client;
    private final StorageProperties propriedadesArmazenamento;

    public ServicoArmazenamentoR2(S3Client s3Client, StorageProperties propriedadesArmazenamento) {
        this.s3Client = s3Client;
        this.propriedadesArmazenamento = propriedadesArmazenamento;
    }

    @Override
    public String carregarFicheiro(MultipartFile ficheiro,String pastaDestino) {
        String nomeFicheiroDestino = pastaDestino+"/" + UUID.randomUUID() + "_" + ficheiro.getOriginalFilename();

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(propriedadesArmazenamento.getBucketName())
                    .key(nomeFicheiroDestino)
                    .contentType(ficheiro.getContentType())
                    .contentLength(ficheiro.getSize())
                    .build();

            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromInputStream(ficheiro.getInputStream(), ficheiro.getSize())
            );

            // Retorna o URL público completo do ficheiro no Cloudflare R2
            return String.format("%s/%s", propriedadesArmazenamento.getPublicUrl(), nomeFicheiroDestino);
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar e carregar o ficheiro para o Cloudflare R2", e);
        }
    }

    @Override
    public void eliminarFicheiro(String urlOuChaveFicheiro) {
        if (urlOuChaveFicheiro == null || urlOuChaveFicheiro.isBlank()) return;

        // Extrai a chave relativa caso receba a URL pública completa
        String chave = extrairChaveDaUrl(urlOuChaveFicheiro);

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(propriedadesArmazenamento.getBucketName())
                .key(chave)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    private String extrairChaveDaUrl(String urlOuChave) {
        String publicUrl = propriedadesArmazenamento.getPublicUrl();
        if (urlOuChave.startsWith(publicUrl)) {
            return urlOuChave.substring(publicUrl.length() + 1);
        }
        return urlOuChave;
    }
}