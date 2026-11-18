import React from 'react';
import { Activity, Users, BookOpen } from 'lucide-react';

interface AdministrationTabsProps {
  activeTab: 'audit' | 'users' | 'courses';
  onTabChange: (tab: 'audit' | 'users' | 'courses') => void;
}

export const AdministrationTabs: React.FC<AdministrationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center space-x-2 border-b border-slate-200 pb-0">
      <button
        onClick={() => onTabChange('audit')}
        className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
          activeTab === 'audit'
            ? 'border-[#0f2c33] text-[#0f2c33] bg-white rounded-t-xl border-x border-t'
            : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
      >
        <Activity className="w-4 h-4" />
        <span>Atividade e auditórios</span>
      </button>

      <button
        onClick={() => onTabChange('users')}
        className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
          activeTab === 'users'
            ? 'border-[#0f2c33] text-[#0f2c33] bg-white rounded-t-xl border-x border-t'
            : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
      >
        <Users className="w-4 h-4" />
        <span>Utilizadores</span>
      </button>

      <button
        onClick={() => onTabChange('courses')}
        className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
          activeTab === 'courses'
            ? 'border-[#0f2c33] text-[#0f2c33] bg-white rounded-t-xl border-x border-t'
            : 'border-transparent text-slate-500 hover:text-slate-800'
        }`}
      >
        <BookOpen className="w-4 h-4" />
        <span>Cursos</span>
      </button>
    </div>
  );
};