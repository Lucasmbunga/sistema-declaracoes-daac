import React from 'react';
import { Link } from 'react-router';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const InstitutionalBanner: React.FC = () => {
  return (
    <section id="seguranca" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0f2c33] text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>TRANSPARÊNCIA INSTITUCIONAL</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight">Sem surpresas no processo.</h3>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              A emissão de recibo digital ocorre somente depois da aprovação do requerimento. Os documentos são disponibilizados após o circuito de assinatura e impressão.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link 
              to="/login"
              className="bg-white hover:bg-slate-100 text-[#0f2c33] font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center space-x-2 text-sm"
            >
              <span>Aceder ao portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};