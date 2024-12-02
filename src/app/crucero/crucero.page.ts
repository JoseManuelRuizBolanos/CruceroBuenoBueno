import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CrucerosService } from '../cruceros.service';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { book, walk, bed, boat } from 'ionicons/icons';

@Component({
  selector: 'app-crucero',
  templateUrl: './crucero.page.html',
  styleUrls: ['./crucero.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule, FormsModule]
})
export class CruceroPage implements OnInit {
  crucero: any = null;
  idCrucero: string = '';
  selectedPlano: string = '';
  planosDisponibles: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private crucerosService: CrucerosService,
  ) { 
    addIcons({ book, walk, bed, boat });
  }

  ngOnInit() {
    this.idCrucero = this.route.snapshot.paramMap.get('id')!;
    this.loadCruceroDetails();
  }

  async loadCruceroDetails() {
    const cruceroDetails = await this.crucerosService.obtenerCruceroPorId(this.idCrucero);
    this.crucero = cruceroDetails;

    if (this.crucero?.tituloQueHacer && Array.isArray(this.crucero.tituloQueHacer)) {
    } else {
      this.crucero.tituloQueHacer = [];
    }

    if(this.crucero?.tituloCamarotes && Array.isArray(this.crucero.tituloCamarotes)){
    } else {
      this.crucero.tituloCamarotes = [];
    }

    if(this.crucero?.planos && Array.isArray(this.crucero.planos) && this.crucero.planos.length > 0){
      this.planosDisponibles = this.crucero.planos;
      this.selectedPlano = this.crucero.planos[0];
    } else {
      this.crucero.planos = [];
      this.planosDisponibles = [];
    }
  }
}
