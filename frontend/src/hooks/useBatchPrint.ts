import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const useBatchPrint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idsPedidos, idAtendente }: { idsPedidos: number[]; idAtendente: number }) => {
      const response = await api.post('/lotes-impressao/gerar', {
        idsPedidos,
        idAtendente,
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      queryClient.invalidateQueries({ queryKey: ['pedidos-aprovados-impressao'] }); // Garante a atualização da fila de impressão
      queryClient.invalidateQueries({ queryKey: ['lotes'] });
    },
  });
};
// Hook no useRequests.ts (ou useLotes.ts)
export const useBatchMetrics = () => {
  return useQuery({
    queryKey: ['lotes-metricas'],
    queryFn: async () => {
      const response = await api.get('/lotes-impressao/metricas');
      return response.data.data as {
        aguardamImpressao: number;
        disponibilizadosHoje: number;
      };
    },
  });
};