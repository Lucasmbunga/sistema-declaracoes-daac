import React from "react";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import type { AnexoRespostaDto } from "../types/api";

interface AttachmentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  anexo: AnexoRespostaDto | null;
}

export const AttachmentViewerModal: React.FC<AttachmentViewerModalProps> = ({
  isOpen,
  onClose,
  anexo,
}) => {
  if (!isOpen || !anexo) return null;

  const isPdf =
    anexo.nome?.toLowerCase().endsWith(".pdf") ||
    anexo.tipoDocumento?.toLowerCase().includes("pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <div className="bg-[#e6f0f2] text-[#0f2c33] p-2 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {anexo.nome}
              </h3>
              <p className="text-[11px] text-slate-500 uppercase">
                Pré-visualização do documento anexado
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={anexo.urlDocumento}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              title="Abrir numa nova aba"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={anexo.urlDocumento}
              download={anexo.nome}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              title="Descarregar ficheiro"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Visualizador (iframe para PDF ou img para imagens) */}
        <div className="flex-1 bg-slate-100 flex items-center justify-center p-4 overflow-hidden relative">
          {isPdf ? (
            <iframe
              src={`${anexo.urlDocumento}#view=FitH`}
              title={anexo.nome}
              className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-inner"
            />
          ) : (
            <img
              src={anexo.urlDocumento}
              alt={anexo.nome}
              className="max-w-full max-h-full object-contain rounded-xl shadow-md bg-white border border-slate-200"
            />
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-5 rounded-xl transition-all"
          >
            Fechar janela
          </button>
        </div>
      </div>
    </div>
  );
};
