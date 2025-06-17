export interface ConsultaVenda {
  id: number,
  created_at: number,
  ID_TIPO_SERVICO: number,
  DESTINO: string,
  N_PASSAGEIROS: number,
  NM_PASSAGEIRO: string,
  DT_SAIDA: string,
  DT_RETORNO: string,
  NM_OPERADORA: number,
  DESC_ROTEIRO: string,
  VR_TOTAL: number,
  NM_FORMA_PGTO: string,
  PARCELAMENTO: string,
  COMISSAO: number,
  STATUS: boolean,
  NM_CLIENTE: string,
  DT_VENDA: Date,
  ID_CLIENTE: number,
  VR_TAXAS: number,
  VR_SALDO: number,
  VR_PARCELADO: number,
  VR_TARIFA: number,
  VR_ENTRADA: number,
  NR_RESERVA: string,
  ID_OPERADORA: number,
  ID_FORMAPGTO: number,
  PORCENTAGEM_COMISSAO: number,
  VR_DESCONTO: number,
  VR_ABATIMENTO: number
  _tb_operadora: {
    id: number,
    created_at: Date,
    NM_OPERADORA: string,
    URL_LOGO: string
  },
  _tb_clientes: {
    id: number,
    created_at: Date,
    NM_COMPLETO: string,
    DT_NASCIMENTO: Date,
    CPF: string,
    RG: string,
    ENDERECO: string,
    EMAIL: string,
    FONE: string,
    NACIONALIDADE: string
  },
  _tb_formapgto: {
    id: number,
    created_at: number,
    NM_FORMA: string
  }

}
