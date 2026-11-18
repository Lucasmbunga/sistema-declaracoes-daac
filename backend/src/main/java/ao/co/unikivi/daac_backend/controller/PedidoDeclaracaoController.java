package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.domain.entity.DeclaracaoGerada;
import ao.co.unikivi.daac_backend.domain.enums.EstadoPedido;
import ao.co.unikivi.daac_backend.dto.*;
import ao.co.unikivi.daac_backend.service.DeclaracaoGeracaoService;
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
    private final DeclaracaoGeracaoService declaracaoGeracaoServico;
    private final PedidoDeclaracaoService pedidoServico;

    public PedidoDeclaracaoController(PedidoDeclaracaoService pedidoServico,DeclaracaoGeracaoService declaracaoGeracaoServico) {
        this.pedidoServico = pedidoServico;
        this.declaracaoGeracaoServico = declaracaoGeracaoServico;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "Submeter novo pedido",
            description = "Submete um pedido de declaração enviando os dados civis/académicos do estudante, o B.I. e o comprovativo de pagamento (Multipart/Form-Data)."
    )
    public ResponseEntity<ApiResponse<PedidoDeclaracaoRespostaDto>> criarPedido(
            @ModelAttribute @Valid PedidoCriacaoDto dto,
            @RequestParam("ficheiroBi") MultipartFile ficheiroBi,
            @RequestParam("ficheiroComprovativo") MultipartFile ficheiroComprovativo,
            HttpServletRequest request) {

        PedidoDeclaracaoRespostaDto criado = pedidoServico.criarPedido(dto, ficheiroBi, ficheiroComprovativo);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseUtil.sucess(criado, "Pedido de declaração submetido com sucesso", request.getRequestURI()));
    }
    @PostMapping("/gerar/{idPedido}")
    public ResponseEntity<ApiResponse<DeclaracaoGerada>> gerarDeclaracao(
            @PathVariable Long idPedido, HttpServletRequest request) {
        DeclaracaoGerada declaracao = declaracaoGeracaoServico.gerarEArmazenarDeclaracao(idPedido);
        return ResponseEntity.ok(ResponseUtil.sucess(declaracao, "Declaração gerada e armazenada com sucesso", request.getRequestURI()));
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
    @GetMapping("/pedido/{idPedido}/url-temporaria")
    @Operation(summary = "Obter URL temporária da declaração", description = "Gera um link pré-assinado com validade de 15 minutos para visualizar o PDF da declaração no R2.")
    public ResponseEntity<ApiResponse<String>> obterUrlTemporariaDeclaracao(
            @PathVariable Long idPedido,
            HttpServletRequest request) {

        String urlAssinada = declaracaoGeracaoServico.gerarUrlTemporariaPorPedido(idPedido);
        return ResponseEntity.ok(ResponseUtil.sucess(urlAssinada, "URL temporária gerada com sucesso", request.getRequestURI()));
    }

    @GetMapping("/aprovados-para-impressao")
    @Operation(summary = "Listar pedidos aprovados", description = "Retorna todos os pedidos que se encontram a aguardar assinatura para a fila de impressão.")
    public ResponseEntity<ApiResponse<List<PedidoAprovadoRespostaDto>>> listarAprovadosParaImpressao(HttpServletRequest request) {
        List<PedidoAprovadoRespostaDto> lista = pedidoServico.listarPedidosAprovadosParaImpressao();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Pedidos aprovados obtidos com sucesso", request.getRequestURI()));
    }
    @GetMapping("/metricas")
    @Operation(summary = "Obter métricas da fila de pedidos", description = "Retorna os contadores por estado para o painel do atendente.")
    public ResponseEntity<ApiResponse<FilaMetricasDto>> obterMetricas(HttpServletRequest request) {
        FilaMetricasDto metricas = pedidoServico.obterMetricasFila();
        return ResponseEntity.ok(ResponseUtil.sucess(metricas, "Métricas da fila carregadas", request.getRequestURI()));
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

    @GetMapping("/estudante/{idEstudante}")
    public ResponseEntity<ApiResponse<List<PedidoDeclaracaoRespostaDto>>> obterPedidosPorIdEstudante(@PathVariable Long idEstudante,HttpServletRequest request){
        var resposta=ResponseUtil.sucess(pedidoServico.obterPedidosPorIdEstudante(idEstudante),"Success",request.getRequestURI());
        return ResponseEntity.ok(resposta);
    }
    @GetMapping("/estado")
    @Operation(summary = "Buscar pedido por Estado por exemplo, PENDENTE, DISPONIVEL, REJEITADO, entre outros", description = "Retorna uma lista de pedidos com base o estado especificado.")
    public ResponseEntity<ApiResponse<List<PedidoDeclaracaoRespostaDto>>> buscarPedidosPorEstado( @RequestParam EstadoPedido estadoPedido, HttpServletRequest request) {
        List<PedidoDeclaracaoRespostaDto> pedido = pedidoServico.obterPedidosPorEstado(estadoPedido);
        return ResponseEntity.ok(ResponseUtil.sucess(pedido, "Sucesso", request.getRequestURI()));
    }
}