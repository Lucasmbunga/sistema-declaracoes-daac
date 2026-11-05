package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.PedidoAtualizacaoEstadoDto;
import ao.co.unikivi.daac_backend.dto.PedidoDeclaracaoRespostaDto;
import ao.co.unikivi.daac_backend.service.PedidoDeclaracaoService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class PedidoDeclaracaoController {

    private final PedidoDeclaracaoService pedidoServico;

    public PedidoDeclaracaoController(PedidoDeclaracaoService pedidoServico) {
        this.pedidoServico = pedidoServico;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> criarPedido(
            @RequestParam("idEstudante") Long idEstudante,
            @RequestParam("ficheiroBi") MultipartFile ficheiroBi,
            @RequestParam("ficheiroComprovativo") MultipartFile ficheiroComprovativo,
            HttpServletRequest request) {

        PedidoDeclaracaoRespostaDto criado = pedidoServico.criarPedido(idEstudante, ficheiroBi, ficheiroComprovativo);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseUtil.sucess(criado, "Pedido de declaração submetido com sucesso", request.getRequestURI()));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> atualizarEstado(
            @PathVariable Long id,
            @Valid @RequestBody PedidoAtualizacaoEstadoDto dto,
            HttpServletRequest request) {

        PedidoDeclaracaoRespostaDto atualizado = pedidoServico.atualizarEstado(id, dto);
        return ResponseEntity.ok(ResponseUtil.sucess(atualizado, "Estado do pedido atualizado com sucesso", request.getRequestURI()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PedidoDeclaracaoRespostaDto>>> listar(HttpServletRequest request) {
        List<PedidoDeclaracaoRespostaDto> lista = pedidoServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Lista de pedidos obtida com sucesso", request.getRequestURI()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        PedidoDeclaracaoRespostaDto pedido = pedidoServico.buscarPorId(id);
        return ResponseEntity.ok(ResponseUtil.sucess(pedido, "Pedido encontrado com sucesso", request.getRequestURI()));
    }
}