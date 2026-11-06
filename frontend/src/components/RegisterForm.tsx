import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { PersonalIdentificationSection } from './PersonalIdentificationSection';
import { AcademicDataSection } from './AcademicDataSection';
import { CredentialsSection } from './CredentialsSection';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nomeCompleto: '',
      email: '',
      numeroBi: '',
      telefone: '',
      numeroMecanog: '',
      idCurso: '',
      campo: '',
      turma: '',
      palavraPasse: '',
      confirmarPalavraPasse: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Dados de registo submetidos:', data);
      // Aqui faria a chamada POST /estudantes ou /auth/register
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registar estudante:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Voltar */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Página inicial</span>
        </Link>
      </div>

      {/* Título */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">NOVO ESTUDANTE</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Criar conta de estudante</h1>
        <p className="text-sm text-slate-600">
          Preencha os dados académicos para iniciar seus requisitos[cite: 5].
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <PersonalIdentificationSection register={register} errors={errors} />
        <AcademicDataSection register={register} errors={errors} />
        <CredentialsSection register={register} errors={errors} />

        {/* Aviso de demonstração */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex items-center space-x-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Os dados desta interface são apenas de demonstração. O registo não é enviado para um servidor[cite: 5].</span>
        </div>

        {/* Barra inferior de submissão */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-200 gap-4">
          <p className="text-xs text-slate-500">
            Ao continuar, confirme que os dados são verdadeiros[cite: 5].
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#0f2c33] hover:bg-[#15363d] text-white font-semibold py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'A criar conta...' : 'Criar conta de demonstração'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};