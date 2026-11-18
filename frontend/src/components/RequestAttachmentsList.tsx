import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { AttachmentViewerModal } from './AttachmentViewerModal';
import type { AnexoRespostaDto } from '../types/api';

interface RequestAttachmentsListProps {
  anexos?: AnexoRespostaDto[];
}
export const RequestAttachmentsList: React.FC<RequestAttachmentsListProps> = ({ anexos = [] }) => {
  const [selectedAnexo, setSelectedAnexo] = useState<AnexoRespostaDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenViewer = (anexo: AnexoRespostaDto) => {
    setSelectedAnexo(anexo);
    setIsModalOpen(true);
  };

  const temAnexos = anexos && anexos.length > 0;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Anexos</h3>
            <p className="text-xs text-slate-500">Documentos entregues com o requerimento.</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {temAnexos ? `${anexos.length} ${anexos.length === 1 ? 'anexo' : 'anexos'}` : '0 anexos'}
          </span>
        </div>

        {temAnexos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anexos.map((anexo, index) => (
              <div
                key={anexo.id || index}
                className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between bg-slate-50/50 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center space-x-3 truncate">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-[#0f2c33] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-slate-900 truncate" title={anexo.nome}>
                      {anexo.nome}
                    </h4>
                    <p className="text-[11px] text-emerald-600 flex items-center space-x-1 font-medium">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>Validado pelo DAAC</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenViewer(anexo)}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-[#0f2c33] bg-[#e6f0f2] hover:bg-[#d4e4e8] px-3 py-2 rounded-xl transition-all shrink-0 ml-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className='text-red-600'>Ver</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2 bg-slate-50/50">
            <div className="inline-flex p-3 bg-slate-100 text-slate-400 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-xs text-slate-700">Não há dados disponíveis</h4>
            <p className="text-[11px] text-slate-500">
              Nenhum documento ou comprovativo foi anexado a este requerimento.
            </p>
          </div>
        )}
      </div>

      {/* Modal de Pré-visualização */}
      <AttachmentViewerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        anexo={selectedAnexo}
      />
    </>
  );
};