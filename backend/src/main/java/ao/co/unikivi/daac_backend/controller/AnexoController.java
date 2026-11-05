package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.domain.enums.TipoDocumento;
import ao.co.unikivi.daac_backend.dto.AnexoRespostaDto;
import ao.co.unikivi.daac_backend.service.AnexoService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/anexos")
public class AnexoController {

    private final AnexoService anexoServico;

    public AnexoController(AnexoService anexoServico) {
        this.anexoServico = anexoServico;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AnexoRespostaDto>> carregarAnexo(
            @RequestParam("idPedido") Long idPedido,
            @RequestParam("tipoDocumento") TipoDocumento tipoDocumento,
            @RequestParam("ficheiro") MultipartFile ficheiro,
            HttpServletRequest request) {

        AnexoRespostaDto anexo = anexoServico.adicionarAnexo(idPedido, tipoDocumento, ficheiro);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseUtil.sucess(anexo, "Anexo carregado e guardado com sucesso", request.getRequestURI()));
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<ApiResponse<List<AnexoRespostaDto>>> listarPorPedido(
            @PathVariable Long idPedido,
            HttpServletRequest request) {

        List<AnexoRespostaDto> anexos = anexoServico.listarPorPedido(idPedido);
        return ResponseEntity.ok(ResponseUtil.sucess(anexos, "Lista de anexos obtida com sucesso", request.getRequestURI()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<AnexoRespostaDto>> eliminarAnexo(
            @PathVariable Long id,
            HttpServletRequest request) {
        return ResponseEntity.ok(ResponseUtil.sucess(anexoServico.eliminarAnexo(id), "Anexo eliminado com sucesso", request.getRequestURI()));
    }
}