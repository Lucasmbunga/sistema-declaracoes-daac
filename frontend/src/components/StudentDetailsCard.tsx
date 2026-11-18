import React from 'react';
import { Loader2 } from 'lucide-react';
import { useStudentData } from '../hooks/useStudentData';

export const StudentDetailsCard: React.FC = () => {
  const { data: estudante, isLoading, isError } = useStudentData();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex items-center justify-center space-x-2 py-10">
        <Loader2 className="w-5 h-5 animate-spin text-[#0f2c33]" />
        <span className="text-xs text-slate-500">A carregar dados do estudante...</span>
      </div>
    );
  }

  if (isError || !estudante) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm text-center text-red-600 text-xs">
        Não foi possível carregar os dados académicos.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
        Dados do estudante
      </h3>

      <div className="space-y-3 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nome</span>
          <span className="font-bold text-slate-800 text-sm">
            {estudante.nomeCompletoUsuario || 'Nome não disponível'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Matrícula / Processo</span>
          <span className="font-mono font-semibold text-slate-800">
            {estudante.numeroMecanog || estudante.numeroProcesso || 'N/A'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Curso</span>
          <span className="font-semibold text-slate-800">
            {estudante.nomeCurso || 'Curso não especificado'}
          </span>
        </div>
        {estudante.turma && (
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Turma</span>
            <span className="font-semibold text-slate-800">
              {estudante.turma}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};