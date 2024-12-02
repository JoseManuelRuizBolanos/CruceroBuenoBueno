import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { CrucerosService } from '../cruceros.service';

@Component({
  selector: 'app-gestor-cruceros',
  templateUrl: './gestor-cruceros.page.html',
  styleUrls: ['./gestor-cruceros.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class GestorCrucerosPage  {

  cruceros: any[] = [];

  constructor(private crucerosService: CrucerosService, private router: Router) { 
    addIcons({ addCircle });
    this.loadCruceros();
   }

  sortBy(prop: string) {
    return this.cruceros.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

   async loadCruceros() {
    this.cruceros = await this.crucerosService.obtenerCruceros();
  }
  
  goToEdit(cruceroId: string) {
    this.router.navigate(['/edit-crucero', cruceroId]);
  }

}