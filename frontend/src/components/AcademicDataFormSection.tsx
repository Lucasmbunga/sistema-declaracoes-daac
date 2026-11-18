import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { RequestFormData } from '../schemas/requestSchema';
import { Loader2 } from 'lucide-react';
import { useStudentData } from '../hooks/useStudentData';

interface AcademicDataFormSectionProps {
  register: UseFormRegister<RequestFormData>;
  errors: FieldErrors<RequestFormData>;
}

export const AcademicDataFormSection: React.FC<AcademicDataFormSectionProps> = ({ register, errors }) => {
  const { data: estudante, isLoading } = useStudentData();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h3 className="font-bold text-lg text-slate-900">Dados académicos</h3>
        <p className="text-xs text-slate-500">Confirme os dados associados ao seu registo.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-xs text-slate-500 space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-[#0f2c33]" />
          <span>A carregar dados académicos do estudante...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome do estudante (Readonly dinâmico) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nome do estudante
            </label>
            <input
              type="text"
              readOnly
              value={estudante?.nomeCompletoUsuario || ''}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none font-medium"
            />
          </div>

          {/* Número de processo / matrícula (Readonly dinâmico) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Número de Processo / Matrícula
            </label>
            <input
              type="text"
              readOnly
              value={estudante?.numeroMecanog || estudante?.numeroProcesso || ''}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none font-mono"
            />
          </div>

          {/* Curso (Readonly dinâmico) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Curso
            </label>
            <input
              type="text"
              readOnly
              value={estudante?.nomeCurso || ''}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none font-medium"
            />
          </div>

          {/* Turma (Readonly dinâmico) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Turma
            </label>
            <input
              type="text"
              readOnly
              value={estudante?.turma || 'Não atribuída'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none font-medium"
            />
          </div>

          {/* Ano lectivo */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Ano lectivo
            </label>
            <select
              {...register('anoLectivo')}
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.anoLectivo ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
              }`}
            >
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2026/2027">2026/2027</option>
              <option value="2027/2028">2027/2028</option>
            </select>
            {errors.anoLectivo && <p className="text-xs text-red-600 font-medium">{errors.anoLectivo.message}</p>}
          </div>

          {/* Finalidade do pedido */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Finalidade do pedido
            </label>
            <select
              {...register('finalidadePedido')}
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                errors.finalidadePedido ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
              }`}
            >
              <option value="">Seleccione uma finalidade</option>
              <option value="bolsa">Bolsa de estudos</option>
              <option value="emprego">Candidatura a emprego</option>
              <option value="estagio">Estágio curricular</option>
              <option value="outro">Outros fins</option>
            </select>
            {errors.finalidadePedido && <p className="text-xs text-red-600 font-medium">{errors.finalidadePedido.message}</p>}
          </div>
        </div>
      )}

      {/* Motivo ou observação */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Motivo ou observação
        </label>
        <textarea
          rows={3}
          placeholder="Indique informação adicional relevante (opcional)."
          {...register('motivoObservacao')}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0f2c33] focus:ring-2 focus:ring-[#0f2c33]/20 transition-all resize-none"
        />
      </div>
    </div>
  );
};