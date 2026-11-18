import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { decodeJwt } from '../utils/jwt';

interface ProtectedRouteProps {
  allowedRoles?: ('ESTUDANTE' | 'ATENDENTE' | 'ADMINISTRADOR')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se foram definidos papéis específicos para esta rota
  if (allowedRoles && allowedRoles.length > 0) {
    const decoded = decodeJwt(token);
    const papel = decoded?.papelUsuario || decoded?.role;

    if (!papel || !allowedRoles.includes(papel as any)) {
      // Redireciona para o sítio seguro adequado se o papel não tiver permissão
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};