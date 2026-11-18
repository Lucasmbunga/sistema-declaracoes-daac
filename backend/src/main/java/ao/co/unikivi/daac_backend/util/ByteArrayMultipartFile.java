package ao.co.unikivi.daac_backend.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.*;

public class ByteArrayMultipartFile implements MultipartFile {

    private final byte[] conteudo;
    private final String nomeFicheiro;
    private final String contentType;

    public ByteArrayMultipartFile(byte[] conteudo, String nomeFicheiro, String contentType) {
        this.conteudo = conteudo;
        this.nomeFicheiro = nomeFicheiro;
        this.contentType = contentType;
    }

    @Override
    public String getName() {
        return nomeFicheiro;
    }

    @Override
    public String getOriginalFilename() {
        return nomeFicheiro;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return conteudo == null || conteudo.length == 0;
    }

    @Override
    public long getSize() {
        return conteudo.length;
    }

    @Override
    public byte[] getBytes() {
        return conteudo;
    }

    @Override
    public InputStream getInputStream() {
        return new ByteArrayInputStream(conteudo);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        try (FileOutputStream fos = new FileOutputStream(dest)) {
            fos.write(conteudo);
        }
    }
}