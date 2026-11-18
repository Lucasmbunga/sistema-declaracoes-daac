import React from 'react';
import { SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const AuditLogTable: React.FC = () => {
  const auditLogs = [
    {
      id: 1,
      autor: 'Ana Cândida Miguel',
      dataAutor: '12 de junho de 2025 · 11:16',
      acao: 'Pedido aprovado',
      codigo: 'DAAC-2025-00462',
      estadoAnterior: 'PENDENTE',
      novoEstado: 'AGUARDANDO_ASSINATURA',
      comentario: 'Documentação validada.',
    },
    {
      id: 2,
      autor: 'Ana Cândida Miguel',
      dataAutor: '12 de junho de 2025 · 15:42',
      acao: 'Documento disponibilizado',
      codigo: 'DAAC-2025-00459',
      estadoAnterior: 'AGUARDANDO_ASSINATURA',
      novoEstado: 'DISPONIVEL',
      comentario: 'Lote L-2025-0612-02.',
    },
    {
      id: 3,
      autor: 'Alberto Chissola',
      dataAutor: '10 de junho de 2025 · 10:08',
      acao: 'Pedido rejeitado',
      codigo: 'DAAC-2025-00433',
      estadoAnterior: 'PENDENTE',
      novoEstado: 'REJEITADO',
      comentario: 'Comprovativo ilegível; solicitado novo envio.',
    },
    {
      id: 4,
      autor: 'Ana Cândida Miguel',
      dataAutor: '18 de junho de 2025 · 09:42',
      acao: 'Pedido',
      codigo: 'DAAC-2025-00481',
      estadoAnterior: '-',
      novoEstado: 'PENDENTE',
      comentario: 'Submissão através do portal.',
    },
  ];

  const renderBadge = (estado: string) => {
    if (estado === '-') return <span className="text-slate-400 font-mono">-</span>;
    if (estado === 'PENDENTE') return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">PENDENTE</span>;
    if (estado === 'AGUARDANDO_ASSINATURA') return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">AGUARDANDO_ASSINATURA</span>;
    if (estado === 'DISPONIVEL') return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">DISPONÍVEL</span>;
    if (estado === 'REJEITADO') return <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">REJEITADO</span>;
    return <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">{estado}</span>;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      {/* Cabeçalho da Tabela */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Registo de auditorias</h3>
          <p className="text-xs text-slate-500">Cada alteração mostra autor, estado anterior e novo estado[cite: 3].</p>
        </div>

        <button className="bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center space-x-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 px-3">Autor / Dados</th>
              <th className="pb-3 px-3">Acção</th>
              <th className="pb-3 px-3">Estado anterior</th>
              <th className="pb-3 px-3">Novo estado</th>
              <th className="pb-3 px-3">Comentário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-all">
                <td className="py-4 px-3 space-y-0.5">
                  <span className="font-bold text-slate-900 block">{log.autor}</span>
                  <span className="text-[11px] text-slate-400 font-mono block">{log.dataAutor}</span>
                </td>
                <td className="py-4 px-3 space-y-0.5">
                  <span className="font-semibold text-slate-800 block">{log.acao}</span>
                  <span className="text-[11px] text-slate-500 font-mono block">{log.codigo}</span>
                </td>
                <td className="py-4 px-3">
                  {renderBadge(log.estadoAnterior)}
                </td>
                <td className="py-4 px-3">
                  {renderBadge(log.novoEstado)}
                </td>
                <td className="py-4 px-3 text-slate-600 max-w-xs">
                  {log.comentario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rodapé Informativo */}
      <div className="bg-[#fafaf9] border border-slate-200/80 rounded-2xl p-4 flex items-center space-x-3 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>A auditoria apresentada é de demonstração e ilustra o registo de autor, estado anterior/novo, comentário e data/hora[cite: 3].</span>
      </div>
    </div>
  );
};