import React from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const StudentSidebar: React.FC = () => {
  const location = useLocation();
  const {logout}=useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between p-6 shrink-0">
      <div className="space-y-8">
        {/* Logótipo */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#0f2c33] p-2.5 rounded-xl text-white shadow-sm">
            <span className="font-bold text-sm tracking-tight">DAAC</span>
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block text-slate-900 leading-tight">
              DAAC / UNIKIVI
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
              FACULDADE DE ENGENHARIA
            </span>
          </div>
        </div>

        {/* Navegação */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
            ÁREA DO ESTUDANTE
          </span>

          <Link
            to="/perfil/student"
            className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive("/perfil/student")
                ? "bg-[#e6f0f2] text-[#0f2c33]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Visão geral</span>
          </Link>

          <Link
            to="/perfil/student/pedir-requerimento"
            className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive("/perfil/student/pedir-requerimento")
                ? "bg-[#e6f0f2] text-[#0f2c33]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <FilePlus className="w-4 h-4" />
            <span>Novo requerimento</span>
          </Link>

          <Link
            to="/perfil/student/pedidos"
            className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive("/perfil/student/pedidos")
                ? "bg-[#e6f0f2] text-[#0f2c33]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Acompanhar pedido</span>
          </Link>
        </div>

        {/* Caixa de Ajuda */}
        <div className="bg-[#fafaf9] border border-slate-200/60 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold text-xs">
            <HelpCircle className="w-4 h-4 text-[#0f2c33]" />
            <span>Precisa de ajuda?</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Contacte o atendimento da Faculdade de Engenharia.
          </p>
          <a
            href="mailto:daac@unikivi.ao"
            className="text-[11px] font-semibold text-[#0f2c33] hover:underline block"
          >
            daac@unikivi.ao
          </a>
        </div>
      </div>

      {/* Sair da Demonstração */}
      <div className="pt-6 border-t border-slate-100">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
