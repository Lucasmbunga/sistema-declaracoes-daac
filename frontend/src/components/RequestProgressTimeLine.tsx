import React, { type Dispatch, type SetStateAction } from "react";
import {
  CheckCircle2,
  FileText,
  AlertCircle,
  Loader2,
  Clock,
  Check,
} from "lucide-react";
import type { PedidoDeclaracaoRespostaDto } from "../types/api";

interface ProgressTimiLineProps{
  pedidos:PedidoDeclaracaoRespostaDto[] | undefined;
  selectedId:number | string | null;
  isLoading:boolean;
  isError:boolean;
  setSelectedId:Dispatch<SetStateAction<string | number | null>>;
}
export const RequestProgressTimeline: React.FC<ProgressTimiLineProps> = ({pedidos,selectedId,setSelectedId,isLoading,isError}) => {
      const pedidoAtual = pedidos?.find((p) => p.id === selectedId) || pedidos?.at(0);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#0f2c33]" />
        <span>A carregar o progresso dos pedidos...</span>
      </div>
    );
  }

  if (isError || !pedidos || pedidos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
        <div className="inline-flex p-3 bg-slate-100 text-slate-400 rounded-xl">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-sm text-slate-700">
          Não há dados disponíveis
        </h3>
        <p className="text-xs text-slate-500">
          Ainda não possui nenhum requerimento submetido para rastrear o
          progresso.
        </p>
      </div>
    );
  }

  // Função para determinar o nível de progresso visual (0 a 4)
  const getStepLevel = (estado: string | undefined) => {
    switch (estado) {
      case "PENDENTE":
        return 2;
      case "AGUARDANDO_ASSINATURA":
        return 3;
      case "DISPONIVEL":
        return 4;
      case "ENTREGUE":
        return 5;
      default:
        return 1;
    }
  };

  const currentLevel = getStepLevel(pedidoAtual?.estado);

  const renderBadge = (estado: string | undefined) => {
    switch (estado) {
      case "PENDENTE":
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
            Pendente
          </span>
        );
      case "ENTREGUE":
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-600 text-xs font-semibold p-2 rounded-full">
            <Check/>
          </span>
        );
      case "DISPONIVEL":
        return <span className="bg-emerald-50/80 text-emerald-700 border border-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">Disponível</span>;
      case "REJEITADO":
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
            Rejeitado
          </span>
        );
      default:
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
            {estado}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Cabeçalho Dinâmico do Pedido */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="bg-[#e6f0f2] text-[#0f2c33] p-3 rounded-2xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="font-bold text-lg text-slate-900">
                {"Declaração Académica"}
              </h3>
              {renderBadge(pedidoAtual?.estado)}
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {pedidoAtual?.codigo} · Enviado em{" "}
              {pedidoAtual?.criadoEm
                ? new Date(pedidoAtual.criadoEm).toLocaleDateString("pt-AO")
                : "Data indisponível"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Pedido</span>
          <select
            value={pedidoAtual?.id}
            onChange={(e) => setSelectedId(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-700 focus:outline-none"
          >
            {pedidos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.codigo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progresso por etapas (Timeline Bar Dinâmica) */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          PROGRESSO DO PEDIDO
        </span>

        <div className="grid grid-cols-6 gap-2">
          <div className="space-y-1">
            <div
              className={`h-1.5 rounded-full transition-all  ${currentLevel >= 1 ? "bg-emerald-600" : "bg-slate-200"}`}
            />
            <span className="text-[11px] font-bold text-slate-900 block">
              Recebido
            </span>
          </div>
          <div className="space-y-1">
            <div
              className={`h-1.5 rounded-full transition-all ${currentLevel >= 2 ? "bg-emerald-600" : "bg-slate-200"}`}
            />
            <span className="text-[11px] font-bold text-slate-900 block">
              Pendente
            </span>
          </div>
          <div className="space-y-1 col-span-2">
            <div
              className={`h-1.5 rounded-full transition-all ${currentLevel >= 3 ? "bg-emerald-600" : "bg-slate-200"}`}
            />
            <span className="text-[11px] font-bold text-slate-900 block">
              Aguardando assinatura
            </span>
          </div>
          <div className="space-y-1">
            <div
              className={`h-1.5 rounded-full transition-all ${currentLevel >= 4 ? "bg-emerald-600" : "bg-slate-200"}`}
            />
            <span className="text-[11px] font-bold text-slate-900 block">
              Disponível
            </span>
          </div>
          <div className="space-y-1">
            <div
              className={`h-1.5 rounded-full transition-all ${currentLevel >= 5 ? "bg-emerald-600" : "bg-slate-200"}`}
            />
            <span className="text-[11px] font-bold text-slate-900 block">
              Entregue
            </span>
          </div>
        </div>
      </div>

      {/* Registo de etapas detalhadas dinâmicas */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-start space-x-4">
          <div
            className={`p-2 rounded-full mt-1 ${currentLevel >= 4 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
          >
            {currentLevel >= 4 ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
          </div>
          <div className="grow flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Documento disponibilizado
              </h4>
              <p className="text-xs text-slate-500">
                {currentLevel >= 4
                  ? "Pronto para levantamento no balcão DAAC"
                  : "Aguardando conclusão das etapas anteriores"}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {currentLevel >= 4 ? "Concluído" : "Pendente"}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div
            className={`p-2 rounded-full mt-1 ${currentLevel >= 3 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
          >
            {currentLevel >= 3 ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
          </div>
          <div className="grow flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Pedido aprovado
              </h4>
              <p className="text-xs text-slate-500">
                Validado pela equipa do DAAC
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {currentLevel >= 3 ? "Aprovado" : "Em espera"}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full mt-1">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="grow flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-900">
                Requerimento submetido
              </h4>
              <p className="text-xs text-slate-500">
                Submissão realizada com sucesso pelo portal
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {pedidoAtual?.criadoEm
                ? new Date(pedidoAtual.criadoEm).toLocaleDateString("pt-AO")
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
