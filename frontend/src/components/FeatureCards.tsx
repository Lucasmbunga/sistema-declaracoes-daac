import React from 'react';
import { FileText, ShieldCheck, Award } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  return (
    <section className="py-8 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#fafaf9] p-6 rounded-2xl border border-slate-200/60 flex items-start space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#0f2c33]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Pedido simples</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solicitar declaração de matrícula ou frequência num único requisito.
              </p>
            </div>
          </div>

          <div className="bg-[#fafaf9] p-6 rounded-2xl border border-slate-200/60 flex items-start space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#0f2c33]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Acompanhamento seguro</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consulte o estado e o histórico sem precisar de voltar à secretaria.
              </p>
            </div>
          </div>

          <div className="bg-[#fafaf9] p-6 rounded-2xl border border-slate-200/60 flex items-start space-x-4">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#0f2c33]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Documento oficial</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Após aprovação, receba o recibo digital e acompanhe a disponibilização.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};