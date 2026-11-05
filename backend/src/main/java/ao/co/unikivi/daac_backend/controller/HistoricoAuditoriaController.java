package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.HistoricoAuditoriaRespostaDto;
import ao.co.unikivi.daac_backend.service.HistoricoAuditoriaService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
public class HistoricoAuditoriaController {

    private final HistoricoAuditoriaService auditoriaServico;

    public HistoricoAuditoriaController(HistoricoAuditoriaService auditoriaServico) {
        this.auditoriaServico = auditoriaServico;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<HistoricoAuditoriaRespostaDto>>> listarTodos(HttpServletRequest request) {
        List<HistoricoAuditoriaRespostaDto> lista = auditoriaServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Histórico de auditoria obtido com sucesso", request.getRequestURI()));
    }
@GetMapping("/atendente/{id}")
public ResponseEntity<ApiResponse<List<HistoricoAuditoriaRespostaDto>>> listarPorAtendente(@PathVariable Long id,HttpServletRequest request){
        var resposta=ResponseUtil.sucess(auditoriaServico.listarPorAtendente(id),"Success",request.getRequestURI());
        return ResponseEntity.ok(resposta);
}

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<ApiResponse<List<HistoricoAuditoriaRespostaDto>>> listarPorPedido(
            @PathVariable Long idPedido,
            HttpServletRequest request) {
        List<HistoricoAuditoriaRespostaDto> lista = auditoriaServico.listarPorPedido(idPedido);
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Histórico do pedido obtido com sucesso", request.getRequestURI()));
    }
}
