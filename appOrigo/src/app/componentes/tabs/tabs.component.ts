import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { XanoService } from '../../services/xano.service';
import { Cliente } from '../../interfaces/cliente';
import { TableModule } from 'primeng/table';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { ToastModule } from 'primeng/toast';
import { firstValueFrom } from 'rxjs';
import { FluidModule } from 'primeng/fluid';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { TipoProduto } from '../../interfaces/tipo-produto';
import { SelectModule } from 'primeng/select';
import { Operadora } from '../../interfaces/operadora';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormaPagamento } from '../../interfaces/forma-pagamento';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConsultaVenda } from '../../interfaces/consulta-venda';
import { Venda } from '../../interfaces/venda';
import { calculoComissao } from '../../funcoes/funcoes';
import { InputMaskModule } from 'primeng/inputmask';



@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, TabsModule, CommonModule, TableModule,
        ButtonGroupModule, ToastModule, FluidModule, DatePickerModule, FormsModule, DatePipe, CurrencyPipe, FloatLabelModule
        , DrawerModule, SelectModule, AutoCompleteModule, ReactiveFormsModule, InputGroupAddonModule, InputGroupModule, InputNumberModule,
    InputMaskModule],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss',
    providers: [MessageService]

})

export class TabsComponent implements OnInit {
    items: MenuItem[] | undefined;
    clientes: Cliente[] = [];
    vendasEmbarque: ConsultaVenda[] = [];
    vendasDtVenda: ConsultaVenda[] = [];
    tipoProdutos: TipoProduto[] = [];
    operadoras: Operadora[] = [];
    formaPagamento: FormaPagamento[] = [];
    errorMessage: string = '';
    loadingClientes: boolean = false;
    loadingVendas: boolean = false;
    date1: Date | undefined;
    date2: Date | undefined;
    visible: boolean = false;
    value: any;
    clienteSelecionado!: Cliente;
    formaPgtoSelecionado!: FormaPagamento;
    vendaForm: FormGroup;
    clienteForm: FormGroup;
    venda: Venda[] = [];
    vendaSelecionada!: Venda;
    edtVenda!: ConsultaVenda;
    nmSide: string = 'Nova venda';
    emEdicao: boolean = false;
    visibleCadCliente: boolean = false;
    idVenda: number = 0;

    showDialog() {

        this.vendaForm.reset();
        this.nmSide = 'Nova venda'
        this.visible = true;
        this.emEdicao = false;

    }

    showCadClienteDialog() {
        this.visibleCadCliente = true;
    }

    ngOnInit() {
        this.getTiposDeProdutos();
        this.getOperadoras();
        this.getFormaPgto();
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }

    constructor(private xanoapi: XanoService, private messageService: MessageService) {
        this.vendaForm = new FormGroup({

            ID_TIPO_SERVICO: new FormControl('', Validators.required),
            DESTINO: new FormControl('', Validators.required),
            N_PASSAGEIROS: new FormControl(''),
            NM_PASSAGEIRO: new FormControl(''),
            DT_SAIDA: new FormControl('', Validators.required),
            DT_RETORNO: new FormControl('', Validators.required),
            NM_OPERADORA: new FormControl(''),
            DESC_ROTEIRO: new FormControl(''),
            VR_TOTAL: new FormControl('', Validators.required),
            NM_FORMA_PGTO: new FormControl(''),
            PARCELAMENTO: new FormControl(''),
            COMISSAO: new FormControl(''),
            STATUS: new FormControl(''),
            NM_CLIENTE: new FormControl(''),
            DT_VENDA: new FormControl('', Validators.required),
            ID_CLIENTE: new FormControl('', Validators.required),
            ID_OPERADORA: new FormControl('', Validators.required),
            ID_FORMAPGTO: new FormControl('', Validators.required),
            VR_TAXAS: new FormControl(''),
            VR_SALDO: new FormControl(''),
            VR_PARCELADO: new FormControl(''),
            VR_TARIFA: new FormControl(''),
            VR_ENTRADA: new FormControl(''),
            NR_RESERVA: new FormControl('', Validators.required),
            PORCENTAGEM_COMISSAO: new FormControl('', Validators.required),
            VR_DESCONTO: new FormControl('', Validators.required),
            VR_ABATIMENTO: new FormControl('', Validators.required),
        })
        this.clienteForm = new FormGroup({

            id: new FormControl(''),
            created_at: new FormControl(''),
            NM_COMPLETO: new FormControl('', Validators.required),
            DT_NASCIMENTO: new FormControl(''),
            CPF: new FormControl('', Validators.required),
            RG: new FormControl(''),
            ENDERECO: new FormControl(''),
            EMAIL: new FormControl('', Validators.email),
            FONE: new FormControl(''),
            NACIONALIDADE: new FormControl('')

        })
    }



    onRowSelect(event: any) {
        this.visible = true;
        alert(event.data.id)
        // this.idEntrega = event.data.id;
    }

    fillForm(data: any) {
        this.vendaForm.patchValue(data);
    }

    // If you have a edtVenda interface, import it at the top. Otherwise, use 'any' or define the interface.
    editVenda(edtVenda: any) {
        this.emEdicao = true;
        this.edtVenda = { ...edtVenda };
        this.nmSide = `Edição venda ${this.edtVenda.id}`
        this.idVenda = this.edtVenda.id;
        this.vendaForm.patchValue({
            ID_TIPO_SERVICO: this.edtVenda.ID_TIPO_SERVICO,
            DESTINO: this.edtVenda.DESTINO,
            N_PASSAGEIROS: this.edtVenda.N_PASSAGEIROS,
            NM_PASSAGEIRO: this.edtVenda.NM_PASSAGEIRO,
            DT_SAIDA: new Date(this.edtVenda.DT_SAIDA),
            DT_RETORNO: new Date(this.edtVenda.DT_RETORNO),
            NM_OPERADORA: this.edtVenda.NM_OPERADORA,
            DESC_ROTEIRO: this.edtVenda.DESC_ROTEIRO,
            VR_TOTAL: this.edtVenda.VR_TOTAL,
            NM_FORMA_PGTO: this.edtVenda.NM_FORMA_PGTO,
            PARCELAMENTO: this.edtVenda.PARCELAMENTO,
            COMISSAO: this.edtVenda.COMISSAO,
            STATUS: this.edtVenda.STATUS,
            NM_CLIENTE: this.edtVenda._tb_clientes.NM_COMPLETO,
            DT_VENDA: new Date(this.edtVenda.DT_VENDA),
            ID_CLIENTE: this.edtVenda.ID_CLIENTE,
            ID_OPERADORA: this.edtVenda.ID_OPERADORA,
            ID_FORMAPGTO: this.edtVenda.ID_FORMAPGTO,
            VR_TAXAS: this.edtVenda.VR_TAXAS,
            VR_SALDO: this.edtVenda.VR_SALDO,
            VR_PARCELADO: this.edtVenda.VR_PARCELADO,
            VR_TARIFA: this.edtVenda.VR_TARIFA,
            VR_ENTRADA: this.edtVenda.VR_ENTRADA,
            NR_RESERVA: this.edtVenda.NR_RESERVA,
            PORCENTAGEM_COMISSAO: this.edtVenda.PORCENTAGEM_COMISSAO,
            VR_DESCONTO: this.edtVenda.VR_DESCONTO,
            VR_ABATIMENTO: this.edtVenda.VR_ABATIMENTO,
            // Adicione outros campos que queira preencher
        });
        this.visible = true;
        console.log(this.edtVenda)
    }


    onGetClientes() {
        this.loadingClientes = true;
        this.xanoapi.getClientes().subscribe({
            next: (res) => {
                console.log('Clientes:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.clientes = res;
                this.loadingClientes = false;
            },
            error: (err) => {
                console.error('Erro ao buscar clientes:', err);
                this.errorMessage = 'Erro ao consultar clientes';
                this.loadingClientes = false;
            }
        });
    }

    async onDeleteCliente(id: number) {
        try {
            this.loadingClientes = true;
            await firstValueFrom(this.xanoapi.deleteCliente(id));
            this.showToast(`Cliente com ID ${id} deletado com sucesso.`, "success", "Sucesso");
            console.log(`Cliente com ID ${id} deletado com sucesso.`);
            await sleep(1000);
            this.onGetClientes();
        } catch (err) {
            console.error('Erro ao deletar cliente:', err);
            this.errorMessage = 'Erro ao deletar cliente';
            this.showToast("Erro ao deletar cliente", "error", "Erro");
        } finally {
            this.loadingClientes = false;
        }
    }
    //Toasts

    showToast(detalhe: string, severidade: string, summary: string) {
        this.messageService.add({ severity: severidade, summary, detail: detalhe });
    }

    /////////////Operações com vendas/////////////////////////

    // Deletar venda
    async onDeleteVenda(id: number) {
        try {
            this.loadingVendas = true;
            await firstValueFrom(this.xanoapi.deleteVenda(id));
            this.showToast(`Venda com ID ${id} deletado com sucesso.`, "success", "Sucesso");
            console.log(`Venda com ID ${id} deletado com sucesso.`);

            await sleep(1000);
            this.onGetVendasPorDataVenda();
        } catch (err) {
            console.error('Erro ao deletar venda:', err);
            this.errorMessage = 'Erro ao deletar venda';
            this.showToast("Erro ao deletar ", "error", "Erro");
        } finally {
            this.loadingVendas = false;
        }
    }

    //Vendas por data

    onGetVendasPorDataEmbarque() {
        this.loadingVendas = true;
        const dtInicio = this.date1 ? this.date1.toISOString() : '';
        const dtFim = this.date2 ? this.date2.toISOString() : '';
        this.xanoapi.getVendaPorDataEmbarque(dtInicio, dtFim).subscribe({
            next: (res) => {
                console.log('Vendas:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.vendasEmbarque = res;
                this.loadingVendas = false;
            },
            error: (err) => {
                console.error('Erro ao buscar vendas:', err);
                this.errorMessage = 'Erro ao consultar vendas';
                this.loadingVendas = false;
            }
        });
    }

    onGetVendasPorDataVenda() {
        const dtInicio = this.date1 ? this.date1.toISOString() : '';
        const dtFim = this.date2 ? this.date2.toISOString() : '';

        if (dtInicio <= dtFim) {
            this.vendasDtVenda = [];
            this.loadingVendas = true;

            this.xanoapi.getVendaPorDataVenda(dtInicio, dtFim).subscribe({
                next: (res) => {
                    console.log('Vendas:', res);
                    // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                    this.vendasDtVenda = res;
                    this.loadingVendas = false;
                },
                error: (err) => {
                    if (err.status == 429) {
                        this.showToast("Numero de solicitações ao servidor excedido, aguarde um momento", "error", "Erro");
                    } else {
                        this.showToast("Erro ao consultar vendas", "error", err);
                    }
                    this.loadingVendas = false;
                }
            });

        } else {
            this.showToast("A data incial não pode ser maior que a data final ", "warn", "Atenção");
        }

    }

    //Gravar venda
    async onPostVenda() {

        const novaVenda: Venda = {
            ID_TIPO_SERVICO: this.vendaForm.value.ID_TIPO_SERVICO,
            DESTINO: this.vendaForm.value.DESTINO,
            N_PASSAGEIROS: this.vendaForm.value.N_PASSAGEIROS,
            NM_PASSAGEIRO: this.vendaForm.value.NM_PASSAGEIRO,
            DT_SAIDA: this.vendaForm.value.DT_SAIDA,
            DT_RETORNO: this.vendaForm.value.DT_RETORNO,
            NM_OPERADORA: this.vendaForm.value.NM_OPERADORA,
            DESC_ROTEIRO: this.vendaForm.value.DESC_ROTEIRO,
            VR_TOTAL: this.vendaForm.value.VR_TOTAL,
            NM_FORMA_PGTO: this.vendaForm.value.NM_FORMA_PGTO,
            PARCELAMENTO: this.vendaForm.value.PARCELAMENTO,
            STATUS: this.vendaForm.value.STATUS,
            NM_CLIENTE: this.vendaForm.value.NM_CLIENTE,
            DT_VENDA: this.vendaForm.value.DT_VENDA,
            ID_CLIENTE: this.clienteSelecionado.id,
            ID_OPERADORA: this.vendaForm.value.ID_OPERADORA,
            ID_FORMAPGTO: this.vendaForm.value.ID_FORMAPGTO,
            VR_TAXAS: this.vendaForm.value.VR_TAXAS,
            VR_SALDO: this.vendaForm.value.VR_SALDO,
            VR_PARCELADO: this.vendaForm.value.VR_PARCELADO,
            VR_TARIFA: this.vendaForm.value.VR_TARIFA,
            VR_ENTRADA: this.vendaForm.value.VR_ENTRADA,
            NR_RESERVA: this.vendaForm.value.NR_RESERVA,
            PORCENTAGEM_COMISSAO: this.vendaForm.value.PORCENTAGEM_COMISSAO,
            VR_DESCONTO: this.vendaForm.value.VR_DESCONTO,
            VR_ABATIMENTO:this.vendaForm.value.VR_ABATIMENTO,
            COMISSAO: calculoComissao(this.vendaForm.value.VR_TOTAL,this.vendaForm.value.VR_TAXAS, this.vendaForm.value.VR_DESCONTO, this.vendaForm.value.VR_ABATIMENTO, this.vendaForm.value.PORCENTAGEM_COMISSAO),

        };

        try {
            await this.xanoapi.postVenda(novaVenda);
            this.vendaForm.reset();
            this.visible = false;
            this.onGetVendasPorDataVenda();

            console.log('Venda salva com sucesso!');
            this.showToast("Venda salva com sucesso", "success", "Ok");
        } catch (error) {
            console.error('Erro ao salvar entrega:', error);
            console.log('Forma de pagamento selecionada:', this.formaPgtoSelecionado);
            
        }
    }


    // Editar venda

     async onPathVenda(idVenda: number) {
        
        const pathVenda: Venda = {
            ID_TIPO_SERVICO: this.vendaForm.value.ID_TIPO_SERVICO,
            DESTINO: this.vendaForm.value.DESTINO,
            N_PASSAGEIROS: this.vendaForm.value.N_PASSAGEIROS,
            NM_PASSAGEIRO: this.vendaForm.value.NM_PASSAGEIRO,
            DT_SAIDA: this.vendaForm.value.DT_SAIDA,
            DT_RETORNO: this.vendaForm.value.DT_RETORNO,
            NM_OPERADORA: this.vendaForm.value.NM_OPERADORA,
            DESC_ROTEIRO: this.vendaForm.value.DESC_ROTEIRO,
            VR_TOTAL: this.vendaForm.value.VR_TOTAL,
            NM_FORMA_PGTO: this.vendaForm.value.NM_FORMA_PGTO,
            PARCELAMENTO: this.vendaForm.value.PARCELAMENTO,
            STATUS: this.vendaForm.value.STATUS,
            NM_CLIENTE: this.vendaForm.value.NM_CLIENTE,
            DT_VENDA: this.vendaForm.value.DT_VENDA,
            ID_CLIENTE: this.clienteSelecionado.id,
            ID_OPERADORA: this.vendaForm.value.ID_OPERADORA,
            ID_FORMAPGTO: this.vendaForm.value.ID_FORMAPGTO,
            VR_TAXAS: this.vendaForm.value.VR_TAXAS,
            VR_SALDO: this.vendaForm.value.VR_SALDO,
            VR_PARCELADO: this.vendaForm.value.VR_PARCELADO,
            VR_TARIFA: this.vendaForm.value.VR_TARIFA,
            VR_ENTRADA: this.vendaForm.value.VR_ENTRADA,
            NR_RESERVA: this.vendaForm.value.NR_RESERVA,
            PORCENTAGEM_COMISSAO: this.vendaForm.value.PORCENTAGEM_COMISSAO,
            VR_DESCONTO: this.vendaForm.value.VR_DESCONTO,
            VR_ABATIMENTO:this.vendaForm.value.VR_ABATIMENTO,
            COMISSAO: calculoComissao(this.vendaForm.value.VR_TOTAL,this.vendaForm.value.VR_TAXAS, this.vendaForm.value.VR_DESCONTO, this.vendaForm.value.VR_ABATIMENTO, this.vendaForm.value.PORCENTAGEM_COMISSAO),
            

        };

        try {
            await this.xanoapi.pathVenda(pathVenda, idVenda);
            this.vendaForm.reset();
            this.visible = false;
            this.onGetVendasPorDataVenda();

            console.log('Venda atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar a venda:', error);
           // console.log('Forma de pagamento selecionada:', this.formaPgtoSelecionado);
        }
    }

    ///////////////operações com produtos//////////////////////////////

    // carrega tipo de produtos
    getTiposDeProdutos() {
        this.xanoapi.getProdutos().subscribe({
            next: (res) => {
                console.log('tipodeprodutos:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.tipoProdutos = res;
            },
            error: (err) => {
                console.error('Erro ao buscar tipos de produtos:', err);
                this.errorMessage = 'Erro ao consultar produtos';
                this.loadingVendas = false;
            }
        });

    }

    // Carregar operadoras
    getOperadoras() {
        this.xanoapi.getOperadoras().subscribe({
            next: (res) => {
                console.log('Operadoras:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.operadoras = res;
            },
            error: (err) => {
                console.error('Erro ao buscar operadoras:', err);
                this.errorMessage = 'Erro ao consultar operadoras';
                this.loadingVendas = false;
            }
        });

    }

    // Carregar forma de pagamento
    // Carregar operadoras
    getFormaPgto() {
        this.xanoapi.getFormaPgto().subscribe({
            next: (res) => {
                console.log('Operadoras:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.formaPagamento = res;
            },
            error: (err) => {
                console.error('Erro ao buscar operadoras:', err);
                this.errorMessage = 'Erro ao consultar operadoras';
                this.loadingVendas = false;
            }
        });

    };

    // procurar pessoa 
    onGetSearchCliente(termo: string) {
        this.loadingClientes = true;
        this.clientes = [];
        if (termo.length >= 3) {
            this.xanoapi.getPesquisaCliente(termo).subscribe({
                next: (result: Cliente[]) => {
                    this.clientes = result;
                    this.loadingClientes = false;  // Desliga o indicador de carregamento
                },
                error: (error) => {
                    this.errorMessage = 'Erro ao carregar os dados: ' + error.message;
                    this.loadingClientes = false;
                },
            });
        } else {
            this.clientes = [];
        }

    }

    async onPostCliente() {
        const novocliente: Cliente = {
            id: this.clienteForm.value.id,
            created_at: this.clienteForm.value.created_at,
            NM_COMPLETO: this.clienteForm.value.NM_COMPLETO,
            DT_NASCIMENTO: this.clienteForm.value.DT_NASCIMENTO,
            CPF: this.clienteForm.value.CPF,
            RG: this.clienteForm.value.RG,
            ENDERECO: this.clienteForm.value.ENDERECO,
            EMAIL: this.clienteForm.value.EMAIL,
            FONE: this.clienteForm.value.FONE,
            NACIONALIDADE: this.clienteForm.value.NACIONALIDADE

        };

        try {
            await this.xanoapi.postCliente(novocliente);
            this.clienteForm.reset();
            this.visibleCadCliente = false;

            console.log('Cliente cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);

        }
    }
}


// Função utilitária sleep
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));

}
