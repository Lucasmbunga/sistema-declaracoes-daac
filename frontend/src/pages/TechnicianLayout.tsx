import React from 'react';
import { Outlet } from 'react-router';
import { TechnicianSidebar } from '../components/TechnicianSidebar';
import { TechnicianHeader } from '../components/TechnicianHeader';

export const TechnicianLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Barra Lateral de Navegação do Técnico */}
      <TechnicianSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <TechnicianHeader />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};