import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { requestSchema, type RequestFormData } from '../schemas/requestSchema';
import { RequestTypeSelector } from './RequestTypeSelector';
import { AcademicDataFormSection } from './AcademicDataFormSection';
import { DocumentUploadSection } from './DocumentUploadSection';
import { RequestSidebarInfo } from './RequestSidebarInfo';
import { ShieldCheck, ArrowRight, Loader2, UserCheck } from 'lucide-react';
import { useRequests } from '../hooks/useRequests';
import { useStudentData } from '../hooks/useStudentData';

export const NewRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const { createRequest, isSubmittingRequest } = useRequests();
  const { data: studentData, isLoading: isLoadingProfile } = useStudentData();

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      tipoDeclaracao: '',
      anoLectivo: '2026',
      anoFrequencia: '3º Ano',
      finalidadePedido: '',
      motivoObservacao: '',
      nomePai: '',
      nomeMae: '',
      dataNascimento: '',
      numeroBi: '',
      dataEmissaoBi: '',
    },
  });

  const onSubmit = async (data: RequestFormData) => {
    try {
      setSubmitError(null);

      const idEstudanteLogado = studentData?.id;

      if (!idEstudanteLogado) {
        setSubmitError('Não foi possível identificar o ID do estudante logado. Tente reiniciar a sessão.');
        return;
      }

      const ficheiroBi = data.ficheiroBi[0];
      const ficheiroComprovativo = data.ficheiroComprovativo[0];

      await createRequest({
        idEstudante: Number(idEstudanteLogado),
        efeitoDeclaracao: data.finalidadePedido,
        nomePai: data.nomePai,
        nomeMae: data.nomeMae,
        dataNascimento: data.dataNascimento,
        numeroBi: data.numeroBi.toUpperCase(),
        dataEmissaoBi: data.dataEmissaoBi,
        anoFrequencia: data.anoFrequencia,
        anoLetivo: data.anoLectivo,
        ficheiroBi,
        ficheiroComprovativo,
      });

      navigate('/perfil/student/pedidos');
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message || 'Falha ao submeter o pedido. Verifique os documentos anexados.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna Principal do Formulário */}
        <div className="lg:col-span-8 space-y-8">
          <RequestTypeSelector register={register} watch={watch} />
          <AcademicDataFormSection register={register} errors={errors} />

          {/* NOVA SECÇÃO: Dados Civis e Identificação (conforme Bilhete de Identidade) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start space-x-3 border-b border-slate-100 pb-4">
              <div className="p-2 bg-slate-100 rounded-xl text-[#0f2c33]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Dados Civis e Frequência Académica
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Preencha exatamente conforme consta no seu Bilhete de Identidade para a emissão oficial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Nome do Pai */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Nome Completo do Pai <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('nomePai')}
                  placeholder="Ex: António Manuel Pascoal"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0f2c33]"
                />
                {errors.nomePai && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.nomePai.message}
                  </span>
                )}
              </div>

              {/* Nome da Mãe */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Nome Completo da Mãe <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('nomeMae')}
                  placeholder="Ex: Maria José Mbunga"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0f2c33]"
                />
                {errors.nomeMae && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.nomeMae.message}
                  </span>
                )}
              </div>

              {/* Data de Nascimento */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Data de Nascimento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('dataNascimento')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0f2c33]"
                />
                {errors.dataNascimento && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.dataNascimento.message}
                  </span>
                )}
              </div>

              {/* Número do B.I. */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Número do Bilhete de Identidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('numeroBi')}
                  placeholder="Ex: 001234567UE042"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 uppercase font-mono focus:outline-none focus:border-[#0f2c33]"
                />
                {errors.numeroBi && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.numeroBi.message}
                  </span>
                )}
              </div>

              {/* Data de Emissão do B.I. */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Data de Emissão do B.I. <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('dataEmissaoBi')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0f2c33]"
                />
                {errors.dataEmissaoBi && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.dataEmissaoBi.message}
                  </span>
                )}
              </div>

              {/* Ano de Frequência */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  Ano que Frequenta <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('anoFrequencia')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0f2c33]"
                >
                  <option value="1º Ano">1º Ano</option>
                  <option value="2º Ano">2º Ano</option>
                  <option value="3º Ano">3º Ano</option>
                  <option value="4º Ano">4º Ano</option>
                  <option value="5º Ano">5º Ano</option>
                </select>
                {errors.anoFrequencia && (
                  <span className="text-[11px] text-red-600 mt-1 block">
                    {errors.anoFrequencia.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <DocumentUploadSection register={register} errors={errors} />

          {/* Aviso final e botão */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>O recibo só é emitido após aprovação.</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmittingRequest || isLoadingProfile}
                className="w-full sm:w-auto bg-[#0f2c33] hover:bg-[#15363d] text-white font-semibold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmittingRequest ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>A submeter...</span>
                  </>
                ) : (
                  <>
                    <span>Submeter Requerimento</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Lateral de Informações */}
        <div className="lg:col-span-4 sticky top-24">
          <RequestSidebarInfo />
        </div>
      </div>
    </form>
  );
};