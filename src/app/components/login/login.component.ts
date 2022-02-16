import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faLock = faLock;
  errorMessage = "";
  userCrendentialMessage = "";

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("For is valid")
      this.auth.login(this.loginForm.value).subscribe((result) => {
        console.log("Login success!!")
        this.router.navigate(['admin'])
      },
        (err: Error) => {
          this.userCrendentialMessage = "User credential is not valid";
        }
      )

    } else {
      this.errorMessage = "Form is not valid"
    }
  }

}
