import React, { useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { PedidoDeclaracaoRespostaDto } from "../types/api";
import ReceivedRequestsList from "./ReceivedRequestsList";

interface RequestQueueListProps {
  requests: PedidoDeclaracaoRespostaDto[] | undefined; // Já vem filtrado do pai
  selectedId: number;
  onSelectRequest: (id: number) => void;
  filteredStatus: string;
  setFilteredStatus: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const RequestQueueList: React.FC<RequestQueueListProps> = ({
  requests = [],
  selectedId,
  onSelectRequest,
  filteredStatus,
  setFilteredStatus,
  searchTerm,
  setSearchTerm,
}) => {

  // Deriva os pedidos filtrados de forma otimizada e reativa
  const filteredRequests = useMemo(() => {
    if (!requests) return [];

    return requests.filter((req) => {
      // 1. Filtro por Estado
      const matchStatus = !filteredStatus || req.estado === filteredStatus;

      // 2. Filtro por Pesquisa (Nome, Número Mecanográfico ou Código do Pedido)
      const termo = searchTerm.toLowerCase().trim();
      const matchSearch =
        !termo ||
        req.nomeEstudante?.toLowerCase().includes(termo) ||
        req.numeroMecanogEstudante?.toLowerCase().includes(termo) ||
        req.codigo?.toLowerCase().includes(termo);

      return matchStatus && matchSearch;
    });
  }, [requests, filteredStatus, searchTerm]);

  return (
    <div className="bg-white rounded-2xl ring-1 ring-slate-300/80 p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Pedidos recebidos
          </h3>
          <p className="text-xs text-slate-500">
            {filteredRequests.length} de {requests?.length || 0} registos nesta vista
          </p>
        </div>

        {/* Filtros e Pesquisa */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Pesquisar estudante ou código"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0f2c33]"
            />
          </div>
          <div className="relative">
            <select
              value={filteredStatus}
              onChange={(event) => setFilteredStatus(event.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none appearance-none pr-8 cursor-pointer"
            >
              <option value={""}>Todos os estados</option>
              <option value={"PENDENTE"}>Pendentes</option>
              <option value={"AGUARDANDO_ASSINATURA"}>Aprovados</option>
              <option value={"DISPONIVEL"}>Disponíveis</option>
              <option value={"REJEITADO"}>Rejeitados</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Lista de Pedidos Filtrados */}
      <ReceivedRequestsList
        onSelectRequest={onSelectRequest}
        requests={filteredRequests}
        selectedId={selectedId}
        searchTerm={searchTerm}
      />
    </div>
  );
};