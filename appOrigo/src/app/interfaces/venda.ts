export interface Venda {
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
  ID_CLIENTE: number,
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
  }

}
