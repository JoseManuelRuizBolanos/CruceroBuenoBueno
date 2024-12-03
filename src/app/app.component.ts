import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { exit, personCircle, home, informationCircle, partlySunny, calendar, moon, help, library } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UsuarioService } from './usuario.service';
import { GlobalService } from './global.service';
import { Preferences } from '@capacitor/preferences';
import { Location } from '@angular/common';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  paletteToggle = false;
  isAdmin: boolean = false;
  currentUser: any = null; 

  constructor(public authService:AuthenticationService, public router: Router, public usuarioService: UsuarioService, public globalService: GlobalService, private location: Location) {
    addIcons({ exit, personCircle, home, informationCircle, partlySunny, calendar, moon, help, library });
    this.showSplash();
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    })
  }

  async ngOnInit() {
    await this.loadUserData();

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.loadUserData();

      if (user && user.email === 'admin@gmail.com') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  async loadUserData() {
    if (this.currentUser) {
      const uid = this.globalService.uid;
      const userData = await this.usuarioService.obtenerDatosUsuario(uid);
      if (userData) {
        this.paletteToggle = userData['modoOscuro'];
        this.toggleDarkPalette(this.paletteToggle);
      }
    }
  }

  initializeDarkPalette(isDark: any) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  async toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
    
      await Preferences.set ({
        key: 'modoOscuro',
        value: ev.detail.checked,
      })
  }

  toggleDarkPalette(shouldAdd: any){
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd)
  }

  reloadPage(route: string) {
    this.location.replaceState('/');
    setTimeout(() => {
      this.router.navigate([route]);
    }, 50);
  }

  navigateToPaginaPrincipal() {
    this.reloadPage('/pagina-principal');
  }

  navigateToPerfil() {
    this.reloadPage('/perfil');
  }

  navigateToPreguntasFrecuentes() {
    this.reloadPage('/preguntas-frecuentes');
  }

  navigateToGuiasCruceros() {
    this.reloadPage('/guias-cruceros');
  }

  navigateToElTiempo() {
    this.reloadPage('/tiempo')
  }

  navigateToReservas() {
    this.reloadPage('/reservar')
  }

  navigateToLogin() {
    this.reloadPage('/login')
  }
}