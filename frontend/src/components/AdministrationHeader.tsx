import React from 'react';
import { Download } from 'lucide-react';
import MetricCard from './MetricCard';

export const AdministrationHeader: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Título e Botão de Exportar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONTROLO E RASTREABILIDADE</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Administração DAAC</h1>
          <p className="text-xs sm:text-sm text-slate-600">Gestão de acessos, cursos e histórico de atividades.</p>
        </div>

        <button className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm">
          <Download className="w-4 h-4 text-slate-500" />
          <span>Relatório do exportador</span>
        </button>
      </div>

      {/* Métricas do Topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 
        <MetricCard title='Utilizadores ativos' value={1284}/>
        <MetricCard title='Pedidos deste mês' value={186}/>
        <MetricCard title='Técnicos DAAC' value={8}/>
        <MetricCard title='Ações registadas' value={2431}/>
      </div>
    </div>
  );
};