import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestService, type CreateRequestParams } from '../services/requestService';
import type { EstadoPedido, FilaMetricas, PedidoAtualizacaoDto } from '../types/api';
import api from '../api/api';

export const useRequests = () => {
  const queryClient = useQueryClient();

  // Query para obter todos os pedidos
  const useAllRequests = () =>
    useQuery({
      queryKey: ['pedidos'],
      queryFn: () => requestService.getAllRequests(),
      refetchInterval: 10000,
      retry: 2, // Polling a cada 10 segundos para atualização em tempo real
    });

  // Query para obter um pedido por ID
  const useRequestDetails = (id: number) =>
    useQuery({
      queryKey: ['pedidos', id],
      queryFn: () => requestService.getRequestById(id),
      enabled: !!id,
    });

  // Mutação para submeter novo pedido
  const createRequestMutation = useMutation({
    mutationFn: (params: CreateRequestParams) => requestService.createRequest(params),
    onSuccess: () => {
      // Invalida a cache de pedidos para recarregar a lista atualizada
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
    },
  });

  const updateRequestStatus = (id: number) => {

    return useMutation({
      mutationFn: (pedidoAtualizado: PedidoAtualizacaoDto) => requestService.updateRequestStatus(id, pedidoAtualizado),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pedidos'] })

    })
  }
  const useApprovedRequestsForBatch = () => {
    return useQuery({
      queryKey: ['pedidos-aprovados-impressao'],
      queryFn: () => requestService.getApprovedRequestsForBatch(),
    });
  };
  // No ficheiro src/hooks/useRequests.ts
  const useApprovedRequests = () => {
    return useQuery({
      queryKey: ['pedidos-aprovados-impressao'],
      queryFn: async () => {
        const response = await api.get('/pedidos/aprovados-para-impressao');
        return response.data.data;
      },
    });
  };

  const useRequestsByStudentId = () => {
    return useQuery({
      queryKey: ['requests-student'],
      queryFn: () => requestService.getRequestsByStudentId()
    })

  }
  const useGerarDeclaracao = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (idPedido: number) => requestService.gerarDeclaracao(idPedido),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pedidos'] });
        queryClient.invalidateQueries({ queryKey: ['pedido'] });
      },
    });
  };

  const useAtualizarEstadoPedido = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        idPedido,
        novoEstado,
        idAtendente,
        comentario,
      }: {
        idPedido: number;
        novoEstado: EstadoPedido;
        idAtendente: number;
        comentario?: string;
      }) => requestService.atualizarEstado(idPedido, novoEstado, idAtendente, comentario),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['pedidos'] });
        queryClient.invalidateQueries({ queryKey: ['pedido'] });
      },
    });
  };

  const useQueueMetrics = () => {
    return useQuery({
      queryKey: ["pedidos-metricas"],
      queryFn: async () => {
        const response = await api.get("/pedidos/metricas");
        return response.data.data as FilaMetricas;
      },
    });
  };
  return {
    useAllRequests,
    useQueueMetrics,
    useApprovedRequests,
    useAtualizarEstadoPedido,
    useGerarDeclaracao,
    useRequestDetails,
    useRequestsByStudentId,
    createRequest: createRequestMutation.mutateAsync,
    isSubmittingRequest: createRequestMutation.isPending,
    submitError: createRequestMutation.error,
    updateRequestStatus, useApprovedRequestsForBatch
  };
};