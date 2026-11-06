import React from 'react';
import { ShieldCheck, GraduationCap } from 'lucide-react';

export const LoginInfoPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#0f2c33] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
      {/* Círculos concêntricos decorativos fiéis ao protótipo */}
      <div className="absolute -right-32 -bottom-32 w-137.5 h-137.5 rounded-full border border-[#1c4750] pointer-events-none" />
      <div className="absolute -right-16 -bottom-16 w-100 h-100 rounded-full border border-[#1c4750] pointer-events-none" />

      {/* Cabeçalho do Painel */}
      <div className="flex items-center space-x-3 z-10">
        <div className="bg-[#15363d] p-2.5 rounded-xl text-white shadow-lg border border-[#235863]">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <span className="font-bold text-sm tracking-wide block leading-tight">DAAC / UNIKIVI</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">FACULDADE DE ENGENHARIA</span>
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="max-w-md space-y-6 z-10 my-auto py-12">
        <div className="w-12 h-1 bg-amber-500 rounded-full" />
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          O seu percurso académico, acompanhado.
        </h1>
        <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
          Aceda aos seus requerimentos e acompanhe com confiança cada etapa do atendimento da DAAC.
        </p>
      </div>

      {/* Rodapé do Painel */}
      <div className="space-y-3 z-10 text-xs text-slate-400">
        <div className="flex items-center space-x-2 text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Acesso protegido para a comunidade académica</span>
        </div>
        <p className="text-slate-500">Universidade Kimpa Vita · Angola</p>
      </div>
    </div>
  );
};