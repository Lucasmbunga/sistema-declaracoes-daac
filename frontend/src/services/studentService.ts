import api  from '../api/api';
import type { ApiResponse, CursoRespostaDto, EstudanteRespostaDto } from '../types/api';

export const studentService = {
  // Listar Cursos Disponíveis para o formulário de cadastro (GET /cursos)[cite: 25]
  async getCourses(): Promise<CursoRespostaDto[]> {
    const response = await api.get<ApiResponse<CursoRespostaDto[]>>('/cursos');
    return response.data.data;
  },

  // Obter Perfil do Estudante por ID (GET /estudantes/{id})[cite: 25]
  async getStudentById(id: number): Promise<EstudanteRespostaDto> {
    const response = await api.get<ApiResponse<EstudanteRespostaDto>>(`/estudantes/${id}`);
    return response.data.data;
  },
  async getStudentByUserId(usuarioId: number): Promise<EstudanteRespostaDto> {
    const response = await api.get<ApiResponse<EstudanteRespostaDto>>(`/estudantes/usuario/${usuarioId}`);
    return response.data.data;
  }
};