import React, { useState, useMemo, useEffect } from "react";
import { QueueMetricsCards } from "../components/QueueMetricsCards";
import { RequestQueueList } from "../components/RequestQueueList";
import { RequestInspectionPanel } from "../components/RequestInspectionPanel";
import { useRequests } from "../hooks/useRequests";

export const TechnicianDashboardPage: React.FC = () => {
  const { useAllRequests, useQueueMetrics } = useRequests();
  const { data: requests } = useAllRequests();

  const [filteredStatus, setFilteredStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<number>(0);
  const { data: metricas, isLoading: isLoadingMetricas } = useQueueMetrics();

  // 1. Deriva os pedidos filtrados no componente pai
  const filteredRequests = useMemo(() => {
    if (!requests) return [];

    return requests.filter((req) => {
      const matchStatus = !filteredStatus || req.estado === filteredStatus;

      const termo = searchTerm.toLowerCase().trim();
      const matchSearch =
        !termo ||
        req.nomeEstudante?.toLowerCase().includes(termo) ||
        req.numeroMecanogEstudante?.toLowerCase().includes(termo) ||
        req.codigo?.toLowerCase().includes(termo);

      return matchStatus && matchSearch;
    });
  }, [requests, filteredStatus, searchTerm]);

  // 2. Sincroniza o ID selecionado automaticamente quando os filtros ou dados mudam
  useEffect(() => {
    if (filteredRequests.length > 0) {
      const exists = filteredRequests.some((r) => r.id === selectedRequestId);
      if (!exists) {
        setSelectedRequestId(filteredRequests[0].id);
      }
    } else {
      setSelectedRequestId(0);
    }
  }, [filteredRequests, selectedRequestId]);

  // 3. Encontra o pedido atual com base na seleção
  const currentRequest = requests?.find((r) => r.id === selectedRequestId);

  return (
    <div className="space-y-8">
      {/* Título da Secção */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Fila de requerimentos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Valide os dados e anexos antes de aprovar ou rejeitar.
        </p>
      </div>

      {/* Cartões de Métricas Superiores */}
      <QueueMetricsCards
        analisarCount={metricas?.aAnalisar ?? 0}
        assinaturaCount={metricas?.aguardandoAssinatura ?? 0}
        disponiveisCount={metricas?.disponiveisHoje ?? 0}
        devolvidosCount={metricas?.devolvidos ?? 0}
        isLoading={isLoadingMetricas}
      />

      {/* Grelha Principal: Lista de Fila + Painel de Inspeção */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <RequestQueueList
            requests={filteredRequests}
            selectedId={selectedRequestId}
            onSelectRequest={setSelectedRequestId}
            filteredStatus={filteredStatus}
            setFilteredStatus={setFilteredStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="lg:col-span-5">
          <RequestInspectionPanel pedido={currentRequest} />
        </div>
      </div>
    </div>
  );
};
