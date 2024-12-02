import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { MenuController } from '@ionic/angular/standalone';
import { GlobalService } from '../global.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule, ReactiveFormsModule]
})
export class CrearCuentaPage implements OnInit {

  constructor(public formBuilder:FormBuilder, public usuarioService: UsuarioService, public globalService: GlobalService, public loadingController: LoadingController, public authService: AuthenticationService, public router : Router, private menuController: MenuController) { }
  
  ionViewDidEnter() {
    this.menuController.enable(false, 'menu');
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'menu');
  }

  regForm = new FormGroup({
    nombre : new FormControl("", Validators.required),
    email : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  })

  async onSubmit(){
    const loading = await this.loadingController.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email!, this.regForm.value.password!)
      if(user){
        this.globalService.inicializarGlobales()
        this.globalService.uid = user.user.uid;
        await this.usuarioService.guardarDatosUsuario(
          this.regForm.value.nombre!,
          this.regForm.value.email!,
        )
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log('provide correct value');

      }
    }else{
      alert('Datos no validos')
      loading.dismiss()
    }
  }

  ngOnInit(){
    this.regForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
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
    return this.regForm.controls;
   }
}
