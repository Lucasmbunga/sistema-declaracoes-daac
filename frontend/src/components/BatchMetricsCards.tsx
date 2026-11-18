import React from 'react';
import MetricCard from './MetricCard';

interface BatchMetricsCardsProps {
  aguardamCount: number;
  nesteLoteCount: number;
  disponiveisHojeCount: number;
  isLoading?: boolean;
}

export const BatchMetricsCards: React.FC<BatchMetricsCardsProps> = ({
  aguardamCount,
  nesteLoteCount,
  disponiveisHojeCount,
  isLoading = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricCard
        title="Aguardam impressão"
        value={isLoading ? '...' : aguardamCount}
      />
      <MetricCard
        title="Neste lote"
        value={nesteLoteCount}
      />
      <MetricCard
        title="Disponibilizados hoje"
        value={isLoading ? '...' : disponiveisHojeCount}
      />
    </div>
  );
};