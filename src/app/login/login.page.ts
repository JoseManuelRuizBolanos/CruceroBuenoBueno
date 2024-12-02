import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit{
  loginForm! : FormGroup

  constructor(
    public formBuilder:FormBuilder, public loadingController: LoadingController, public authService: AuthenticationService, public router : Router, private menuController: MenuController
  ) {  }

  ionViewDidEnter() {
    this.menuController.enable(false, 'menu');
    document.documentElement.classList.remove('ion-palette-dark');
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'menu');
  }

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
        ]],
        password: ['', [
          Validators.required,
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ]]
    })
 }

 get errorControl(){
  return this.loginForm.controls;
 }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((error) => {
        console.log(error);
        loading.dismiss()
      })

      if(user){
        loading.dismiss()
        this.router.navigate(['/pagina-principal'])
      }else{
        console.log('provide correct value');
      }
    }else{
      alert('Datos no validos')
      loading.dismiss()
    }
  }
}
