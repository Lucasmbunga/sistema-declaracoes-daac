import React from "react";
import MetricCard from "./MetricCard";

interface QueueMetricsCardsProps {
  analisarCount: number;
  assinaturaCount: number;
  disponiveisCount: number;
  devolvidosCount: number;
  isLoading?: boolean;
}

export const QueueMetricsCards: React.FC<QueueMetricsCardsProps> = ({
  analisarCount,
  assinaturaCount,
  disponiveisCount,
  devolvidosCount,
  isLoading = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="A analisar" value={isLoading ? "..." : analisarCount} />
      <MetricCard title="Aguardando assinatura" value={isLoading ? "..." : assinaturaCount} />
      <MetricCard title="Disponíveis hoje" value={isLoading ? "..." : disponiveisCount} />
      <MetricCard title="Devolvidos" value={isLoading ? "..." : devolvidosCount} />
    </div>
  );
};