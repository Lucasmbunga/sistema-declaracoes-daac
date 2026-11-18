import React from 'react';
import { Upload, FileText, } from 'lucide-react';
import {  type FieldErrors,  type UseFormRegister } from 'react-hook-form';
import type { RequestFormData } from '../schemas/requestSchema';

interface DocumentUploadSectionProps {
  register: UseFormRegister<RequestFormData>;
  errors: FieldErrors<RequestFormData>;
}

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ register, errors }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h3 className="font-bold text-lg text-slate-900">Documentos obrigatórios</h3>
        <p className="text-xs text-slate-500">Os anexos serão apenas visualizados nesta demonstração.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cópia do Bilhete de Identidade */}
        <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">Cópia do Bilhete de Identidade</span>
            <FileText className="w-4 h-4 text-[#0f2c33]" />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-white flex flex-col items-center justify-center text-center space-y-2 hover:border-[#0f2c33] transition-colors relative has-valid:border-soli has-valid:border-green-700!">
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register('ficheiroBi')}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-[#e6f0f2] text-[#0f2c33] p-2.5 rounded-xl">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Anexar cópia do BI</p>
              <p className="text-[10px] text-slate-500">PDF, JPG ou PNG</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">Formato PDF ou imagem obrigatório.</p>
          {errors.ficheiroBi && <p className="text-xs text-red-600 font-medium">{errors.ficheiroBi.message as string}</p>}
        </div>

        {/* Comprovativo de Pagamento */}
        <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">Comprovativo de pagamento</span>
            <FileText className="w-4 h-4 text-[#0f2c33]" />
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-white flex flex-col items-center justify-center text-center space-y-2 hover:border-[#0f2c33] transition-colors relative has-valid:border-soli has-valid:border-green-700!">
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register('ficheiroComprovativo')}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="bg-[#e6f0f2] text-[#0f2c33] p-2.5 rounded-xl">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Anexar comprovativo</p>
              <p className="text-[10px] text-slate-500">PDF, JPG ou PNG</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500">Formato PDF ou imagem obrigatório.</p>
          {errors.ficheiroComprovativo && <p className="text-xs text-red-600 font-medium">{errors.ficheiroComprovativo.message as string}</p>}
        </div>
      </div>
    </div>
  );
};