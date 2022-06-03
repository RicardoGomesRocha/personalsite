import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProviders } from '../models/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  AuthProviders = AuthProviders;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  login(authMethod: AuthProviders) {
    this.authService.login(authMethod).subscribe((user) => {
      this.router.navigateByUrl('');
    });
  }
}
