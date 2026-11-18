import React, { useState, useMemo, useEffect } from "react";
import { BatchMetricsCards } from "../components/BatchMetricsCards";
import { ApprovedRequestsBatchList } from "../components/ApprovedRequestsBatchList";
import { BatchGenerationPanel } from "../components/BatchGenerationPanel";
import { useRequests } from "../hooks/useRequests";
import { decodeJwt } from "../utils/jwt";
import { Loader2 } from "lucide-react";
import { useBatchMetrics, useBatchPrint } from "../hooks/useBatchPrint";
import SuccessModal from "./SuccessModal";
import { useModal } from "../hooks/useModal";

export const BatchPrintPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { useAllRequests, useApprovedRequests } = useRequests();
  const { data: allRequests, isLoading } = useAllRequests();
  const batchMutation = useBatchPrint();
  const { isOpen, open, close } = useModal(false);
  const [message,setMessage]=useState('')
  const [status, setStatus] = useState<"success" | "error">("error");

  const { data: pedidosAprovados = [], isLoading: isLoadingPedidos } =
    useApprovedRequests();
  const { data: metricas, isLoading: isLoadingMetricas } = useBatchMetrics();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 1. Filtrar apenas os pedidos que estão AGUARDANDO_ASSINATURA
  const approvedRequests = useMemo(() => {
    if (!allRequests) return [];
    return allRequests.filter((r) => r.estado === "AGUARDANDO_ASSINATURA");
  }, [allRequests]);

  // Sincroniza a seleção inicial assim que os dados são carregados
  React.useEffect(() => {
    if (approvedRequests.length > 0 && selectedIds.length === 0) {
      setSelectedIds(approvedRequests.map((r) => r.id));
    }
  }, [approvedRequests]);

  const handleToggleSelectAll = () => {
    if (selectedIds.length === approvedRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(approvedRequests.map((r) => r.id));
    }
  };

  const handleToggleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleGenerateBatch = () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um documento para gerar o lote.");
      return;
    }

    const token = localStorage.getItem("token");
    const jwtPayload = decodeJwt(token as string);
    const idAtendente = jwtPayload?.id || 1;

    batchMutation.mutate(
      {
        idsPedidos: selectedIds,
        idAtendente,
      },
      {
        onSuccess: (codigoLote) => {
          setMessage(
            `Lote ${codigoLote} gerado com sucesso! Todas as declarações foram emitidas e ${selectedIds.length} pedidos estão agora DISPONÍVEIS.`,
          );
          setSelectedIds([]);
        },
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ||
            "Ocorreu um erro ao gerar o lote de impressão.";
          setMessage(msg);
        },
      },
    );
  };

  // Filtragem por pesquisa local (Nome ou Código)
  const filteredRequests = useMemo(() => {
    return approvedRequests.filter(
      (r) =>
        r.nomeEstudante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.numeroMecanogEstudante
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );
  }, [approvedRequests, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#0f2c33]" />
      </div>
    );
  }

  useEffect(() => {
    if (batchMutation.isSuccess) {
      setStatus("success");
      setMessage("Lote gerado com sucesso!")
      open();
    }
    if (batchMutation.isError) {
      setMessage("Erro ao gerar o lote")
      setStatus("error");
    open();
    }

  }, [batchMutation.isSuccess, batchMutation.isError]);

  return (
    <div className="space-y-8">
      {/* Título da Subpágina */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Fila de impressão
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Agrupe os documentos aprovados e disponibilize-os em conjunto de forma
          rastreável.
        </p>
      </div>

      {/* Cartões de Métricas Dinâmicos */}
      <BatchMetricsCards
        aguardamCount={metricas?.aguardamImpressao ?? pedidosAprovados.length}
        nesteLoteCount={selectedIds.length}
        disponiveisHojeCount={metricas?.disponibilizadosHoje ?? 0}
        isLoading={isLoadingPedidos || isLoadingMetricas}
      />

      {/* Grelha Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <ApprovedRequestsBatchList
            requests={filteredRequests}
            selectedIds={selectedIds}
            onToggleSelectAll={handleToggleSelectAll}
            onToggleSelectOne={handleToggleSelectOne}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <div className="lg:col-span-4">
          <BatchGenerationPanel
            selectedCount={selectedIds.length}
            periodo="Mês Atual"
            onGenerateBatch={handleGenerateBatch}
            isPending={batchMutation.isPending}
          />
        </div>
      </div>
      <SuccessModal isOpen={isOpen} openModal={open} closeModal={close} status={status} message={message} />
    </div>
  );
};
