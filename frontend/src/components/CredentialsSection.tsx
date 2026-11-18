import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { RegisterFormData } from '../schemas/registerSchema';

interface CredentialsSectionProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4">
        Credenciais de acesso
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Palavra-passe */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Palavra-passe
          </label>
          <input
            type="password"
            placeholder="Criar palavra-passe"
            {...register('palavraPasse')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.palavraPasse ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          <p className="text-[11px] text-slate-500">Mínimo de 8 caracteres.</p>
          {errors.palavraPasse && <p className="text-xs text-red-600 font-medium">{errors.palavraPasse.message}</p>}
        </div>

        {/* Confirmar palavra-passe */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Confirmar palavra-passe
          </label>
          <input
            type="password"
            placeholder="Repetir palavra-passe"
            {...register('confirmarPalavraPasse')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.confirmarPalavraPasse ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          {errors.confirmarPalavraPasse && <p className="text-xs text-red-600 font-medium">{errors.confirmarPalavraPasse.message}</p>}
        </div>
      </div>
    </div>
  );
};