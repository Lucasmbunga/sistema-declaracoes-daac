import { z } from 'zod';

export const registerSchema = z.object({
  nomeCompleto: z
    .string()
    .min(1, 'O nome completo é obrigatório')
    .min(3, 'Introduza o nome completo válido'),
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .email('Introduza um endereço de email válido'),
  numeroBi: z
    .string()
    .min(1, 'O número do BI é obrigatório'),
  telefone: z
    .string()
    .optional(),
  numeroMecanog: z
    .string()
    .min(1, 'O número de estudante/matrícula é obrigatório'),
  idCurso: z
    .string()
    .min(1, 'Selecione um curso'),
  campo: z
    .string()
    .min(1, 'Selecione um campo'),
  turma: z
    .string()
    .min(1, 'Selecione uma turma'),
  palavraPasse: z
    .string()
    .min(8, 'A palavra-passe deve ter no mínimo 8 caracteres'),
  confirmarPalavraPasse: z
    .string()
    .min(1, 'Confirme a palavra-passe'),
}).refine((data) => data.palavraPasse === data.confirmarPalavraPasse, {
  message: 'As palavras-passe não coincidem',
  path: ['confirmarPalavraPasse'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;