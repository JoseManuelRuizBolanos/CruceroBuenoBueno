import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recordar-contrasena',
  templateUrl: './recordar-contrasena.page.html',
  styleUrls: ['./recordar-contrasena.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule]
})
export class RecordarContrasenaPage  {
  email: any
  constructor(public authService: AuthenticationService, public router: Router, private menuController: MenuController) { }

  ionViewDidEnter() {
    this.menuController.enable(false, 'menu');
  }

  ionViewDidLeave() {
    this.menuController.enable(true, 'menu');
  }

  async resetPassword(){
      this.authService.resetPassword(this.email).then(() => {
        console.log('reset link sent'),
        this.router.navigate(['/login'])
      }
    ).catch((error) => {
      console.log(error);
    })
  }
}