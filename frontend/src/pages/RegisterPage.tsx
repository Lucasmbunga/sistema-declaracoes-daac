import React from 'react';
import { RegisterHeader } from '../components/RegisterHeader';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-[#0f2c33] selection:text-white">
      <RegisterHeader />
      <main className="grow">
        <RegisterForm />
      </main>
    </div>
  );
};