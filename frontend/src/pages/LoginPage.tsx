import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { LoginInfoPanel } from '../components/loginInfoPanel';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans selection:bg-[#0f2c33] selection:text-white">
      <LoginInfoPanel />
      <LoginForm />
    </div>
  );
};