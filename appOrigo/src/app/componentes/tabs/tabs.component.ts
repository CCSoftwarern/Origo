import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { XanoService } from '../../services/xano.service';
import { Cliente } from '../../interfaces/cliente';
import { TableModule } from 'primeng/table';
import { ButtonGroupModule } from 'primeng/buttongroup'


@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, TabsModule, CommonModule, TableModule, ButtonGroupModule],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss'
})
export class TabsComponent implements OnInit {
    items: MenuItem[] | undefined;
    clientes: Cliente[] = []; 
    errorMessage: string = '';
    loadingClientes: boolean = false;

    ngOnInit() {
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

    constructor(private xanoapi: XanoService){}


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

    }
