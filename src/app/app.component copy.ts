import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule} from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { FormsModule } from '@angular/forms';
import { exit, personCircle, home, informationCircle, partlySunny, location, calendar, moon, help, library } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UsuarioService } from './usuario.service';
import { GlobalService } from './global.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule],
})
export class AppComponent implements OnInit{
  paletteToggle = false;

  constructor(public authService:AuthenticationService, public router: Router, public usuarioService: UsuarioService, public globalService: GlobalService) {
    addIcons({ exit, personCircle, home, informationCircle, partlySunny, location, calendar, moon, help, library });
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }

  async ngOnInit() {
  //  const prefersDark = window.matchMedia('(prefers-color-schema: dark)');

    await this.loadUserData();

   // this.initializeDarkPalette(prefersDark.matches);

  //  prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  async loadUserData() {
    const uid = this.globalService.uid;
    const userData = await this.usuarioService.obtenerDatosUsuario(uid);
    if (userData) {
      this.paletteToggle = userData['modoOscuro'];
      this.toggleDarkPalette(this.paletteToggle);
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
}
