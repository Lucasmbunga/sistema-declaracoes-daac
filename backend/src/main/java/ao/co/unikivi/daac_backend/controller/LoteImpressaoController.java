package ao.co.unikivi.daac_backend.controller;


import ao.co.unikivi.daac_backend.dto.GerarLoteDto;
import ao.co.unikivi.daac_backend.dto.LoteMetricasDto;
import ao.co.unikivi.daac_backend.service.LoteImpressaoService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lotes-impressao")
@Tag(name = "Lotes de Impressão", description = "Endpoints para gestão e geração de lotes de impressão e disponibilização de documentos.")
public class LoteImpressaoController {

    private final LoteImpressaoService loteServico;

    public LoteImpressaoController(LoteImpressaoService loteServico) {
        this.loteServico = loteServico;
    }

    @PostMapping("/gerar")
    @Operation(summary = "Gerar lote de impressão", description = "Agrupa os pedidos selecionados num lote e atualiza o seu estado para DISPONIVEL.")
    public ResponseEntity<ApiResponse<String>> gerarLote(
            @Valid @RequestBody GerarLoteDto dto,
            HttpServletRequest request) {

        String codigoLote = loteServico.gerarLote(dto);
        return ResponseEntity.ok(ResponseUtil.sucess(codigoLote, "Lote gerado com sucesso e pedidos disponibilizados", request.getRequestURI()));
    }
    // No LoteImpressaoControlador.java
    @GetMapping("/metricas")
    @Operation(summary = "Obter métricas da fila de impressão", description = "Retorna o total de pedidos a aguardar impressão e os disponibilizados hoje.")
    public ResponseEntity<ApiResponse<LoteMetricasDto>> obterMetricas(HttpServletRequest request) {
        LoteMetricasDto metricas = loteServico.obterMetricas();
        return ResponseEntity.ok(ResponseUtil.sucess(metricas, "Métricas carregadas com sucesso", request.getRequestURI()));
    }
}
