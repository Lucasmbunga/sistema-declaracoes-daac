package ao.co.unikivi.daac_backend.service;

import ao.co.unikivi.daac_backend.domain.entity.Anexo;
import ao.co.unikivi.daac_backend.domain.entity.PedidoDeclaracao;
import ao.co.unikivi.daac_backend.domain.enums.TipoDocumento;
import ao.co.unikivi.daac_backend.dto.AnexoRespostaDto;
import ao.co.unikivi.daac_backend.exception.NotFoundException;
import ao.co.unikivi.daac_backend.repository.AnexoRepository;
import ao.co.unikivi.daac_backend.repository.PedidoDeclaracaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnexoService {

    private final AnexoRepository anexoRepositorio;
    private final PedidoDeclaracaoRepository pedidoRepositorio;
    private final ServicoArmazenamentoR2 armazenamentoR2;

    public AnexoService(AnexoRepository anexoRepositorio,
                        PedidoDeclaracaoRepository pedidoRepositorio,
                        ServicoArmazenamentoR2 armazenamentoR2) {
        this.anexoRepositorio = anexoRepositorio;
        this.pedidoRepositorio = pedidoRepositorio;
        this.armazenamentoR2 = armazenamentoR2;
    }

    @Transactional
    public AnexoRespostaDto adicionarAnexo(Long idPedido, TipoDocumento tipoDocumento, MultipartFile ficheiro) {
        PedidoDeclaracao pedido = pedidoRepositorio.findById(idPedido)
                .orElseThrow(() -> new NotFoundException("Pedido de declaração não encontrado."));
        String pastaDestino;
        if (tipoDocumento == TipoDocumento.COPIA_BI) {
            pastaDestino = "documentos/bi";
        } else if (tipoDocumento == TipoDocumento.COMPROVATIVO_PAGAMENTO) {
            pastaDestino = "documentos/comprovativos";
        }
        else{
            pastaDestino="documentos/requerimentos";
        }

        String urlDocumento = armazenamentoR2.carregarFicheiro(ficheiro,pastaDestino);

        Anexo anexo = Anexo.builder()
                .pedidoDeclaracao(pedido)
                .tipoDocumento(tipoDocumento)
                .urlDocumento(urlDocumento)
                .nome(ficheiro.getOriginalFilename())
                .build();

        Anexo anexoSalvo = anexoRepositorio.save(anexo);
        return mapearParaDto(anexoSalvo);
    }

    public Anexo salvarAnexo(PedidoDeclaracao pedidoDeclaracao,TipoDocumento tipoDocumento,String urlDocumento,String nomeDocumento){
        Anexo novoAnexo=new Anexo();
        novoAnexo.setNome(nomeDocumento);
        novoAnexo.setPedidoDeclaracao(pedidoDeclaracao);
        novoAnexo.setTipoDocumento(tipoDocumento);
        novoAnexo.setUrlDocumento(urlDocumento);
        return anexoRepositorio.save(novoAnexo);
    }
    @Transactional(readOnly = true)
    public List<AnexoRespostaDto> listarPorPedido(Long idPedido) {
        return anexoRepositorio.findByPedidoDeclaracaoId(idPedido).stream()
                .map(this::mapearParaDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public AnexoRespostaDto eliminarAnexo(Long idAnexo) {
        var anexo=anexoRepositorio.findById(idAnexo).orElseThrow(()->new NotFoundException("Anexo nao encontrado."));

        armazenamentoR2.eliminarFicheiro(anexo.getUrlDocumento());
        anexoRepositorio.deleteById(idAnexo);
        return mapearParaDto(anexo);
    }

    private AnexoRespostaDto mapearParaDto(Anexo a) {
        return new AnexoRespostaDto(
                a.getId(),
                a.getTipoDocumento(),
                a.getUrlDocumento(),
                a.getNome(),
                a.getCarregadoEm()
        );
    }
}