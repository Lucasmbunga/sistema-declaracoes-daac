import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { NewRequestForm } from './NewRequestForm';

export const NewRequest: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Voltar ao painel */}
      <div>
        <Link 
          to="/perfil/student" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao painel</span>
        </Link>
      </div>

      {/* Título da Página */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">REQUERIMENTO ACADÉMICO</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Pedir uma</h1>
        <p className="text-sm text-slate-600">
          Preencha os dados e anexe os documentos obrigatórios para análise.
        </p>
      </div>

      {/* Formulário Principal */}
      <NewRequestForm />
    </div>
  );
};