package ao.co.unikivi.daac_backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ArmazenamentoService {
    String carregarFicheiro(MultipartFile file,String pastaDestino);
    void eliminarFicheiro(String fileName);
}