import React, { useState } from 'react';
import { ShieldCheck, Copy, Printer, Check } from 'lucide-react';

interface DigitalReceiptCardProps {
  pedido?: {
    codigo: string;
    nomeEstudante?: string;
    dataAprovacao?: string;
    tipoDeclaracao?: string;
    estado?: string;
  };
}

export const DigitalReceiptCard: React.FC<DigitalReceiptCardProps> = ({ pedido }) => {
  const [copiado, setCopiado] = useState(false);

  // Valores padrão ou dinâmicos passados por props
  const codigo = pedido?.codigo || 'DAAC-2025-00462';
  const nomeEstudante = pedido?.nomeEstudante || 'Estudante';
  const dataAprovacao = pedido?.dataAprovacao 
    ? new Date(pedido.dataAprovacao).toLocaleDateString('pt-AO', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Pendente de aprovação';
  const tipo = pedido?.tipoDeclaracao || 'Declaração Académica';
  const isAprovado = pedido?.estado === 'DISPONIVEL' || pedido?.estado === 'PRONTO_PARA_LEVANTAMENTO' || pedido?.estado === 'APROVADO';

  const handleCopiar = () => {
    navigator.clipboard.writeText(codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>RECIBO DIGITAL</span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
          isAprovado ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {isAprovado ? 'Emitido' : 'Em processamento'}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="font-extrabold text-slate-900 text-base">
          {isAprovado ? 'Pedido aprovado' : 'Aguardando aprovação'}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          O recibo digital é emitido automaticamente após a aprovação do requerimento pelo DAAC.
        </p>
      </div>

      {/* Caixa do Recibo Digital DAAC */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="text-center space-y-1 border-b border-slate-200 pb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">RECIBO DIGITAL DAAC</span>
          <span className="font-mono text-sm font-bold text-[#0f2c33] block">{codigo}</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Código de rastreio</span>
            <span className="font-mono font-semibold text-slate-800">{codigo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estudante</span>
            <span className="font-semibold text-slate-800">{nomeEstudante}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Aprovado em</span>
            <span className="font-semibold text-slate-800">{dataAprovacao}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tipo</span>
            <span className="font-semibold text-slate-800">{tipo}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleCopiar}
            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5"
          >
            {copiado ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar código</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleImprimir}
            disabled={!isAprovado}
            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 text-center">
        Documento final disponível após assinatura e recolha no balcão do DAAC.
      </p>
    </div>
  );
};