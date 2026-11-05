package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.EstudanteAtualizacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteCriacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteRespostaDto;
import ao.co.unikivi.daac_backend.service.EstudanteService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudantes")
public class EstudanteController {

    private final EstudanteService estudanteServico;

    public EstudanteController(EstudanteService estudanteServico) {
        this.estudanteServico = estudanteServico;
    }

    @PostMapping
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
    public ResponseEntity<ApiResponse<List<EstudanteRespostaDto>>> listar(HttpServletRequest request) {
        List<EstudanteRespostaDto> lista = estudanteServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Lista de estudantes obtida com sucesso", request.getRequestURI()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        EstudanteRespostaDto estudante = estudanteServico.buscarPorId(id);
        return ResponseEntity.ok(ResponseUtil.sucess(estudante, "Estudante encontrado com sucesso", request.getRequestURI()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<EstudanteRespostaDto>> eliminarEstudante(@PathVariable Long id, HttpServletRequest request){
        var resposta=ResponseUtil.sucess(estudanteServico.eliminarEstudante(id),"Estudante eliminado com sucesso.",request.getRequestURI());
        return ResponseEntity.ok(resposta);
    }
}