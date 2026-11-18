import React from 'react';
import { NavLink } from 'react-router';
import { ClipboardList, Printer, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const TechnicianSidebar: React.FC = () => {
    const {logout}=useAuth();
  
  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 p-6 flex-col justify-between hidden lg:flex">
      <div className="space-y-8">
        {/* Logo / Título */}
        <div className="space-y-1">
          <h1 className="font-extrabold text-slate-900 text-base">DAAC / UNIKIVI</h1>
          <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Faculdade de Engenharia</p>
        </div>

        {/* Menu de Operações */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Operações DAAC</span>
          <nav className="space-y-1">
            <NavLink
              to="/tecnico/painel"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-[#0f2c33] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <ClipboardList className="w-4 h-4" />
              <span>Fila de atendimento</span>
            </NavLink>

            <NavLink
              to="/tecnico/impressao-lote"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-[#0f2c33] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Printer className="w-4 h-4" />
              <span>Impressão em lote</span>
            </NavLink>
          </nav>
        </div>

        {/* Menu de Gestão */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gestão</span>
          <nav className="space-y-1">
            <NavLink
              to="/tecnico/administracao"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive ? 'bg-[#0f2c33] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span>Administração</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Bloco de Ajuda e Sair */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="bg-[#fafaf9] border border-slate-200/80 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
            <HelpCircle className="w-4 h-4 text-[#0f2c33]" />
            <span>Precisa de ajuda?</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Contacte o atendimento da Faculdade de Engenharia.
          </p>
          <span className="text-[11px] font-semibold text-[#0f2c33] block">daac@unikivi.ao</span>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 text-xs font-semibold text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};