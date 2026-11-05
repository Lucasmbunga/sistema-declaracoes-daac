package ao.co.unikivi.daac_backend.controller;

import ao.co.unikivi.daac_backend.dto.CursoCriacaoDto;
import ao.co.unikivi.daac_backend.dto.CursoRespostaDto;
import ao.co.unikivi.daac_backend.service.CursoService;
import ao.co.unikivi.daac_backend.util.ApiResponse;
import ao.co.unikivi.daac_backend.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    private final CursoService cursoServico;

    public CursoController(CursoService cursoServico) {
        this.cursoServico = cursoServico;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CursoRespostaDto>> criar(@Valid @RequestBody CursoCriacaoDto dto, HttpServletRequest request) {
        CursoRespostaDto criado = cursoServico.criarCurso(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseUtil.sucess(criado, "Curso criado com sucesso", request.getRequestURI()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CursoRespostaDto>>> listar(HttpServletRequest request) {
        List<CursoRespostaDto> lista = cursoServico.listarTodos();
        return ResponseEntity.ok(ResponseUtil.sucess(lista, "Lista de cursos obtida com sucesso", request.getRequestURI()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CursoRespostaDto>> buscarPorId(@PathVariable Long id, HttpServletRequest request) {
        CursoRespostaDto curso = cursoServico.buscarPorId(id);
        return ResponseEntity.ok(ResponseUtil.sucess(curso, "Curso encontrado com sucesso", request.getRequestURI()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<CursoRespostaDto>> eliminarCurso(@PathVariable Long id,HttpServletRequest request){
        var response=ResponseUtil.sucess(cursoServico.eliminarCurso(id),"Curso eliminado com sucesso!",request.getRequestURI());

        return ResponseEntity.ok(response);
    }
}
