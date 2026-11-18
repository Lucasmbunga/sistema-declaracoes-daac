import React from 'react';
import { Shield, ChevronDown, Loader2 } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

export const TechnicianHeader: React.FC = () => {
  const {data:userData,isLoading}=useUserProfile();
  const getInitials = (name?: string) => {
    if (!name) return 'DA';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
        <Shield className="w-4 h-4" />
        <span>Sessão de técnico ativa</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="bg-[#0f2c33] text-white font-bold text-xs w-9 h-9 rounded-xl flex items-center justify-center">
            {getInitials(userData?.nomeCompleto)}
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-bold text-xs text-slate-900 block leading-tight">
              {isLoading?  <Loader2 className="w-6 h-6 mx-auto animate-spin text-[#0f2c33]" />
: userData?.nomeCompleto}
            </span>
            <span className="text-[10px] text-slate-500 block">Técnico de atendimento</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};