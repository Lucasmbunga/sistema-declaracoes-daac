package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.domain.entity.Curso;
import ao.co.unikivi.daac_backend.domain.entity.Estudante;
import ao.co.unikivi.daac_backend.domain.entity.Usuario;
import ao.co.unikivi.daac_backend.dto.EstudanteAtualizacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteCriacaoDto;
import ao.co.unikivi.daac_backend.dto.EstudanteRespostaDto;
import ao.co.unikivi.daac_backend.exception.BusinessRuleException;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.CursoRepository;
import ao.co.unikivi.daac_backend.repository.EstudanteRepository;
import ao.co.unikivi.daac_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EstudanteService {

    private final EstudanteRepository estudanteRepositorio;
    private final UsuarioRepository usuarioRepositorio;
    private final CursoRepository cursoRepositorio;

    public EstudanteService(EstudanteRepository estudanteRepositorio, UsuarioRepository usuarioRepositorio, CursoRepository cursoRepositorio) {
        this.estudanteRepositorio = estudanteRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
        this.cursoRepositorio = cursoRepositorio;
    }

    @Transactional
    public EstudanteRespostaDto criarEstudante(EstudanteCriacaoDto dto) {
        if (usuarioRepositorio.existsByEmail(dto.email())) {
            throw new BusinessRuleException("Email ja registrado");
        }
        Usuario novoUsuario=new Usuario();
        novoUsuario.setNomeCompleto(dto.nomeCompleto());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setPalavraPasse(dto.palavraPasse());
        novoUsuario.setPapelUsuario(dto.papelUsuario());

        usuarioRepositorio.save(novoUsuario);

        Curso curso = cursoRepositorio.findById(dto.idCurso())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        if (estudanteRepositorio.findByNumeroBi(dto.numeroBi()).isPresent()) {
            throw new BusinessRuleException("Já existe um estudante registado com este  B.I");
        }
        if (estudanteRepositorio.existsByNumeroMecanog(dto.numeroMecanog())) {
            throw new BusinessRuleException("Numero mecanografico ja registrado");
        }
        if (estudanteRepositorio.existsByNumeroProcesso(dto.numeroProcesso())) {
            throw new BusinessRuleException("Numero de processo ja registrado.");
        }

        Estudante estudante = Estudante.builder()
                .usuario(novoUsuario)
                .curso(curso)
                .numeroMecanog(dto.numeroMecanog())
                .numeroProcesso(dto.numeroProcesso())
                .turma(dto.turma())
                .numeroBi(dto.numeroBi())
                .telefone(dto.telefone())
                .build();

        Estudante salvo = estudanteRepositorio.save(estudante);
        return mapearParaDto(salvo);
    }

    public EstudanteRespostaDto atualizarEstudante(Long id, EstudanteAtualizacaoDto dto){
        var estudante=estudanteRepositorio.findById(id).orElseThrow(()->new NotFoundException("Estudante nao encontrado."));

        if(!estudante.getNumeroMecanog().equals(dto.numeroMecanog()) && estudanteRepositorio.existsByNumeroMecanog(dto.numeroMecanog())){
            throw new BusinessRuleException("Numero mecanografico ja registrado.");
        }
        if(!estudante.getNumeroProcesso().equals(dto.numeroProcesso()) && estudanteRepositorio.existsByNumeroProcesso(dto.numeroProcesso())){
            throw new BusinessRuleException("Numero de processo ja registrado.");
        }

        Curso curso=cursoRepositorio.findById(dto.idCurso()).orElseThrow(()->new NotFoundException("Curso nao encontrado"));

        estudante.setNumeroMecanog(dto.numeroMecanog());
        estudante.setNumeroProcesso(dto.numeroProcesso());
        estudante.setCurso(curso);
        estudante.setTurma(dto.turma());
        estudante.setTelefone(dto.telefone());
        return mapearParaDto(estudanteRepositorio.save(estudante));
    }
    @Transactional(readOnly = true)
    public List<EstudanteRespostaDto> listarTodos() {
        return estudanteRepositorio.findAll().stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EstudanteRespostaDto buscarPorId(Long id) {
        Estudante estudante = estudanteRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Estudante não encontrado."));
        return mapearParaDto(estudante);
    }

    public EstudanteRespostaDto eliminarEstudante(Long id){
        var estudante=estudanteRepositorio.findById(id).orElseThrow(()->new NotFoundException("Estudante nao encontrado."));
        estudanteRepositorio.delete(estudante);

        return mapearParaDto(estudante);
    }

    private EstudanteRespostaDto mapearParaDto(Estudante e) {
        return new EstudanteRespostaDto(
                e.getId(),
                e.getUsuario().getId(),
                e.getUsuario().getNomeCompleto(),
                e.getUsuario().getEmail(),
                e.getCurso().getId(),
                e.getCurso().getNome(),
                e.getNumeroMecanog(),
                e.getNumeroProcesso(),
                e.getTurma(),
                e.getNumeroBi(),
                e.getTelefone()
        );
    }
}
