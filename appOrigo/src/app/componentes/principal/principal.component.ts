import { Component } from '@angular/core';
import { ToolbarComponent } from "../Toolbar/toolbar/toolbar.component";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
  selector: 'app-principal',
  imports: [ToolbarComponent, TabsComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
