import React from 'react';
import { Outlet } from 'react-router';
import { StudentHeader } from '../components/StudentHeader';
import { StudentSidebar } from '../components/StudentSideBar';

export const StudentDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col lg:flex-row font-sans selection:bg-[#0f2c33] selection:text-white">
      {/* Menu Lateral Fixo */}
      <StudentSidebar />

      {/* Conteúdo Principal do Painel */}
      <div className="grow flex flex-col min-w-0">
        <StudentHeader />

        <main className="grow p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* As subpáginas (Dashboard, Novo Requerimento, etc.) são injetadas aqui */}
          <Outlet />
        </main>

        {/* Rodapé institucional com dados académicos */}
        <footer className="bg-white border-t border-slate-200/80 px-6 py-4 text-center text-[11px] text-slate-500">
          Estudante: 2021.ENG.0478 · Engenharia Informática
        </footer>
      </div>
    </div>
  );
};