import React from 'react';

interface StepItemProps {
  stepNumber: string;
  title: string;
  description: string;
}

const StepItem: React.FC<StepItemProps> = ({ stepNumber, title, description }) => (
  <div className="bg-[#fafaf9] p-6 rounded-2xl border border-slate-200/60 hover:shadow-md transition-shadow">
    <span className="text-xs font-mono font-bold text-amber-600 mb-2 block">{stepNumber}</span>
    <h4 className="font-bold text-slate-900 text-base mb-1.5">{title}</h4>
    <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export const ProcessSteps: React.FC = () => {
  return (
    <section id="como-funciona" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-[#0f2c33] uppercase tracking-widest block">UMA ETAPA DE CADA VEZ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              O seu pedido, faça envio à entrega.
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              O portal organiza a comunicação entre estudante e atendimento. Saiba sempre o que já foi feito e o que acontece a seguir.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StepItem 
              stepNumber="01/04"
              title="Submeta o pedido"
              description="Escolha o tipo de declaração e anexe BI e comprovativo de pagamento."
            />
            <StepItem 
              stepNumber="02/04"
              title="Uma análise DAAC"
              description="O técnico valida os dados e registra a decisão no processo."
            />
            <StepItem 
              stepNumber="03/04"
              title="Aguarde a assinatura"
              description="Os pedidos aprovados seguem para assinatura e envio."
            />
            <StepItem 
              stepNumber="04/04"
              title="Levante o documento"
              description="Receba um aviso quando o documento estiver disponível para entrega."
            />
          </div>

        </div>

      </div>
    </section>
  );
};