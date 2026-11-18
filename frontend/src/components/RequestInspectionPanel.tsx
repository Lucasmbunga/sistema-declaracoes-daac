import React, { useEffect, useState } from "react";
import {
  FileText,
  Eye,
  Check,
  X,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import type { PedidoDeclaracaoRespostaDto } from "../types/api";
import { useRequests } from "../hooks/useRequests";
import { decodeJwt } from "../utils/jwt";
import api from "../api/api";
import { useModal } from "../hooks/useModal";
import SuccessModal from "./SuccessModal";

interface RequestInspectionPanelProps {
  pedido: PedidoDeclaracaoRespostaDto | undefined;
}

export const RequestInspectionPanel: React.FC<RequestInspectionPanelProps> = ({
  pedido,
}) => {
  const { updateRequestStatus, useGerarDeclaracao } = useRequests();
  const updateMutation = updateRequestStatus(pedido?.id as number);
  const gerarDeclaracaoMutation = useGerarDeclaracao();
  const { close, isOpen, open } = useModal();

  // Estados para o Modal de Pré-visualização de Documentos
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error">("error");
  const [modalTitle, setModalTitle] = useState("");
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);

  // Estados para o Modal de Rejeição
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");

  // Armazena o link da declaração gerada nesta sessão (caso ainda não venha no DTO)
  const [declaracaoGeradaUrl, setDeclaracaoGeradaUrl] = useState<string | null>(
    null,
  );

  const getIdAtendente = (): number => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("daac_token");
    if (!token) return -1;
    const jwtPayload = decodeJwt(token);
    return jwtPayload?.id || -1;
  };

  const handleAbrirDeclaracaoGerada = async () => {
    if (!pedido) return;

    try {
      setIsLoadingDoc(true);
      setModalMessage(`Declaração Oficial - ${pedido.codigo}`);

      // Pede a URL pré-assinada (15 min) ao backend
      const response = await api.get(
        `/pedidos/pedido/${pedido.id}/url-temporaria`,
      );
      setPreviewUrl(response.data.data);
      setIsDocModalOpen(true);
    } catch (error) {
      console.error("Erro ao obter URL temporária da declaração:", error);
      setModalMessage("Não foi possível carregar o PDF da declaração.");
      setStatus("error");
      open();
    } finally {
      setIsLoadingDoc(false);
    }
  };

  // 1. Aprovar Pedido (PENDENTE -> AGUARDANDO_ASSINATURA)
  const handleApprove = () => {
    if (!pedido) return;

    updateMutation.mutate(
      {
        novoEstado: "AGUARDANDO_ASSINATURA",
        idAtendente: getIdAtendente(),
        comentario: "Documentos validados e aprovados pelo técnico.",
      },
      {
        onSuccess: () => {
          setModalMessage(`Pedido ${pedido.codigo} aprovado com sucesso!`);
          setStatus("success");
          open();
        },
        onError: (error) => {
          console.error("Erro ao aprovar pedido:", error);
          setModalMessage("Não foi possível aprovar o pedido.");
          setStatus("error");
          open();
        },
      },
    );
  };

  // 2. Rejeitar Pedido (PENDENTE -> REJEITADO)
  const handleConfirmReject = () => {
    if (!pedido) return;
    if (!motivoRejeicao.trim()) {
      alert("Por favor, indique o motivo da rejeição.");
      return;
    }

    updateMutation.mutate(
      {
        novoEstado: "REJEITADO",
        idAtendente: getIdAtendente(),
        comentario: motivoRejeicao.trim(),
      },
      {
        onSuccess: () => {
          setIsRejectModalOpen(false);
          setMotivoRejeicao("");
          setModalMessage(`Pedido ${pedido.codigo} rejeitado.`);
          setStatus("success");
          open();
        },
        onError: (error) => {
          console.error("Erro ao rejeitar pedido:", error);
          setModalMessage("Não foi possível rejeitar o pedido.");
          setStatus("error");
          open();
        },
      },
    );
  };

  // 3. Gerar Declaração Oficial (PDF no R2)
  const handleGerarDeclaracao = () => {
    if (!pedido) return;

    gerarDeclaracaoMutation.mutate(pedido.id, {
      onSuccess: (data) => {
        setDeclaracaoGeradaUrl(data.urlArmazenamentoR2);
        setModalMessage(
          `Declaração Nº ${data.numeroDeclaracao} gerada e guardada com sucesso!`,
        );
        setStatus("success");
        open();
      },
      onError: (error) => {
        console.error("Erro ao gerar declaração:", error);
        setModalMessage("Não foi possível gerar a declaração oficial.");
        setStatus("error");
        open();
      },
    });
  };

  // 4. Marcar como Entregue (DISPONIVEL -> ENTREGUE)
  const handleMarcarEntregue = () => {
    if (!pedido) return;

    const confirmar = window.confirm(
      `Confirma que o estudante ${pedido.nomeEstudante} levantou presencialmente o documento? Esta ação encerra o pedido.`,
    );
    if (!confirmar) return;

    updateMutation.mutate(
      {
        novoEstado: "ENTREGUE",
        idAtendente: getIdAtendente(),
        comentario: "Declaração entregue presencialmente ao estudante no DAAC.",
      },
      {
        onSuccess: () => {
          setModalMessage(`Pedido ${pedido.codigo} marcado como ENTREGUE!`);
          setStatus("success");
          open();
        },
        onError: (error) => {
          console.error("Erro ao registar entrega:", error);
          setModalMessage("Não foi possível marcar o pedido como entregue.");
          setStatus("error");
          open();
        },
      },
    );
  };

  const biAnexo = pedido?.anexos?.find((a) => a.tipoDocumento === "COPIA_BI");
  const comprovativoAnexo = pedido?.anexos?.find(
    (a) => a.tipoDocumento === "COMPROVATIVO_PAGAMENTO",
  );

  const handleOpenDocModal = async (anexoId?: number, titulo?: string) => {
    if (!anexoId) {
      alert("Documento não anexado.");
      return;
    }

    try {
      setIsLoadingDoc(true);
      setModalTitle(titulo || "Pré-visualização de Documento");

      const response = await api.get(`/anexos/${anexoId}/url-temporaria`);
      setPreviewUrl(response.data.data);
      setIsDocModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar o documento:", error);
      setModalMessage("Não foi possível carregar o documento de forma segura.");
      setStatus("error");
      open();
    } finally {
      setIsLoadingDoc(false);
    }
  };

  // Estilo visual dinâmico para a badge de estado
  const getBadgeStyle = (estado?: string) => {
    switch (estado) {
      case "AGUARDANDO_ASSINATURA":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "DISPONIVEL":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ENTREGUE":
        return "bg-slate-100 text-slate-700 border-slate-300";
      case "REJEITADO":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  useEffect(() => {
    open();
  }, [gerarDeclaracaoMutation.isSuccess, updateMutation.isSuccess]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-24">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              INSPECÇÃO DO PEDIDO
            </span>
            <span className="font-mono text-xs font-bold text-slate-800">
              {pedido?.codigo || "---"}
            </span>
          </div>
          <span
            className={`border text-[10px] font-semibold px-3 py-1 rounded-full uppercase ${getBadgeStyle(
              pedido?.estado,
            )}`}
          >
            {pedido?.estado?.replace("_", " ") || "PENDENTE"}
          </span>
        </div>

        {/* Dados do Estudante */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Estudante
            </span>
            <span className="font-bold text-slate-900">
              {pedido?.nomeEstudante || "---"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Matrícula
            </span>
            <span className="font-mono font-semibold text-slate-900">
              {pedido?.numeroMecanogEstudante || "---"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Curso
            </span>
            <span className="font-semibold text-slate-900">
              {pedido?.curso || (pedido ? "Engenharia Informática" : "---")}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Tipo de Declaração
            </span>
            <span className="font-semibold text-slate-900">
              Matrícula e Frequência
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Nº B.I.
            </span>
            <span className="font-mono font-semibold text-slate-900">
              {pedido?.numeroBi || "---"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Ano / Letivo
            </span>
            <span className="font-semibold text-slate-900">
              {pedido?.anoFrequencia
                ? `${pedido.anoFrequencia} (${pedido.anoLetivo})`
                : "---"}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Filiação
            </span>
            <span className="font-semibold text-slate-900">
              {pedido?.nomePai && pedido?.nomeMae
                ? `${pedido.nomePai} e ${pedido.nomeMae}`
                : "---"}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Efeito Solicitado
            </span>
            <span className="font-semibold text-slate-900">
              {pedido?.efeitoDeclaracao || "---"}
            </span>
          </div>
        </div>

        {/* Secção de Anexos */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-900 block">
            Anexos para validação
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() =>
                handleOpenDocModal(
                  biAnexo?.id,
                  "Cópia do Bilhete de Identidade (B.I.)",
                )
              }
              className={`border rounded-xl p-3 flex items-center justify-between transition-all ${
                biAnexo
                  ? "border-slate-200 bg-slate-50/50 hover:bg-slate-100 cursor-pointer group"
                  : "border-slate-100 bg-slate-50/20 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <FileText className="w-4 h-4 text-[#0f2c33] shrink-0" />
                <span className="text-xs font-medium text-slate-700 truncate">
                  Cópia do BI
                </span>
              </div>
              <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
            </div>

            <div
              onClick={() =>
                handleOpenDocModal(
                  comprovativoAnexo?.id,
                  "Comprovativo de Pagamento",
                )
              }
              className={`border rounded-xl p-3 flex items-center justify-between transition-all ${
                comprovativoAnexo
                  ? "border-slate-200 bg-slate-50/50 hover:bg-slate-100 cursor-pointer group"
                  : "border-slate-100 bg-slate-50/20 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-2 truncate">
                <FileText className="w-4 h-4 text-[#0f2c33] shrink-0" />
                <span className="text-xs font-medium text-slate-700 truncate">
                  Comprovativo
                </span>
              </div>
              <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0" />
            </div>
          </div>
        </div>

        {/* Motivo Informado / Rejeição Anterior */}
        {pedido?.motivoRejeicao && (
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Motivo da última rejeição
            </span>
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200/60 leading-relaxed">
              {pedido.motivoRejeicao}
            </p>
          </div>
        )}

        {/* --- BOTÕES DE AÇÃO CONDICIONAIS POR ESTADO --- */}
        {pedido && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            {/* ESTADO 1: PENDENTE -> Pode Aprovar ou Rejeitar */}
            {pedido.estado === "PENDENTE" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleApprove}
                  disabled={updateMutation.isPending}
                  className="bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Aprovar pedido</span>
                </button>

                <button
                  onClick={() => setIsRejectModalOpen(true)}
                  disabled={updateMutation.isPending}
                  className="bg-white border border-slate-300 hover:bg-red-50 hover:border-red-300 hover:text-red-700 text-slate-700 text-xs font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  <span>Rejeitar</span>
                </button>
              </div>
            )}

            {/* ESTADO 2: AGUARDANDO_ASSINATURA -> Gerar PDF Oficial */}
            {pedido.estado === "AGUARDANDO_ASSINATURA" && (
              <div className="space-y-2">
                <button
                  onClick={handleGerarDeclaracao}
                  disabled={gerarDeclaracaoMutation.isPending}
                  className="w-full bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {gerarDeclaracaoMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileCheck className="w-4 h-4" />
                  )}
                  <span>
                    {gerarDeclaracaoMutation.isPending
                      ? "A gerar Declaração PDF..."
                      : "Gerar Declaração  (PDF)"}
                  </span>
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  O pedido já foi validado. Gere o documento oficial ou avance
                  para a fila de impressão em lote.
                </p>
              </div>
            )}

            {/* ESTADO 3: DISPONIVEL -> Marcar como Entregue */}
            {pedido.estado === "DISPONIVEL" && (
              <div className="space-y-2">
                <button
                  onClick={handleMarcarEntregue}
                  disabled={updateMutation.isPending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>
                    {updateMutation.isPending
                      ? "A registar entrega..."
                      : "Marcar como Entregue"}
                  </span>
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  Clique acima apenas após a entrega presencial ao estudante.
                </p>
              </div>
            )}

            {/* Link para visualizar/descarregar o PDF caso já tenha sido gerado */}
            {/* Botão para visualizar a declaração oficial (disponível sempre que já existir ou após gerar) */}
            {(declaracaoGeradaUrl ||
              pedido.estado === "AGUARDANDO_ASSINATURA" ||
              pedido.estado === "DISPONIVEL" ||
              pedido.estado === "ENTREGUE") && (
              <button
                type="button"
                onClick={handleAbrirDeclaracaoGerada}
                disabled={isLoadingDoc}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoadingDoc ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                <span>Visualizar a Declaração Gerada</span>
              </button>
            )}

            {/* ESTADOS TERMINAIS: ENTREGUE ou REJEITADO */}
            {(pedido.estado === "ENTREGUE" ||
              pedido.estado === "REJEITADO") && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-center space-x-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Processo encerrado — nenhuma alteração permitida.</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL DE PRÉ-VISUALIZAÇÃO DE DOCUMENTO --- */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#0f2c33]" />
                <h3 className="font-bold text-slate-800 text-sm">
                  {modalTitle}
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                {previewUrl && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-600 hover:text-[#0f2c33] flex items-center space-x-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <span>Abrir numa aba</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setIsDocModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 bg-white border border-slate-200 p-1.5 rounded-xl cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 p-4 relative flex items-center justify-center overflow-hidden">
              {isLoadingDoc ? (
                <div className="flex flex-col items-center space-y-2 text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin text-[#0f2c33]" />
                  <span className="text-xs">
                    A carregar documento seguro...
                  </span>
                </div>
              ) : previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-inner"
                  title="Pré-visualização"
                />
              ) : (
                <p className="text-xs text-slate-500">
                  Erro ao carregar o conteúdo.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE REJEIÇÃO COM JUSTIFICATIVA --- */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center space-x-3 text-red-600">
              <div className="p-2 bg-red-50 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Rejeitar Pedido
                </h3>
                <p className="text-xs text-slate-500">
                  Esta ação atualizará o estado para Rejeitado.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Motivo da Rejeição <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={motivoRejeicao}
                onChange={(e) => setMotivoRejeicao(e.target.value)}
                placeholder="Ex: Comprovativo de pagamento ilegível ou valor incorreto."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={updateMutation.isPending}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                {updateMutation.isPending && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                )}
                <span>Confirmar Rejeição</span>
              </button>
            </div>
          </div>
          <SuccessModal
            isOpen={isOpen}
            closeModal={close}
            openModal={open}
            message={modalMessage}
            status={status}
          />
        </div>
      )}
    </>
  );
};
