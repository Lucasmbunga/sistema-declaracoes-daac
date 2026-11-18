import { useQuery } from '@tanstack/react-query';
import { studentService } from '../services/studentService';
import { decodeJwt } from '../utils/jwt';

export const useStudentProfile = () => {
  return useQuery({
    queryKey: ['tecnico-perfil'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilizador não autenticado');

      const decoded = decodeJwt(token);
      const usuarioId = decoded?.id ? Number(decoded.id) : null;

      if (!usuarioId || isNaN(usuarioId)) {
        throw new Error('ID de utilizador inválido no token');
      }

      // Chama diretamente o serviço optimizado por ID de utilizador
      return await studentService.getStudentByUserId(usuarioId);
    },
    staleTime: 1000 * 60 * 15, // Cache de 15 minutos
  });
};