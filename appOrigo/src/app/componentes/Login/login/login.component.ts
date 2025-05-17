import { Component, signal } from '@angular/core';
import { XanoService } from '../../../services/xano.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { Message, MessageModule } from 'primeng/message';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, InputTextModule, InputIconModule, IconFieldModule, ButtonModule, ProgressSpinnerModule,
    PasswordModule, MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  visible = signal(false);
  msnErro: string =''

  constructor(private auth: XanoService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
    })
  }

onLogin(): void {
  // Marca os campos como tocados para exibir mensagens de erro, se houver
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';


  this.auth.login(this.loginForm.value.email, this.loginForm.value.senha).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/principal']);
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Erro ao fazer login:', err);
      if (err.status === 403){
         this.errorMessage = err.error.message;
        this.showMessage()

      } 
      // Mensagem de erro mais específica se possível
      if (err.status === 401) {
        this.errorMessage = 'Email ou senha incorretos.';
        this.showMessage()
      }
      // } else {
      //   this.errorMessage = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
      //   this.showMessage()
      // }
    }
  });
}

showMessage() {
        this.visible.set(true);

        setTimeout(() => {
            this.visible.set(false);
        }, 3500);
    }


}
