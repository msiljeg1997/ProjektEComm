import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private accountService: AccountService) { }


  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: user => console.log(user)
    })
  }

}
