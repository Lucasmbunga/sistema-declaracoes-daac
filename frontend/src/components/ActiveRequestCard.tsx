import React from 'react';
import { Link } from 'react-router';
import {  ArrowRight } from 'lucide-react';

export const ActiveRequestCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">EM ACOMPANHAMENTO</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-slate-900">Aguarda assinatura</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
          O seu pedido foi validado pela DAAC e está no circuito de assinatura. Será avisado quando o documento estiver disponível.
        </p>
      </div>

      <div>
        <Link
          to="/estudante/pedidos/1"
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#0f2c33] hover:underline"
        >
          <span>Acompanhar pedido</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Linha temporal resumida */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Recebido</span>
          <span className="font-bold text-slate-800">18 Jun</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Validado</span>
          <span className="font-bold text-slate-800">18 Jun</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase font-semibold">Assinatura</span>
          <span className="font-bold text-amber-600">Em curso</span>
        </div>
      </div>
    </div>
  );
};