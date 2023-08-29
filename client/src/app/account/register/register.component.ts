import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
errors: string [] | null = null;
constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router){}


complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"
registerForm = this.fb.group({
  displayName: ['', Validators.required],    
  Email: ['', [Validators.required, Validators.email]],
  Password: ['', [Validators.required, Validators.pattern(this.complexPassword)]],
})

OnSubmit(){
  this.accountService.register(this.registerForm.value).subscribe({
    next: () => this.router.navigateByUrl('/shop'),
    error: error => this.errors = this.errors = error.errors
  })
}

}
