import React from "react";
import { Link } from "react-router";
import { FileText, ArrowRight, Loader2, Check } from "lucide-react";
import { useRequests } from "../hooks/useRequests";

export const RecentRequestsList: React.FC = () => {
  const {useRequestsByStudentId  } = useRequests();
  const { data: pedidos, isLoading, isError } = useRequestsByStudentId();
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#0f2c33]" />
        <span>A carregar os seus requerimentos...</span>
      </div>
    );
  }

  if (isError || !pedidos) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center text-red-600 text-xs">
        Não foi possível carregar os seus pedidos. Tente atualizar a página.
      </div>
    );
  }

  const renderBadge = (estado: string) => {
    switch (estado) {
      case 'PENDENTE':
        return (
          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold px-3 py-1 rounded-full">
            Pendente
          </span>
        );
      case 'AGUARDANDO_ASSINATURA':
        return (
          <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold px-3 py-1 rounded-full">
            Aguardando assinatura
          </span>
        );
      case 'DISPONIVEL':
        return (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-3 py-1 rounded-full">
            Disponível
          </span>
        );
      case 'REJEITADO':
        return (
          <span className="bg-red-50 text-red-700 border border-red-200 text-[11px] font-semibold px-3 py-1 rounded-full">
            Rejeitado
          </span>
        );
      case 'ENTREGUE':
        return (
          <span className="bg-slate-100 text-green-700 border border-green-600 text-[11px] font-semibold p-3  rounded-full">
            <Check/>
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
            {estado}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Pedidos recentes
          </h3>
          <p className="text-xs text-slate-500">
            Consulte o estado dos seus requerimentos.
          </p>
        </div>
        <Link
          to="/perfil/student/pedidos"
          className="text-xs font-semibold text-[#0f2c33] hover:underline"
        >
          Ver todos os pedidos
        </Link>
      </div>

      <div className="space-y-3">
        {pedidos?.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">Ainda não tem nenhum requerimento submetido.</p>
        ) : (
          pedidos?.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#fafaf9]/50 transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="bg-[#e6f0f2] text-[#0f2c33] p-2.5 rounded-xl">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  {/* Dinâmico: exibe o tipo de declaração vindo do backend */}
                  <h4 className="font-bold text-xs text-slate-900">
                    {'Declaração Académica'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {req.codigo} ·{" "}
                    {req.criadoEm ? new Date(req.criadoEm).toLocaleDateString("pt-AO") : 'Data indisponível'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {renderBadge(req.estado)}
                <Link
                  to={`/perfil/student/pedidos/${req.id}`}
                  className="text-slate-400 hover:text-slate-900"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};