import React, { useState } from 'react';
import { AdministrationHeader } from '../components/AdministrationHeader';
import { AdministrationTabs } from '../components/AdministrationTabs';
import { AuditLogTable } from '../components/AuditLogTable';
import { UsersManagementTable } from '../components/UsersManagementTable'; // Novo import
import { CoursesManagementPanel } from '../components/CoursesManagementPanel'; // Importação final


export const AdministrationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'users' | 'courses'>('audit');

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Controlo e Métricas */}
      <AdministrationHeader />

      {/* Sistema de Abas / Subpastas */}
      <div className="space-y-4 pt-2">
        <AdministrationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Conteúdo Dinâmico Conforme a Aba Selecionada */}
        {activeTab === 'audit' && <AuditLogTable />}
        {activeTab === 'users' && <UsersManagementTable />}
        {activeTab === 'courses' && <CoursesManagementPanel />}
      </div>
    </div>
  );
};