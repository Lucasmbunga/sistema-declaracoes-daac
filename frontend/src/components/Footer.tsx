import React from 'react';
import { Link } from 'react-router';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <p>Universidade Kimpa Vita · Faculdade de Engenharia</p>
        <p className="font-medium text-slate-700">DAAC · Direcção dos Assuntos Académicos</p>
        <Link to="/login" className="hover:text-slate-900 transition-colors font-medium">
          Acesso ao portal →
        </Link>
      </div>
    </footer>
  );
};