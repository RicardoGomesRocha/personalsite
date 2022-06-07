import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthProviders } from '../models/auth';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  AuthProviders = AuthProviders;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  login(authMethod: AuthProviders) {
    this.authService.login(authMethod).subscribe((user) => {
      user.user?.getIdToken().then((token) => console.log(token));
      this.router.navigateByUrl('');
    });
  }

  async loginWithEmailPassword() {
    let result = false;
    try {
      const result = await this.authService.loginWithEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      if (result) this.router.navigate(['']);
    } catch (error) {
      alert(error);
    }
    if (!result) this.router.navigate(['']);
    else alert('some error should be shown here');
  }
}
