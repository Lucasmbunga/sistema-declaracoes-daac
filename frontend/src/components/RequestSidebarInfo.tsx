import React from 'react';
import { Info, HelpCircle, ArrowRight } from 'lucide-react';

export const RequestSidebarInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Antes de submeter */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#0f2c33] uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Antes de submeter</span>
        </div>
        <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-disc list-inside">
          <li>Confirme os seus dados académicos.</li>
          <li>Anexe BI e comprovativo legíveis.</li>
          <li>Utilize ficheiros PDF, JPG ou PNG.</li>
        </ul>
      </div>

      {/* O que acontece depois? */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#0f2c33] uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>O que acontece depois?</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          A DAAC valida o pedido. Após aprovação, o requerimento segue para assinatura e impressão em lote.
        </p>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#0f2c33]">
          <span>Análise → Recebido → Aprovado</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};