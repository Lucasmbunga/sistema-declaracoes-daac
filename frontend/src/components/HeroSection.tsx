import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TrackingPreviewCard } from './TrackingPreviewCard';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-white py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#0f2c33] bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Atendimento académico, com esclarecer</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              As suas declarações. <br />
              <span className="text-[#0f2c33]">Sem filas, com confiança.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Peça de matrícula ou frequência na Faculdade de Engenharia da Universidade Kimpa Vita. Acompanhe cada etapa até à emissão do documento.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link 
                to="/pedidos/novo" 
                className="bg-[#0f2c33] hover:bg-[#15363d] text-white font-semibold px-6 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Começar requerimento</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-4 rounded-xl transition-all text-center"
              >
                Já tenho conta
              </Link>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Processo digital acompanhado pela DAAC</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <TrackingPreviewCard />
          </div>

        </div>
      </div>
    </section>
  );
};