export function calculoComissao(vrTotal:number, vrTaxas: number, vrAbatimentos: number, vrDescontos: number, porcentagem: number):number{
  let comissao = 0
    if (vrTotal === 0){
      return 0
    } else{
      comissao = ((vrTotal - vrTaxas - vrAbatimentos-vrDescontos)*porcentagem)/100
    }
return comissao
}