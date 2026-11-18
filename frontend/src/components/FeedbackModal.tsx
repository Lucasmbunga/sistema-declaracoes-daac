import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'submissao' | 'sucesso' | 'rejeicao';
  codigoPedido?: string;
  onAction?: () => void;
}
export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  type,
  codigoPedido = 'DAAC-2025-00492',
  onAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 relative">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
        ></button>
        <X className="w-5 h-5" />

        {/* Tipo 1: Submissão Recebida */}
        {type === 'submissao' && (
          <>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f0f2] text-[#0f2c33] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">SUBMISSÃO RECEBIDA</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">O pedido entrou na fila</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  O seu requerimento foi registado e será analisado pela equipe da DAAC.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CÓDIGO DO PEDIDO</span>
              <span className="font-mono text-sm font-bold text-[#0f2c33] block">{codigoPedido}</span>
              <p className="text-[11px] text-slate-500 pt-1">⚠️ Recibo ainda não emitido. Emitido após aprovação.</p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-5 rounded-xl transition-all"
              >
                Fechar
              </button>
              <button
                onClick={onAction}
                className="bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>Acompanhar pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
               </div>
          </>
        )}

        {/* Tipo 2: Sucesso / Aprovado */}
        {type === 'sucesso' && (
          <>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">APROVADO</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Pedido aprovado com sucesso</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  O recibo digital foi emitido e encontra-se disponível para consulta e impressão.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CÓDIGO DO RECIBO</span>
              <span className="font-mono text-sm font-bold text-emerald-700 block">{codigoPedido}</span>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-5 rounded-xl transition-all"
              >
                Fechar
              </button>
              <button
                onClick={onAction}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-md transition-all"
              >
                Ver Recibo Digital
              </button>
            </div>
             </>
        )}

        {/* Tipo 3: Confirmação de Rejeição / Motivo Obrigatório */}
        {type === 'rejeicao' && (
          <>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">REJEIÇÃO DE PEDIDO</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Confirmação de rejeição</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Indique o motivo formal obrigatório para que o estudante possa corrigir o requerimento.
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Motivo formal obrigatório
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Comprovativo de pagamento ilegível ou incorreto..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0f2c33] focus:ring-2 focus:ring-[#0f2c33]/20 resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={onClose}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-3 px-5 rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={onAction}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-md transition-all"
              >
                Confirmar Rejeição
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};