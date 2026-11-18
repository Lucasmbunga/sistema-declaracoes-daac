import React from 'react';
import { ActiveRequestCard } from '../components/ActiveRequestCard';
import { RecentNotificationCard } from '../components/RecentNotificationCard';
import { ActionCards } from '../components/ActionCards';
import { RecentRequestsList } from '../components/RecentRequestList';
import { Loader2 } from 'lucide-react';
import { useStudentData } from '../hooks/useStudentData';

export const StudentDashboard: React.FC = () => {
  const { data: estudante, isLoading } = useStudentData();

  // Extrai apenas o primeiro nome para do estudante
  const primeiroNome = estudante?.nomeCompletoUsuario 
    ? estudante.nomeCompletoUsuario.split(' ')[0] 
    : 'Estudante';

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center space-x-2">
          <span>Bom dia,</span>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#0f2c33]" />
          ) : (
            <span>{primeiroNome}.</span>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Aqui está o ponto de situação dos seus requerimentos.
        </p>
      </div>

      {/* Grelha Superior: Pedido Ativo + Notificação Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ActiveRequestCard />
        </div>
        <div className="lg:col-span-4">
          <RecentNotificationCard />
        </div>
      </div>

      {/* Lista de Pedidos Recentes */}
      <RecentRequestsList />

      {/* Cartões de Ação Inferiores */}
      <ActionCards />
    </div>
  );
};