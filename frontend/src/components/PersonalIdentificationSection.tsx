import React from 'react';
import type{ UseFormRegister, FieldErrors } from 'react-hook-form';
import type { RegisterFormData } from '../schemas/registerSchema';

interface PersonalIdentificationSectionProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
}

export const PersonalIdentificationSection: React.FC<PersonalIdentificationSectionProps> = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4">
        Identificação pessoal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome Completo */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Nome completo
          </label>
          <input
            type="text"
            placeholder="Nome como consta no BI"
            {...register('nomeCompleto')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.nomeCompleto ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          {errors.nomeCompleto && <p className="text-xs text-red-600 font-medium">{errors.nomeCompleto.message}</p>}
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            E-mail
          </label>
          <input
            type="email"
            placeholder="nome@exemplo.ao"
            {...register('email')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          {errors.email && <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>}
        </div>

        {/* Número do BI */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Número do BI
          </label>
          <input
            type="text"
            placeholder="000000000LA000"
            {...register('numeroBi')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.numeroBi ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          {errors.numeroBi && <p className="text-xs text-red-600 font-medium">{errors.numeroBi.message}</p>}
        </div>

        {/* Telefone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Telefone
          </label>
          <input
            type="text"
            placeholder="+244 923 000 000"
            {...register('telefone')}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0f2c33] focus:ring-2 focus:ring-[#0f2c33]/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
};