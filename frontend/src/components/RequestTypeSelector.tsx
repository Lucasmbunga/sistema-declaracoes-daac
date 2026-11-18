import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import type { RequestFormData } from '../schemas/requestSchema';
interface RequestTypeSelectorProps {
  register: UseFormRegister<RequestFormData>;
  watch: UseFormWatch<RequestFormData>;
}

export const RequestTypeSelector: React.FC<RequestTypeSelectorProps> = ({ register, watch }) => {
  const selectedType = watch('tipoDeclaracao');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900">Tipo de declaração</h3>
          <p className="text-xs text-slate-500">Escolha o documento que pretende requerer.</p>
        </div>
        <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Etapa 1 de 3
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Declaração de Frequência */}
        <label className={`cursor-pointer border rounded-2xl p-5 flex items-start space-x-4 transition-all ${
          selectedType === 'FREQUENCIA' 
            ? 'border-[#0f2c33] bg-[#e6f0f2]/30 ring-2 ring-[#0f2c33]/20' 
            : 'border-slate-200 hover:border-slate-300 bg-white'
        }`}>
          <input 
            type="radio" 
            value="FREQUENCIA" 
            {...register('tipoDeclaracao')} 
            className="sr-only"
          />
          <div className={`p-2.5 rounded-xl ${selectedType === 'FREQUENCIA' ? 'bg-[#0f2c33] text-white' : 'bg-slate-100 text-slate-600'}`}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900">Declaração de frequência</span>
              {selectedType === 'FREQUENCIA' && <CheckCircle2 className="w-4 h-4 text-[#0f2c33]" />}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprova a frequência no ano lectivo.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};