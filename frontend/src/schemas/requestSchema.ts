import { z } from 'zod';

export const requestSchema = z.object({
  tipoDeclaracao: z.string().min(1, 'Selecione o tipo de declaração pretendida'),
  anoLectivo: z.string().min(1, 'O ano lectivo é obrigatório'),
  finalidadePedido: z.string().min(1, 'Selecione uma finalidade para o pedido'),
  motivoObservacao: z.string().optional(),

  // Novos campos civis e de frequência exigidos na Declaração Oficial
  nomePai: z.string().min(3, 'O nome completo do pai é obrigatório'),
  nomeMae: z.string().min(3, 'O nome completo da mãe é obrigatório'),
  dataNascimento: z.string().min(1, 'A data de nascimento é obrigatória'),
  numeroBi: z.string().min(6, 'Informe um número de Bilhete de Identidade válido'),
  dataEmissaoBi: z.string().min(1, 'A data de emissão do Bilhete de Identidade é obrigatória'),
  anoFrequencia: z.string().min(1, 'Selecione o ano de frequência'),

  ficheiroBi: z.any().refine((file) => file instanceof File || (file && file.length > 0), {
    message: 'A cópia do Bilhete de Identidade é obrigatória',
  }),
  ficheiroComprovativo: z.any().refine((file) => file instanceof File || (file && file.length > 0), {
    message: 'O comprovativo de pagamento é obrigatório',
  }),
});

export type RequestFormData = z.infer<typeof requestSchema>;