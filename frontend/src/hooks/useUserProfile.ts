import { useQuery } from '@tanstack/react-query';
import { decodeJwt } from '../utils/jwt';
import { authService } from '../services/authService';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['estudante-perfil'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Utilizador não autenticado');

      const decoded = decodeJwt(token);
      const usuarioId = decoded?.id ? Number(decoded.id) : null;

      if (!usuarioId || isNaN(usuarioId)) {
        console.log(usuarioId)
        throw new Error('ID de utilizador inválido no token');
      }
      // Chama diretamente o serviço optimizado por ID de utilizador
      return await authService.getUserProfileInfo(usuarioId);
    },
    staleTime: 1000 * 60 * 15, // Cache de 15 minutos
  });
};