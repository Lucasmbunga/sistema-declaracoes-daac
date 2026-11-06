import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { Mail, Shield, Eye, EyeOff, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null);
      console.log('Dados de login:', data);
      // Redirecionamento simulado para o painel do estudante
      navigate('/estudante/painel');
    } catch (err) {
      setAuthError('Ocorreu um erro ao iniciar sessão. Verifique as suas credenciais.');
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[#faf9f6]">
      {/* Navegação Superior */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à página inicial</span>
        </Link>
      </div>

      {/* Caixa do Formulário */}
      <div className="max-w-md w-full mx-auto space-y-8 my-auto py-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">ÁREA DO ESTUDANTE</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Bem-vindo de volta</h2>
          <p className="text-sm text-slate-600">
            Entre para acompanhar os seus requerimentos académicos.
          </p>
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Campo Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Email institucional ou pessoal
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="nome@exemplo.ao"
                {...register('email')}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-slate-200 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20 shadow-sm'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Campo Palavra-passe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-700">
                Palavra-passe
              </label>
              <Link 
                to="/recuperar-acesso" 
                className="text-xs font-medium text-[#0f2c33] hover:underline"
              >
                Esqueci-me da palavra-passe
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Shield className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Introduza a sua palavra-passe"
                {...register('password')}
                className={`w-full pl-10 pr-12 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-slate-200 focus:border-[#0f2c33] focus:ring-[#0f2c33]/20 shadow-sm'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Botão Submeter */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f2c33] hover:bg-[#15363d] text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'A entrar...' : 'Entrar na minha conta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-600">
          Ainda não tem conta?{' '}
          <Link to="/register" className="font-semibold text-[#0f2c33] hover:underline">
            Registe-se
          </Link>
        </div>
      </div>

      {/* Aviso de Demonstração */}
      <div className="text-center text-[11px] text-slate-400 border-t border-slate-200 pt-6">
        Esta interface é uma demonstração. Nenhuma credencial é enviada ou armazenada.
      </div>
    </div>
  );
};