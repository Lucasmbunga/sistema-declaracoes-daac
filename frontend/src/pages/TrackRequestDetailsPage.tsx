import React, { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { RequestAttachmentsList } from '../components/RequestAttachmentsList';
import { DigitalReceiptCard } from '../components/DigitalReceiptCard';
import { StudentDetailsCard } from '../components/StudentDetailsCard';
import { RequestProgressTimeline } from '../components/RequestProgressTimeLine';
import { useRequests } from '../hooks/useRequests';

export const TrackRequestDetailsPage: React.FC = () => {
    const { useRequestsByStudentId } = useRequests();
  
    const { data: pedidos, isLoading, isError } = useRequestsByStudentId();
      const [selectedId, setSelectedId] = useState<number | string | null>(null);
      const pedidoAtual = pedidos?.find((p) => p.id === selectedId) || pedidos?.at(0);

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

      {/* Cabeçalho da página */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">HISTÓRICO DO REQUERIMENTO</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Acompanhar pedido</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Estado atual e registo de todas as etapas.
        </p>
      </div>

      {/* Grelha Principal com Duas Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna Esquerda: Linha Temporal e Anexos */}
        <div className="lg:col-span-8 space-y-8">
          <RequestProgressTimeline pedidos={pedidos} selectedId={selectedId} isLoading={isLoading} isError={isError} setSelectedId={setSelectedId}/>
          <RequestAttachmentsList anexos={pedidoAtual?.anexos}/>
        </div>

        {/* Coluna Direita: Recibo Digital e Dados do Estudante */}
        <div className="lg:col-span-4 space-y-8">
          <DigitalReceiptCard />
          <StudentDetailsCard />
          
          <div>
            <Link 
              to="/perfil/student"
              className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center space-x-2 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar aos pedidos</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};