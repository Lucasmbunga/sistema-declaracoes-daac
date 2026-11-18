import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { type RegisterFormData } from '../schemas/registerSchema';
import { Loader2 } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

interface AcademicDataSectionProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
}

export const AcademicDataSection: React.FC<AcademicDataSectionProps> = ({ register, errors }) => {
  const { data: cursos, isLoading: isLoadingCursos } = useCourses();
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-4">
        Dados académicos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Número de estudante / matrícula */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Número de Mecanográfico
          </label>
          <input
            type="text"
            placeholder="Ex.: 2021.ENG.0478"
            {...register('numeroMecanog')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.numeroMecanog ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          />
          {errors.numeroMecanog && <p className="text-xs text-red-600 font-medium">{errors.numeroMecanog.message}</p>}
        </div>

        {/* Curso */}
        {/* Curso carregado dinamicamente via API */}
  <div className="space-y-1.5">
    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
      Curso
    </label>
    <div className="relative">
      <select
        {...register('idCurso')}
        disabled={isLoadingCursos}
        className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
          errors.idCurso ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
        }`}
      >
        <option value="">{isLoadingCursos ? 'A carregar cursos...' : 'Seleccione o curso'}</option>
        {cursos?.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nome}
          </option>
        ))}
      </select>
      {isLoadingCursos && (
        <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-3.5 text-slate-400" />
      )}
    </div>
    {errors.idCurso && <p className="text-xs text-red-600 font-medium">{errors.idCurso.message}</p>}
  </div>

        {/* Campo */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Número de Processo
          </label>
          <input
            {...register('numeroProcesso')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.numeroProcesso ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}

          
        />
          {errors.numeroProcesso && <p className="text-xs text-red-600 font-medium">{errors.numeroProcesso.message}</p>}
        </div>

        {/* Turma */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Turma
          </label>
          <select
            {...register('turma')}
            className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
              errors.turma ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20'
            }`}
          >
            <option value="">Seleccione a turma</option>
            <option value="A">Turma A</option>
            <option value="B">Turma B</option>
            <option value="C">Turma C</option>
          </select>
          {errors.turma && <p className="text-xs text-red-600 font-medium">{errors.turma.message}</p>}
        </div>
      </div>
    </div>
  );
};