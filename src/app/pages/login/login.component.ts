import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
     constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}
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
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            if(this.login.getUserRole() == "ADMIN"){
              //window.location.href = '/admin';
              this.router.navigate(['admin'])
            }else if(this.login.getUserRole()=='NORMAL'){
                //window.location.href = '/user-dashboard';
                this.router.navigate(['user-dashboard'])

            }else{
              this.login.logout();
            }
          }
        )
      }, 
      (error)=>{
        console.log("Error!");
        console.log(error);
      }
      );
    }
}
