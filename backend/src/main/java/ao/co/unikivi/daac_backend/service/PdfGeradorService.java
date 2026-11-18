package ao.co.unikivi.daac_backend.service;

import org.openpdf.text.*;
import org.openpdf.text.pdf.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import org.springframework.core.io.ClassPathResource;

import java.awt.Color;

@Service
public class PdfGeradorService {

    public byte[] gerarDeclaracaoFrequenciaPdf(
            String numeroDeclaracao,
            String efeito,
            String nomeEstudante,
            String nomePai,
            String nomeMae,
            String dataNascimento,
            String numeroBi,
            String dataEmissaoBi,
            String numeroMecanografico,
            String anoFrequencia,
            String curso,
            String anoLetivo,
            String nomeChefeDepartamento,
            String nomeDirectorAdjunto
    ) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        // Margens internas adequadas para não tocar na borda da página
        Document document = new Document(PageSize.A4, 65, 65, 55, 55);

        try {
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            // Regista o evento que desenha as bordas em torno da folha A4
            writer.setPageEvent(new BordaPaginaEvent());

            document.open();

            // Fontes (Times New Roman / Times é o padrão institucional académico)
            Font fontInstituicao = FontFactory.getFont(FontFactory.TIMES_BOLD, 13, Color.BLACK);
            Font fontSubInstituicao = FontFactory.getFont(FontFactory.TIMES_BOLD, 11, Color.BLACK);
            Font fontTitulo = FontFactory.getFont(FontFactory.TIMES_BOLD, 12, Font.BOLD | Font.UNDERLINE, Color.BLACK);
            Font fontNormal = FontFactory.getFont(FontFactory.TIMES_ROMAN, 11.5f, Color.BLACK);
            Font fontNegrito = FontFactory.getFont(FontFactory.TIMES_BOLD, 11.5f, Color.BLACK);
            Font fontAssinaturaTitulo = FontFactory.getFont(FontFactory.TIMES_BOLD, 10.5f, Color.BLACK);
            Font fontAssinaturaNome = FontFactory.getFont(FontFactory.TIMES_ROMAN, 10.5f, Color.BLACK);

            // 1. LOGOTIPO DA UNIKIVI CENTRALIZADO
            try {
                ClassPathResource imgResource = new ClassPathResource("static/images/logo-unikivi.png");
                Image logo = Image.getInstance(imgResource.getURL());
                logo.scaleToFit(75, 75);
                logo.setAlignment(Element.ALIGN_CENTER);
                document.add(logo);
            } catch (Exception e) {
                // Caso a imagem ainda não esteja na pasta, evita quebrar a geração
                System.err.println("Aviso: Logotipo não encontrado em static/images/logo-unikivi.png");
            }

            // 2. CABEÇALHO INSTITUCIONAL
            Paragraph cabecalho = new Paragraph();
            cabecalho.setAlignment(Element.ALIGN_CENTER);
            cabecalho.setSpacingBefore(6f);
            cabecalho.setSpacingAfter(18f);
            cabecalho.setLeading(15f);
            cabecalho.add(new Chunk("UNIVERSIDADE KIMPA VITA\n", fontInstituicao));
            cabecalho.add(new Chunk("INSTITUTO POLITÉCNICO\n", fontSubInstituicao));
            cabecalho.add(new Chunk("IP-UNIKIVI", fontSubInstituicao));
            document.add(cabecalho);

            // 3. NÚMERO DA DECLARAÇÃO
            Paragraph tituloDeclaracao = new Paragraph(
                    "DECLARAÇÃO Nº " + numeroDeclaracao.toUpperCase(),
                    fontTitulo
            );
            tituloDeclaracao.setAlignment(Element.ALIGN_CENTER);
            tituloDeclaracao.setSpacingAfter(24f);
            document.add(tituloDeclaracao);

            // 4. CORPO DO TEXTO (Parágrafo 1 - Identificação do Estudante)
            Paragraph p1 = new Paragraph();
            p1.setAlignment(Element.ALIGN_JUSTIFIED);
            p1.setFirstLineIndent(35f);
            p1.setLeading(20f);
            p1.setSpacingAfter(12f);

            p1.add(new Chunk("Para efeitos de ", fontNormal));
            p1.add(new Chunk(efeito.toUpperCase(), fontNegrito));
            p1.add(new Chunk(", Declara-se que o(a) Sr.(a) ", fontNormal));
            p1.add(new Chunk(nomeEstudante.toUpperCase(), fontNegrito));
            p1.add(new Chunk(", filho(a) de ", fontNormal));
            p1.add(new Chunk(nomePai, fontNegrito));
            p1.add(new Chunk(" e de ", fontNormal));
            p1.add(new Chunk(nomeMae, fontNegrito));
            p1.add(new Chunk(", nascido(a) aos ", fontNormal));
            p1.add(new Chunk(dataNascimento, fontNegrito));
            p1.add(new Chunk(", portador(a) do BI Nº ", fontNormal));
            p1.add(new Chunk(numeroBi.toUpperCase(), fontNegrito));
            p1.add(new Chunk(", passado pela Direcção Nacional de Identificação aos ", fontNormal));
            p1.add(new Chunk(dataEmissaoBi + ".", fontNegrito));
            document.add(p1);

            // 5. CORPO DO TEXTO (Parágrafo 2 - Matrícula e Frequência)
            Paragraph p2 = new Paragraph();
            p2.setAlignment(Element.ALIGN_JUSTIFIED);
            p2.setFirstLineIndent(35f);
            p2.setLeading(20f);
            p2.setSpacingAfter(12f);

            p2.add(new Chunk("É estudante desta Instituição Escolar, matriculado(a) sob o nº ", fontNormal));
            p2.add(new Chunk(numeroMecanografico, fontNegrito));
            p2.add(new Chunk(" institucional, frequentando o ", fontNormal));
            p2.add(new Chunk(anoFrequencia, fontNegrito));
            p2.add(new Chunk(" de ", fontNormal));
            p2.add(new Chunk(curso, fontNegrito));
            p2.add(new Chunk(" no ano letivo de ", fontNormal));
            p2.add(new Chunk(anoLetivo + ".", fontNegrito));
            document.add(p2);

            // 6. CORPO DO TEXTO (Parágrafo 3 - Fecho Legal)
            Paragraph p3 = new Paragraph(
                    "Por ser verdade e me ter sido solicitado, mandei passar a presente Declaração que por mim vai assinada e autenticada com carimbo a óleo em uso nesta instituição.",
                    fontNormal
            );
            p3.setAlignment(Element.ALIGN_JUSTIFIED);
            p3.setFirstLineIndent(0);
            p3.setLeading(20f);
            p3.setSpacingAfter(28f);
            document.add(p3);

            // 7. LOCAL E DATA DE EMISSÃO
            Locale localeAo = Locale.forLanguageTag("pt-AO");
            String dataAtual = LocalDate.now().format(DateTimeFormatter.ofPattern("dd 'de' MMMM 'de' yyyy", localeAo));
            Paragraph localData = new Paragraph(
                    "Instituto Politécnico da UNIKIVI, no Uíge, aos " + dataAtual + ".",
                    fontNormal
            );
            localData.setAlignment(Element.ALIGN_CENTER);
            localData.setSpacingAfter(45f);
            document.add(localData);

            // 8. TABELA DE ASSINATURAS (Lado a Lado: Chefe de Departamento e Director Adjunto)
            PdfPTable tabelaAssinaturas = new PdfPTable(2);
            tabelaAssinaturas.setWidthPercentage(100);
            tabelaAssinaturas.setWidths(new float[]{1f, 1f});

            // Coluna Esquerda: Chefe do Departamento Académico
            PdfPCell cellEsquerda = new PdfPCell();
            cellEsquerda.setBorder(Rectangle.NO_BORDER);
            cellEsquerda.setHorizontalAlignment(Element.ALIGN_CENTER);
            Paragraph pChefe = new Paragraph();
            pChefe.setAlignment(Element.ALIGN_CENTER);
            pChefe.setLeading(15f);
            pChefe.add(new Chunk("Chefe do Departamento Académico\n\n\n", fontAssinaturaTitulo));
            pChefe.add(new Chunk("____________________________________\n", fontAssinaturaNome));
            pChefe.add(new Chunk(nomeChefeDepartamento.toUpperCase(), fontAssinaturaTitulo));
            cellEsquerda.addElement(pChefe);

            // Coluna Direita: Director Adjunto p/ Área Académica
            PdfPCell cellDireita = new PdfPCell();
            cellDireita.setBorder(Rectangle.NO_BORDER);
            cellDireita.setHorizontalAlignment(Element.ALIGN_CENTER);
            Paragraph pDirector = new Paragraph();
            pDirector.setAlignment(Element.ALIGN_CENTER);
            pDirector.setLeading(15f);
            pDirector.add(new Chunk("Director Adjunto p/ Área Académica\n\n\n", fontAssinaturaTitulo));
            pDirector.add(new Chunk("____________________________________\n", fontAssinaturaNome));
            pDirector.add(new Chunk(nomeDirectorAdjunto.toUpperCase(), fontAssinaturaTitulo));
            cellDireita.addElement(pDirector);

            tabelaAssinaturas.addCell(cellEsquerda);
            tabelaAssinaturas.addCell(cellDireita);
            document.add(tabelaAssinaturas);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar o PDF da declaração: " + e.getMessage(), e);
        }

        return baos.toByteArray();
    }

    /**
     * Classe interna responsável por desenhar a moldura dupla oficial em toda a página A4.
     */
    private static class BordaPaginaEvent extends PdfPageEventHelper {
        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            PdfContentByte canvas = writer.getDirectContent();
            Rectangle pageSize = document.getPageSize();

            // Moldura externa (mais espessa)
            Rectangle bordaExterna = new Rectangle(
                    pageSize.getLeft() + 28,
                    pageSize.getBottom() + 28,
                    pageSize.getRight() - 28,
                    pageSize.getTop() - 28
            );
            bordaExterna.setBorder(Rectangle.BOX);
            bordaExterna.setBorderWidth(2.2f);
            bordaExterna.setBorderColor(new Color(15, 44, 51)); // Azul escuro institucional (ou Color.BLACK)
            canvas.rectangle(bordaExterna);

            // Moldura interna (linha fina paralela)
            Rectangle bordaInterna = new Rectangle(
                    pageSize.getLeft() + 33,
                    pageSize.getBottom() + 33,
                    pageSize.getRight() - 33,
                    pageSize.getTop() - 33
            );
            bordaInterna.setBorder(Rectangle.BOX);
            bordaInterna.setBorderWidth(0.8f);
            bordaInterna.setBorderColor(new Color(15, 44, 51));
            canvas.rectangle(bordaInterna);
        }
    }
}