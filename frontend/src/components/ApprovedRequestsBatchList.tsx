import React from 'react';
import { Search, FileText, ChevronDown } from 'lucide-react';
import type { PedidoDeclaracaoRespostaDto } from '../types/api';

interface ApprovedRequestsBatchListProps {
  requests: PedidoDeclaracaoRespostaDto[];
  selectedIds: number[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (id: number) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const ApprovedRequestsBatchList: React.FC<ApprovedRequestsBatchListProps> = ({
  requests,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectOne,
  searchTerm,
  onSearchChange,
}) => {
  const allSelected = requests.length > 0 && selectedIds.length === requests.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      {/* Cabeçalho da Lista e Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Pedidos aprovados</h3>
          <p className="text-xs text-slate-500">Agrupados pelo período de aprovação.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0f2c33]"
            />
          </div>

          <div className="relative">
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none appearance-none pr-8">
              <option>Junho de 2025</option>
              <option>Maio de 2025</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Opção de Selecionar Todos */}
      <div className="flex items-center justify-between py-1 text-xs text-slate-600">
        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleSelectAll}
            className="w-4 h-4 rounded border-slate-300 text-[#0f2c33] focus:ring-[#0f2c33]"
          />
          <span className="font-medium">Selecionar todos os documentos visíveis</span>
        </label>
        <span className="font-semibold text-slate-500">{selectedIds.length} selecionados</span>
      </div>

      {/* Lista de Itens */}
      <div className="space-y-3">
        {requests.map((req) => {
          const isChecked = selectedIds.includes(req.id);
          // Formata a data de criação/aprovação se vier no formato ISO
          const dataFormatada = req.criadoEm 
            ? new Date(req.criadoEm).toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' }) 
            : 'Data indisponível';

          return (
            <div
              key={req.id}
              onClick={() => onToggleSelectOne(req.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isChecked ? 'border-[#0f2c33] bg-[#f8fafc] ring-1 ring-[#0f2c33]/10' : 'border-slate-100 hover:border-slate-200 bg-[#fafaf9]/50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // Gerido pelo onClick da div pai
                  className="w-4 h-4 rounded border-slate-300 text-[#0f2c33] focus:ring-[#0f2c33]"
                />
                <div className="bg-[#e6f0f2] text-[#0f2c33] p-2.5 rounded-xl">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{req.nomeEstudante}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {req.codigo} · {req.numeroMecanogEstudante || req.numeroProcesso} · Aprovado em {dataFormatada}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-xs font-medium text-slate-700">{req.curso || 'Engenharia Informática'}</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {req.estado === 'AGUARDANDO_ASSINATURA' ? 'Aguardando assinatura' : req.estado}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};