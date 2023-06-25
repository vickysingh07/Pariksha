import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

     loginData = {
      username: '',
      password: '',
     }
     constructor(private snack:MatSnackBar, private login:LoginService){}
     ngOnInit(): void{}

     formSubmit(){
      console.log("login button clicked!!");
      if(this.loginData.username.trim()=='' || this.loginData.username==null){
         this.snack.open("Username is required!!", '',{
          duration: 3000,
         });
         return;
      }

      if(this.loginData.password.trim()=='' || this.loginData.password==null){
        this.snack.open("password is required!!", '',{
         duration: 3000,
        });
        return;
      }
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
        console.log("success");
        console.log(data);
      }, 
      (error)=>{
        console.log("Error!");
        console.log(error);
      }
      );
    }
}
