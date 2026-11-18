import React from 'react';
import { Link } from 'react-router';
import { FilePlus, HelpCircle, ArrowRight } from 'lucide-react';

export const ActionCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Novo Pedido */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
        <div className="flex items-start space-x-4">
          <div className="bg-[#e6f0f2] text-[#0f2c33] p-3 rounded-2xl">
            <FilePlus className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Precisa de outra declaração?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faça um novo pedido de matrícula ou frequência.
            </p>
          </div>
        </div>
        <div>
          <Link
            to="/perfil/student/pedir-requerimento"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0f2c33] hover:underline"
          >
            <span>Iniciar pedido</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Dúvidas sobre o processo */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between space-y-4">
        <div className="flex items-start space-x-4">
          <div className="bg-[#e6f0f2] text-[#0f2c33] p-3 rounded-2xl">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Dúvidas sobre o processo?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A equipa DAAC pode ajudar com o seu requerimento.
            </p>
          </div>
        </div>
        <div>
          <a
            href="mailto:daac@unikivi.ao"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#0f2c33] hover:underline"
          >
            <span>Contactar atendimento</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};