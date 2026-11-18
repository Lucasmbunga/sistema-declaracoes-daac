import api from "../api/api";
import type { AnexoRespostaDto, ApiResponse } from "../types/api";

const attachmentsService={
async getAttachmentsByRequest(idPedido:number):Promise<AnexoRespostaDto[]>{

    const response=await api.get<ApiResponse<AnexoRespostaDto[]>>(`/anexos/pedido/${idPedido}`)
    return response.data.data
}
}

export default attachmentsService;