import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
// import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
// import { IconField } from 'primeng/iconfield';
// import { InputIcon } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [Toolbar, ButtonModule, InputTextModule, AvatarModule, ChipModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit{
  items: MenuItem[] | undefined;
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
   

}
