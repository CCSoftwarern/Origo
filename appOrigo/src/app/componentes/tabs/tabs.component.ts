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
import { Venda } from '../../interfaces/venda';
import { FluidModule } from 'primeng/fluid';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DrawerModule } from 'primeng/drawer';
import { TipoProduto } from '../../interfaces/tipo-produto';
import { SelectModule } from 'primeng/select';
import { Operadora } from '../../interfaces/operadora';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormaPagamento } from '../../interfaces/forma-pagamento';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';




@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, TabsModule, CommonModule, TableModule,
        ButtonGroupModule, ToastModule, FluidModule, DatePickerModule, FormsModule, DatePipe, CurrencyPipe, FloatLabelModule
        , DrawerModule, SelectModule, AutoCompleteModule, ReactiveFormsModule, InputGroupAddonModule, InputGroupModule, InputNumberModule],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss',
    providers: [MessageService]

})

export class TabsComponent implements OnInit {
    items: MenuItem[] | undefined;
    clientes: Cliente[] = [];
    vendasEmbarque: Venda[] = [];
    vendasDtVenda: Venda[] = [];
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
    vendaForm: FormGroup;

    showDialog() {
        this.visible = true;
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
            ID_TIPO_SERVICO: new FormGroup(''),
            DESTINO: new FormGroup(''),
            N_PASSAGEIROS: new FormGroup(''),
            NM_PASSAGEIRO: new FormGroup(''),
            DT_SAIDA: new FormGroup(''),
            DT_RETORNO: new FormGroup(''),
            NM_OPERADORA: new FormGroup(''),
            DESC_ROTEIRO: new FormGroup(''),
            VR_TOTAL: new FormGroup(''),
            NM_FORMA_PGTO: new FormGroup(''),
            PARCELAMENTO: new FormGroup(''),
            COMISSAO: new FormGroup(''),
            STATUS: new FormGroup(''),
            NM_CLIENTE: new FormGroup(''),
            ID_CLIENTE: new FormGroup('')

        })
    }


    getClientes() {
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

    async deleteCliente(id: number) {
        try {
            this.loadingClientes = true;
            await firstValueFrom(this.xanoapi.deleteCliente(id));
            this.show(`Cliente com ID ${id} deletado com sucesso.`, "success");
            console.log(`Cliente com ID ${id} deletado com sucesso.`);

            await sleep(1000);
            this.getClientes();
        } catch (err) {
            console.error('Erro ao deletar cliente:', err);
            this.errorMessage = 'Erro ao deletar cliente';
            this.show("Erro ao deletar cliente", "error");
        } finally {
            this.loadingClientes = false;
        }
    }
    //Toasts
    show(detalhe: string, severidade: string) {
        this.messageService.add({ severity: severidade, summary: 'Success', detail: detalhe });
    }

    // Deletar venda
    async deleteVenda(id: number) {
        try {
            this.loadingVendas = true;
            await firstValueFrom(this.xanoapi.deleteVenda(id));
            this.show(`Venda com ID ${id} deletado com sucesso.`, "success");
            console.log(`Venda com ID ${id} deletado com sucesso.`);

            await sleep(1000);
            this.getVendasPorDataVenda();
        } catch (err) {
            console.error('Erro ao deletar venda:', err);
            this.errorMessage = 'Erro ao deletar venda';
            this.show("Erro ao deletar ", "error");
        } finally {
            this.loadingVendas = false;
        }
    }

    //Vendas por data

    getVendasPorDataEmbarque() {
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

    getVendasPorDataVenda() {
        this.loadingVendas = true;
        const dtInicio = this.date1 ? this.date1.toISOString() : '';
        const dtFim = this.date2 ? this.date2.toISOString() : '';
        this.xanoapi.getVendaPorDataVenda(dtInicio, dtFim).subscribe({
            next: (res) => {
                console.log('Vendas:', res);
                // Aqui você pode salvar em uma variável, exibir no HTML, etc.
                this.vendasDtVenda = res;
                this.loadingVendas = false;
            },
            error: (err) => {
                console.error('Erro ao buscar vendas:', err);
                this.errorMessage = 'Erro ao consultar vendas';
                this.loadingVendas = false;
            }
        });
    }

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



}



// Função utilitária sleep
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));

}
