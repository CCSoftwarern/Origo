export interface Venda {
  ID_TIPO_SERVICO: number;
  DESTINO: string;
  N_PASSAGEIROS: number;
  NM_PASSAGEIRO: string;
  DT_SAIDA: string;
  DT_RETORNO: string;
  NM_OPERADORA: number;
  DESC_ROTEIRO: string;
  VR_TOTAL: number;
  NM_FORMA_PGTO: string;
  PARCELAMENTO: string;
  COMISSAO: number;
  STATUS: boolean;
  NM_CLIENTE: string;
  DT_VENDA: string;
  ID_CLIENTE: number;
  ID_OPERADORA: number;
  ID_FORMAPGTO: number;
  VR_TAXAS: number;
  VR_SALDO: number;
  VR_PARCELADO: number;
  VR_TARIFA: number;
  VR_ENTRADA: number;
  NR_RESERVA: string;
}
