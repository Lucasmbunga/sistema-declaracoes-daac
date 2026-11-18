import api from '../api/api';
import type { ApiResponse, ApprovedRequest, DeclaracaoGeradaDto, EstadoPedido, PedidoAtualizacaoDto, PedidoDeclaracaoRespostaDto } from '../types/api';
import { decodeJwt } from '../utils/jwt';

export interface CreateRequestParams {
    idEstudante: number;
    efeitoDeclaracao: string;
    nomePai: string;
    nomeMae: string;
    dataNascimento: string;
    numeroBi: string;
    dataEmissaoBi: string;
    anoFrequencia: string;
    anoLetivo: string;
    ficheiroBi: File;
    ficheiroComprovativo: File;
}

export const requestService = {
    // Submeter novo pedido com FormData (POST /pedidos?idEstudante={id})[cite: 25]
    async createRequest(dados: CreateRequestParams): Promise<PedidoDeclaracaoRespostaDto> {
        // No requestService.ts (dentro de createRequest):
        const formData = new FormData();
        formData.append('idEstudante', String(dados.idEstudante));
        formData.append('efeitoDeclaracao', dados.efeitoDeclaracao);
        formData.append('nomePai', dados.nomePai);
        formData.append('nomeMae', dados.nomeMae);
        formData.append('dataNascimento', dados.dataNascimento);
        formData.append('numeroBi', dados.numeroBi);
        formData.append('dataEmissaoBi', dados.dataEmissaoBi);
        formData.append('anoFrequencia', dados.anoFrequencia);
        formData.append('anoLetivo', dados.anoLetivo);
        formData.append('ficheiroBi', dados.ficheiroBi);
        formData.append('ficheiroComprovativo', dados.ficheiroComprovativo);

        const response = await api.post<ApiResponse<PedidoDeclaracaoRespostaDto>>(
            `/pedidos`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data;
    },

    // Listar todos os pedidos (GET /pedidos)[cite: 25]
    async getAllRequests(): Promise<PedidoDeclaracaoRespostaDto[]> {
        const response = await api.get<ApiResponse<PedidoDeclaracaoRespostaDto[]>>('/pedidos');
        return response.data.data;
    },

    // Buscar pedido específico por ID (GET /pedidos/{id})
    async getRequestById(id: number): Promise<PedidoDeclaracaoRespostaDto> {
        const response = await api.get<ApiResponse<PedidoDeclaracaoRespostaDto>>(`/pedidos/${id}`);
        return response.data.data;
    },
    async getRequestsByStudentId(): Promise<PedidoDeclaracaoRespostaDto[]> {
        const token = localStorage.getItem("token");
        const decoded = decodeJwt(token as string);
        const userId = decoded?.id || -1;

        const response = await api.get<ApiResponse<PedidoDeclaracaoRespostaDto[]>>(`/pedidos/estudante/${userId}`);
        return response.data.data;
    },

    async getRequestsByStatus(estado: EstadoPedido) {
        const response = await api.get(`/pedidos/estado?${estado}`);
        return (await response).data.data;
    },
    async updateRequestStatus(id: number, pedidoAtualizacao: PedidoAtualizacaoDto) {
        const response = await api.patch(`/pedidos/${id}/estado`, pedidoAtualizacao);
        return (await response).data.data;
    },
    async getApprovedRequestsForBatch(): Promise<ApprovedRequest[]> {
        const response = await api.get('/pedidos/aprovados-para-impressao');
        return response.data.data;
    },

    // Novo método para gerar o lote de impressão
    async generateBatch(idsPedidos: number[], idAtendente: number): Promise<string> {
        const response = await api.post('/lotes-impressao/gerar', {
            idsPedidos,
            idAtendente,
        });
        return response.data.data; // Retorna o código do lote (ex: LOTE-17737...)
    },
    async gerarDeclaracao(idPedido: number): Promise<DeclaracaoGeradaDto> {
        const response = await api.post(`/pedidos/gerar/${idPedido}`);
        return response.data.data;
    },

    // 2. Atualizar estado (ex: marcar como ENTREGUE)
    async atualizarEstado(
        idPedido: number,
        novoEstado: EstadoPedido,
        idAtendente: number,
        comentario?: string
    ): Promise<PedidoDeclaracaoRespostaDto> {
        const response = await api.patch(`/pedidos/${idPedido}/estado`, {
            novoEstado,
            idAtendente,
            comentario,
        });
        return response.data.data;
    }
};