import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MenuController } from '@ionic/angular';
import { CrucerosService } from '../cruceros.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule ]
})
export class PaginaPrincipalPage implements OnInit {
  cruceros: any[] = [];
  todosCruceros: any[] = [];
  searchTerm: string='';
  user: any
  constructor(public authService:AuthenticationService, public router: Router, public menu: MenuController, public crucerosService: CrucerosService) { 
    this.menuActive();
    this.loadCruceros();
  }

  sortBy(prop: string) {
    return this.cruceros.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  ngOnInit() {
    this.reloadPage();
  }

  reloadPage() {
    this.router.navigateByUrl('/pagina-principal', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURIComponent(location.pathname)]);
    });
  }

  menuActive(){
    this.menu.enable(true, 'menu');
  }

  async loadCruceros(){
    this.todosCruceros = await this.crucerosService.obtenerCruceros();
    this.cruceros = [...this.todosCruceros];
  }

  async handleInput(event: any){
    this.searchTerm = event.target.value;
    const query = event.target.value.toLowerCase();
    if(query == ""){
      this.cruceros = [...this.todosCruceros];
    }else{
      this.cruceros = this.todosCruceros.filter((d) => d.name.toLowerCase().includes(query))
    }
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }

  goToCruceroDetails(id: string) {
    this.router.navigate(['/crucero', id]);
  }
}