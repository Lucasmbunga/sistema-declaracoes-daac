import React, { useState } from 'react';
import { Search, UserPlus, SlidersHorizontal, Shield, Mail, CheckCircle2 } from 'lucide-react';

export const UsersManagementTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de dados de utilizadores do sistema
  const usersList = [
    {
      id: 1,
      nome: 'Ana Cândida Miguel',
      email: 'ana.miguel@unikivi.ao',
      papel: 'ADMINISTRADOR',
      curso: 'Engenharia Informática',
      estado: 'ATIVO',
      criadoEm: '10 de jan de 2024',
    },
    {
      id: 2,
      nome: 'Mateus João Manuel',
      email: 'mateus.manuel@estudante.unikivi.ao',
      papel: 'ESTUDANTE',
      curso: 'Engenharia Informática',
      estado: 'ATIVO',
      criadoEm: '12 de fev de 2025',
    },
    {
      id: 3,
      nome: 'Alberto Chissola',
      email: 'alberto.chissola@unikivi.ao',
      papel: 'ATENDENTE',
      curso: 'Engenharia Civil',
      estado: 'ATIVO',
      criadoEm: '15 de mar de 2024',
    },
    {
      id: 4,
      nome: 'Maria Isabel Domingos',
      email: 'maria.domingos@estudante.unikivi.ao',
      papel: 'ESTUDANTE',
      curso: 'Engenharia Electrotécnica',
      estado: 'ATIVO',
      criadoEm: '20 de abr de 2025',
    },
  ];

  const renderRoleBadge = (papel: string) => {
    switch (papel) {
      case 'ADMINISTRADOR':
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">Administrador</span>;
      case 'ATENDENTE':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">Atendente</span>;
      case 'ESTUDANTE':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">Estudante</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">{papel}</span>;
    }
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      {/* Cabeçalho da Tabela e Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Gestão de Utilizadores</h3>
          <p className="text-xs text-slate-500">Controlo de acessos, perfis e registo de contas no portal.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou e-mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0f2c33]"
            />
          </div>

          <button className="bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filtros</span>
          </button>

          <button
            onClick={() => alert('Abrir modal de registo de novo utilizador')}
            className="bg-[#0f2c33] hover:bg-[#15363d] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center space-x-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Utilizador</span>
          </button>
        </div>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 px-3">Nome / E-mail</th>
              <th className="pb-3 px-3">Papel / Perfil</th>
              <th className="pb-3 px-3">Curso / Afetação</th>
              <th className="pb-3 px-3">Estado</th>
              <th className="pb-3 px-3">Registado em</th>
              <th className="pb-3 px-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                <td className="py-4 px-3 space-y-0.5">
                  <span className="font-bold text-slate-900 block">{user.nome}</span>
                  <span className="text-[11px] text-slate-500 flex items-center space-x-1 font-mono">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>{user.email}</span>
                  </span>
                </td>
                <td className="py-4 px-3">
                  {renderRoleBadge(user.papel)}
                </td>
                <td className="py-4 px-3 font-medium text-slate-700">
                  {user.curso}
                </td>
                <td className="py-4 px-3">
                  <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 border border-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{user.estado}</span>
                  </span>
                </td>
                <td className="py-4 px-3 font-mono text-slate-400">
                  {user.criadoEm}
                </td>
                <td className="py-4 px-3 text-right">
                  <button
                    onClick={() => alert(`Editar utilizador: ${user.nome}`)}
                    className="text-[#0f2c33] font-semibold hover:underline text-xs"
                  >
                    Gerir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rodapé Informativo */}
      <div className="bg-[#fafaf9] border border-slate-200/80 rounded-2xl p-4 flex items-center space-x-3 text-xs text-slate-500">
        <Shield className="w-4 h-4 text-[#0f2c33] shrink-0" />
        <span>Os utilizadores com papel de estudante são associados automaticamente à tabela de perfis académicos.</span>
      </div>
    </div>
  );
};