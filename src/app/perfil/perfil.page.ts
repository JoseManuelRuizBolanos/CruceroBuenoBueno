import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MenuController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { ReservasService } from '../reservas.service';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class PerfilPage {
  user: any
  crucerosReservados: any[] = [];
  crucerosVisitados: any[] = [];
  userName: string = '';
  userEmail: string = '';

  constructor(
    public authService:AuthenticationService, 
    public router: Router, 
    public menu: MenuController, 
    public globalService: GlobalService, 
    private reservasService: ReservasService, 
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) { 
    this.menuActive();
    this.loadUserProfile();
  }

  menuActive(){
    this.menu.enable(true, 'menu');
  }

  async loadUserProfile() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.user = user;
      this.globalService.uid = user.uid;
      await this.loadUserName();
      await this.loadUserEmail();
      await this.loadCrucerosReservados();
    } else {
      this.router.navigate(['/login']);
    }
  }

  async borrarReserva(cruceroId: string){
    try {
      await this.reservasService.borrarReserva(cruceroId);
  
      this.crucerosReservados = this.crucerosReservados.filter(crucero => crucero.id !== cruceroId);
  
      this.alertaReservaBorrada();
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
    }
  }

  async alertaReservaBorrada() {
    const alert = await this.alertController.create({
      header: '¡Reserva cancelada con éxito!',
      message: 'Si quieres volver a hacer una reserva puedes ir a la sección "Reservar"',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async loadUserName() {
    const userData = await this.usuarioService.obtenerDatosUsuario(this.globalService.uid);
    this.userName = userData!['nombre'];
  }

  async loadUserEmail() {
    const userData = await this.usuarioService.obtenerDatosUsuario(this.globalService.uid);
    this.userEmail = userData!['email'];
  }

  async loadCrucerosReservados() {
    if (this.globalService.uid) {

      this.crucerosReservados = await this.reservasService.obtenerReservasPorUid(this.globalService.uid);
      this.crucerosVisitados =await this.reservasService.obtenerCruceroVisitados(this.globalService.uid)
      let hoy = new Date()
      hoy.setHours(0);
      hoy.setMinutes(0);
      hoy.setSeconds(0);
      hoy.setMilliseconds(0);
      for (let crucero of this.crucerosReservados) {
        let fechaI:Date;
        try {
          fechaI = crucero.fechaInicio.toDate();
        } catch (error) {
          fechaI = crucero.fechaInicio;
        }

        
        const fechaInicio = new Date(fechaI);
        const fechaFin = new Date(fechaInicio);
        fechaInicio.setHours(0);
        fechaInicio.setMinutes(0);
        fechaInicio.setSeconds(0);
        fechaInicio.setMilliseconds(0);
        fechaFin.setHours(0);
        fechaFin.setMinutes(0);
        fechaFin.setSeconds(0);
        fechaFin.setMilliseconds(0);
        fechaFin.setDate(fechaFin.getDate() + crucero.noches);
        if (hoy >= fechaFin) {
          this.crucerosVisitados.push(crucero);
          await this.reservasService.moverACrucerosVisitados(crucero.id);
          this.crucerosReservados = this.crucerosReservados.filter(item => item.id !== crucero.id);
        }
      }
    }
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
