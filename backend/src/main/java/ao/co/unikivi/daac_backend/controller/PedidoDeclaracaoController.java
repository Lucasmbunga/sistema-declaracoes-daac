package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.PedidoAtualizacaoEstadoDto;
import ao.co.unikivi.daac_backend.dto.PedidoDeclaracaoRespostaDto;
import ao.co.unikivi.daac_backend.service.PedidoDeclaracaoService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Pedidos de Declaração", description = "Submissão, acompanhamento e gestão de pedidos de declarações")
public class PedidoDeclaracaoController {

    private final PedidoDeclaracaoService pedidoServico;

    public PedidoDeclaracaoController(PedidoDeclaracaoService pedidoServico) {
        this.pedidoServico = pedidoServico;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Submeter novo pedido", description = "Submete um pedido de declaração enviando o ID do estudante, o B.I. e o comprovativo de pagamento (Multipart/Form-Data).")
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
    @Operation(summary = "Atualizar estado do pedido", description = "Permite ao técnico do DAAC aprovar ou rejeitar um pedido, registando o histórico.")
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> atualizarEstado(
            @PathVariable Long id,
            @Valid @RequestBody PedidoAtualizacaoEstadoDto dto,
            HttpServletRequest request) {

        PedidoDeclaracaoRespostaDto atualizado = pedidoServico.atualizarEstado(id, dto);
        return ResponseEntity.ok(ResponseUtil.sucess(atualizado, "Estado do pedido atualizado com sucesso", request.getRequestURI()));
    }

    @GetMapping
    @Operation(summary = "Listar todos os pedidos", description = "Retorna todos os pedidos de declaração submetidos no sistema.")
    public ResponseEntity<ApiResponse<List<PedidoDeclaracaoRespostaDto>>> listar(HttpServletRequest request) {
        List<PedidoDeclaracaoRespostaDto> lista = pedidoServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Lista de pedidos obtida com sucesso", request.getRequestURI()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido por ID", description = "Detalhes completos de um pedido incluindo anexos associados.")
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        PedidoDeclaracaoRespostaDto pedido = pedidoServico.buscarPorId(id);
        return ResponseEntity.ok(ResponseUtil.sucess(pedido, "Pedido encontrado com sucesso", request.getRequestURI()));
    }
}