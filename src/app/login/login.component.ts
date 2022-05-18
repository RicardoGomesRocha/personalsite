import { Component } from '@angular/core';
import { AuthProviders } from '../models/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login(AuthProviders.Google);
  }
}
