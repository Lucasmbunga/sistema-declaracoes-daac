import React from 'react';
import { Link } from 'react-router';
import { FilePlus, ChevronDown, Loader2 } from 'lucide-react';
import { useStudentData } from '../hooks/useStudentData';

export const StudentHeader: React.FC = () => {
  const { data: estudante, isLoading } = useStudentData();

  // Função auxiliar para gerar as iniciais do nome (ex: Mateus Manuel -> MM)
  const getInitials = (name?: string) => {
    if (!name) return 'DA';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>{new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/perfil/student/pedir-requerimento"
          className="bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-2"
        >
          <FilePlus className="w-4 h-4" />
          <span>Novo requerimento</span>
        </Link>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center space-x-3">
          <div className="bg-[#e6f0f2] text-[#0f2c33] font-bold text-xs w-9 h-9 rounded-xl flex items-center justify-center">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : getInitials(estudante?.nomeCompletoUsuario)}
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-xs text-slate-900 block leading-tight">
              {isLoading ? 'A carregar...' : (estudante?.nomeCompletoUsuario || 'Estudante')}
            </span>
            <span className="text-[10px] text-slate-500 block">
              {estudante?.nomeCurso || 'Estudante'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};