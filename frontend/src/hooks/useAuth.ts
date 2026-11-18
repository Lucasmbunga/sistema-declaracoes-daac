import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from '../services/authService';
import type{ LoginRequestDto, EstudanteCriacaoDto } from '../types/api';
import { decodeJwt } from '../utils/jwt';

export const useAuth = () => {
  const navigate = useNavigate();

  // Mutação para Login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequestDto) => authService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);

      // Decodifica o token para identificar o papel (ESTUDANTE, ATENDENTE, ADMINISTRADOR)
      const decoded = decodeJwt(data.token);
      const papel = decoded?.papelUsuario || decoded?.role;

      // Redirecionamento dinâmico baseado no papel
      if (papel === 'ESTUDANTE') {
        navigate('/perfil/student', { replace: true });
      } else if (papel === 'ATENDENTE' || papel === 'ADMINISTRADOR') {
        navigate('/tecnico/painel', { replace: true }); // Painel de atendimento/gestão do DAAC
      } else {
        navigate('/login', { replace: true });
      }
    },
  });

  // Mutação para Registo de Estudante
  const registerMutation = useMutation({
    mutationFn: (data: EstudanteCriacaoDto) => authService.registerStudent(data),
    onSuccess: () => {
      navigate('/login');
    },
  });

  const logout = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,   
    registerStudent: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout,
  };
};