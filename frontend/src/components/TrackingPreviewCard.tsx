import React from 'react';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

export const TrackingPreviewCard: React.FC = () => {
  return (
    <div className="bg-[#0f2c33] text-white rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden border border-[#1c4750]">
      {/* Elementos decorativos circulares de fundo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-[#1c4750] pointer-events-none opacity-50" />
      <div className="absolute right-10 bottom-10 w-48 h-48 rounded-full border border-[#1c4750] pointer-events-none opacity-30" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <span className="text-xs font-semibold text-slate-300 tracking-wide">PEDIDO DE CRÉDITO</span>
        <span className="bg-[#15363d] border border-[#235863] text-[#4ade80] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          EM ANÁLISE
        </span>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex items-start space-x-3.5">
          <div className="bg-[#15363d] text-[#4ade80] p-2 rounded-full mt-0.5 border border-[#235863]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Requerimento</p>
            <p className="text-xs text-slate-400">18 de junho - 09:42</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="bg-[#15363d] text-[#4ade80] p-2 rounded-full mt-0.5 border border-[#235863]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Documentos validados</p>
            <p className="text-xs text-slate-400">18 de junho - 11:08</p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="bg-[#15363d] text-amber-400 p-2 rounded-full mt-0.5 border border-[#235863]">
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Assinatura da Direcção</p>
            <p className="text-xs text-amber-400 font-medium">Em curso</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#1c4750] flex items-center justify-between relative z-10">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">CÓDIGO DE GUERRA</span>
          <span className="font-mono text-xs text-slate-200 font-semibold">DAAC-2025-00481</span>
        </div>
        <div className="bg-white/10 hover:bg-white/20 transition-colors p-2.5 rounded-xl cursor-pointer">
          <FileText className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};