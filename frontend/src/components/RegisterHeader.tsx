import React from 'react';
import { Link } from 'react-router';
import { GraduationCap } from 'lucide-react';

export const RegisterHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#0f2c33] p-2 rounded-xl text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block text-slate-900 leading-tight">DAAC / UNIKIVI</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">FACULDADE DE ENGENHARIA</span>
          </div>
        </div>

        <div>
          <Link 
            to="/login" 
            className="text-sm font-semibold text-[#0f2c33] hover:underline"
          >
            Já tenho conta
          </Link>
        </div>
      </div>
    </header>
  );
};