export interface ApiResponse<T> {
  sucess: boolean;
  data: T;
  errors?: string[];
  errorCode?: number;
  message?: string;
  timestamp: number;
  path?: string;
}

export type PapelUsuario = 'ESTUDANTE' | 'ATENDENTE' | 'ADMINISTRADOR';

export type EstadoPedido =
  | 'PENDENTE'
  | 'AGUARDANDO_ASSINATURA'
  | 'DISPONIVEL'
  | 'REJEITADO'
  | 'ENTREGUE';

export type TipoDocumentoAnexo = 'COPIA_BI' | 'COMPROVATIVO_PAGAMENTO' | 'REQUERIMENTO';

export interface TokenResponseDto {
  token: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface UsuarioRespostaDto {
  id: number;
  nomeCompleto: string;
  email: string;
  papelUsuario: PapelUsuario;
  criadoEm: string;
}

export interface EstudanteCriacaoDto {
  nomeCompleto: string;
  email: string;
  palavraPasse: string;
  papelUsuario: PapelUsuario;
  idCurso: number;
  numeroMecanog?: string;
  numeroProcesso?: string;
  turma?: string;
  numeroBi: string;
  telefone?: string;
}

export interface EstudanteRespostaDto {
  id: number;
  idUsuario: number;
  nomeCompletoUsuario: string;
  emailUsuario: string;
  idCurso: number;
  nomeCurso: string;
  numeroMecanog: string;
  numeroProcesso: string;
  turma: string;
  numeroBi: string;
  telefone: string;
}

export interface CursoRespostaDto {
  id: number;
  nome: string;
  duracao: number;
}

export interface AnexoRespostaDto {
  id: number;
  tipoDocumento: TipoDocumentoAnexo;
  urlDocumento: string;
  nome: string;
  carregadoEm: string;
}

export interface PedidoDeclaracaoRespostaDto {
  id: number;
  codigo: string;
  idEstudante: number;
  nomeEstudante: string;
  numeroMecanogEstudante: string;
  numeroProcesso: string;
  curso: String;
  estado: EstadoPedido;
  motivoRejeicao?: string;
  criadoEm: string;
  atualizadoEm: string;
  anexos: AnexoRespostaDto[];
  efeitoDeclaracao: string;
  nomePai: string;
  nomeMae: string;
  dataNascimento: string;
  numeroBi: string;
  dataEmissaoBi: string;
  anoFrequencia: number;
  anoLetivo: number;
}

export interface PedidoAtualizacaoDto {
  novoEstado: EstadoPedido;
  idAtendente: number;
  comentario: string;
}

export interface ApprovedRequest {
  id: number;
  nomeEstudante: string;
  codigo: string;
  matricula: string;
  tipo: string;
  dataAprovacao: string;
  estado: string;
}
export interface ApprovedRequestsBatchListProps {
  requests: ApprovedRequest[];
  selectedIds: number[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (id: number) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}
export interface DeclaracaoGeradaDto {
  id: number;
  numeroDeclaracao: string;
  idEstudante: number;
  nomeEstudante: string;
  dataGeracao: string;
  urlArmazenamentoR2: string;
}
export interface FilaMetricas {
  aAnalisar: number;
  aguardandoAssinatura: number;
  disponiveisHoje: number;
  devolvidos: number;
}
