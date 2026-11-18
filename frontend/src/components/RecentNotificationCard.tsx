import React from 'react';
import { Link } from 'react-router';
import { Bell } from 'lucide-react';

export const RecentNotificationCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 text-[#0f2c33]" />
            <span>NOTIFICAÇÃO RECENTE</span>
          </div>
          <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">
            DAAC-2025-00481
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-medium block">18 Jun 2025</span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            A declaração está agora a aguardar assinatura.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4">
        <Link
          to="/estudante/pedidos/1"
          className="text-xs font-bold text-[#0f2c33] hover:underline inline-flex items-center space-x-1"
        >
          <span>Ver histórico</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};