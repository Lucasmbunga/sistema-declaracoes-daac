import api from '../api/api';
import type {
    ApiResponse,
    LoginRequestDto,
    TokenResponseDto,
    EstudanteCriacaoDto,
    EstudanteRespostaDto,
    UsuarioRespostaDto,
    ApprovedRequest,

} from '../types/api';

export const authService = {
    // Autenticação / Login (POST /auth/login)
    async login(credentials: LoginRequestDto): Promise<TokenResponseDto> {
        const response = await api.post<ApiResponse<TokenResponseDto>>('/auth/login', credentials);
        return response.data.data;
    },

    // Registo de Estudante (POST /estudantes)
    async registerStudent(payload: EstudanteCriacaoDto): Promise<EstudanteRespostaDto> {
        const response = await api.post<ApiResponse<EstudanteRespostaDto>>('/estudantes', {
            ...payload,
            papelUsuario: 'ESTUDANTE'
        });
        return response.data.data;
    },

    async getUserProfileInfo(id:number):Promise<UsuarioRespostaDto>{
        const response=api.get(`/usuarios/${id}`);
        return (await response).data.data;
    },
    async getApprovedRequestsForBatch(): Promise<ApprovedRequest[]> {
    const response = await api.get('/pedidos/aprovados-para-impressao');
    return response.data.data;
  },

  async generateBatch(idsPedidos: number[], idAtendente: number) {
    const response = await api.post('/lotes-impressao/gerar', { idsPedidos, idAtendente });
    return response.data.data;
  }

    
};