import type { FC } from "react";
import type { PedidoDeclaracaoRespostaDto } from "../types/api";
import { Check } from "lucide-react";

interface Props{
    requests:PedidoDeclaracaoRespostaDto[] | undefined;
    selectedId:number;
    onSelectRequest(id:number):void;
    searchTerm:string;
}
const ReceivedRequestsList:FC<Props>=({requests,selectedId,onSelectRequest})=>{

    const renderBadge = (estado: string) => {
    switch (estado) {
      case "PENDENTE":
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Pendente
          </span>
        );
      case "AGUARDANDO_ASSINATURA":
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Aguardando assinatura
          </span>
        );
        case "DISPONIVEL":
        return (
          <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            Disponível
          </span>
        );
        case "ENTREGUE":
        return (
          <span className="block bg-green-50 text-green-700 border border-green-300 text-[10px] font-semibold p-2.5 rounded-full">
            <Check />
          </span>
        );
      default:
        return (
          <span className="bg-red-200 text-orange-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
            {estado}
          </span>
        );
    }
  };

  const isSelected=(id:number)=>{
    return id===selectedId;
  }
  return(
        <div className="space-y-3">
        {requests?.map((req) => (
          <div
              key={req.id}
              onClick={() => onSelectRequest(req.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected(req.id)
                  ? "border-[#0f2c33] bg-[#f8fafc] ring-1 ring-[#0f2c33]/20"
                  : "border-slate-100 hover:border-slate-200 bg-[#fafaf9]/50"
              }`}
            >
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900">
                  {req.nomeEstudante}
                </h4>
                <p className="text-[11px] text-slate-500 font-mono">
                  {req.codigo} · {req.numeroProcesso}
                </p>
                <p className="text-[11px] text-slate-600">
                  {"frequência"} · {req.criadoEm}
                </p>
              </div>

              <div>{renderBadge(req.estado)}</div>
            </div>
        ))}
      </div>
    );
}
export default ReceivedRequestsList;