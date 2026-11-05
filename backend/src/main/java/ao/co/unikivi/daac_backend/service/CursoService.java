package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.domain.entity.Curso;
import ao.co.unikivi.daac_backend.dto.CursoCriacaoDto;
import ao.co.unikivi.daac_backend.dto.CursoRespostaDto;
import ao.co.unikivi.daac_backend.exception.BusinessRuleException;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.CursoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoService {

    private final CursoRepository cursoRepositorio;

    public CursoService(CursoRepository cursoRepositorio) {
        this.cursoRepositorio = cursoRepositorio;
    }

    @Transactional
    public CursoRespostaDto criarCurso(CursoCriacaoDto dto) {
        if (cursoRepositorio.existsByNome(dto.nome())) {
            throw new BusinessRuleException("Já existe um curso registado com este nome: " + dto.nome());
        }

        Curso curso = Curso.builder()
                .nome(dto.nome())
                .duracao(dto.duracao())
                .build();

        Curso cursoSalvo = cursoRepositorio.save(curso);
        return mapearParaDto(cursoSalvo);
    }

    @Transactional(readOnly = true)
    public List<CursoRespostaDto> listarTodos() {
        return cursoRepositorio.findAll().stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CursoRespostaDto buscarPorId(Long id) {
        Curso curso = cursoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Curso não encontrado com o ID: " ));
        return mapearParaDto(curso);
    }

    public CursoRespostaDto  eliminarCurso(Long id){
        var curso=cursoRepositorio.findById(id).orElseThrow(()->new NotFoundException("Curso não encontrado"));
        cursoRepositorio.delete(curso);
        return mapearParaDto(curso);
    }

    private CursoRespostaDto mapearParaDto(Curso curso) {
        return new CursoRespostaDto(curso.getId(), curso.getNome(), curso.getDuracao());
    }
}
