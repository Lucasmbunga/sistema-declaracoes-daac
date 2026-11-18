import React from 'react';
import { Printer, ShieldCheck, Loader2 } from 'lucide-react';

interface BatchGenerationPanelProps {
  selectedCount: number;
  periodo: string;
  onGenerateBatch: () => void;
  isPending?: boolean;
}

export const BatchGenerationPanel: React.FC<BatchGenerationPanelProps> = ({
  selectedCount,
  periodo,
  onGenerateBatch,
  isPending = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6 sticky top-24">
      <div className="flex items-center space-x-2 text-xs font-bold text-[#0f2c33] uppercase tracking-wider">
        <Printer className="w-4 h-4" />
        <span>Gerar lote</span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Período</span>
          <span className="font-semibold text-slate-800">{periodo}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Documentos selecionados</span>
          <span className="font-bold text-[#0f2c33]">{selectedCount}</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500">Estado atual</span>
          <span className="font-semibold text-slate-800">Aguardando Assinatura</span>
        </div>
      </div>

      <button
        onClick={onGenerateBatch}
        disabled={selectedCount === 0 || isPending}
        className="w-full bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
        <span>{isPending ? 'A gerar lote...' : 'Gerar lote e concluir'}</span>
      </button>

      <p className="text-[11px] text-slate-500 leading-relaxed text-center">
        A ação marca os documentos selecionados como <strong className="text-slate-700">DISPONÍVEL</strong> de uma só vez.
      </p>

      {/* Caixa Informativa de Rastreabilidade */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Disponibilização rastreável</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          O lote gera um código único e atualiza todos os documentos selecionados no mesmo momento para levantamento.
        </p>
      </div>
    </div>
  );
};