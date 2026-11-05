package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.EstudanteAtualizacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteCriacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteRespostaDto;
import ao.co.unikivi.daac_backend.service.EstudanteService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudantes")
@Tag(name = "Estudantes", description = "Gestão de perfis e dados académicos dos estudantes")
public class EstudanteController {

    private final EstudanteService estudanteServico;

    public EstudanteController(EstudanteService estudanteServico) {
        this.estudanteServico = estudanteServico;
    }

    @PostMapping
    @Operation(summary = "Registar estudante", description = "Associa um utilizador a um curso e cria o perfil de estudante.")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> criar(@Valid @RequestBody EstudanteCriacaoDto dto, HttpServletRequest request) {
        EstudanteRespostaDto criado = estudanteServico.criarEstudante(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseUtil.sucess(criado, "Estudante registado com sucesso", request.getRequestURI()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> atualizarEstudante(@PathVariable Long id, @Valid @RequestBody EstudanteAtualizacaoDto dto,HttpServletRequest request){
        var resposta=ResponseUtil.sucess(estudanteServico.atualizarEstudante(id,dto),"Os dados do estudante foram atualizados com sucesso.",request.getRequestURI());
        return ResponseEntity.ok(resposta);
    }
    @GetMapping
    @Operation(summary = "Listar estudantes", description = "Retorna a lista de todos os estudantes registados.")
    public ResponseEntity<ApiResponse<List<EstudanteRespostaDto>>> listar(HttpServletRequest request) {
        List<EstudanteRespostaDto> lista = estudanteServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Lista de estudantes obtida com sucesso", request.getRequestURI()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar estudante por ID", description = "Obtém os detalhes de um estudante pelo identificador único.")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        EstudanteRespostaDto estudante = estudanteServico.buscarPorId(id);
        return ResponseEntity.ok(ResponseUtil.sucess(estudante, "Estudante encontrado com sucesso", request.getRequestURI()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar um curso por  ID", description = "Retorna os detalhes de um curso eliminado pelo identificador único.")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> eliminarEstudante(@PathVariable Long id, HttpServletRequest request){
        var resposta=ResponseUtil.sucess(estudanteServico.eliminarEstudante(id),"Estudante eliminado com sucesso.",request.getRequestURI());
        return ResponseEntity.ok(resposta);
    }
}