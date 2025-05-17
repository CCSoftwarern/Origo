import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TabsComponent } from "../tabs/tabs.component";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { HomeComponent } from "../home/home.component";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, CommonModule, TabsComponent, HomeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {


  ngOnInit(): void {
    this.selectTab('home');
  }
  collapsed = false;
  activeTab: string | null = null;
  visibleDialogoEmpresa: boolean = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

   selectTab(tab: string) {
    this.activeTab = tab === this.activeTab ? null : tab; // fecha se clicar de novo
  }

  showDialogEmpresa() {
        this.visibleDialogoEmpresa = true;
    }

}
