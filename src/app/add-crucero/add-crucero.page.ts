import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CrucerosService } from '../cruceros.service';

@Component({
  selector: 'app-add-crucero',
  templateUrl: './add-crucero.page.html',
  styleUrls: ['./add-crucero.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink, ReactiveFormsModule]
})
export class AddCruceroPage  {

  constructor(public crucerosService: CrucerosService, private alertController: AlertController) { }

  addCruceroForm = new FormGroup({
    name: new FormControl(''),
    subtitle: new FormControl(''), 
    imagenCrucero: new FormControl(''), 
    descripcion: new FormControl(''), 
    imagenDescripcion: new FormControl(''), 
    tituloQueHacer: new FormArray([new FormControl('')]), 
    imagenQueHacer: new FormArray([new FormControl('')]),
    descripcionQueHacer: new FormArray([new FormControl('')]),
    tituloCamarotes: new FormArray([new FormControl('')]),
    descripcionCamarotes: new FormArray([new FormControl('')]),
    imagenCamarotes: new FormArray([new FormControl('')]),
    planos: new FormArray([new FormControl('')]),
    lugares: new FormArray([new FormControl('')]),
    precioLugares: new FormArray([new FormControl('')]),
    puertos: new FormArray([new FormControl('')])
  })

  addTituloQueHacerButton() {
    (this.addCruceroForm.get('tituloQueHacer') as FormArray).push(new FormControl(''));
  }

  getTituloQueHacerControls() {
    return (this.addCruceroForm.get('tituloQueHacer') as FormArray).controls;
  }

  addImagenQueHacerButton() {
    (this.addCruceroForm.get('imagenQueHacer') as FormArray).push(new FormControl(''));
  }

  getImagenQueHacerControls() {
    return (this.addCruceroForm.get('imagenQueHacer') as FormArray).controls;
  }

  addDescripcionQueHacerButton() {
    (this.addCruceroForm.get('descripcionQueHacer') as FormArray).push(new FormControl(''));
  }

  getDescripcionQueHacerControls() {
    return (this.addCruceroForm.get('descripcionQueHacer') as FormArray).controls;
  }

  addTituloCamarotesButton() {
    (this.addCruceroForm.get('tituloCamarotes') as FormArray).push(new FormControl(''));
  }

  getTituloCamarotesControls() {
    return (this.addCruceroForm.get('tituloCamarotes') as FormArray).controls;
  }

  addDescripcionCamarotesButton() {
    (this.addCruceroForm.get('descripcionCamarotes') as FormArray).push(new FormControl(''));
  }

  getDescripcionCamarotesControls() {
    return (this.addCruceroForm.get('descripcionCamarotes') as FormArray).controls;
  }

  addImagenCamarotesButton() {
    (this.addCruceroForm.get('imagenCamarotes') as FormArray).push(new FormControl(''));
  }

  getImagenCamarotesControls() {
    return (this.addCruceroForm.get('imagenCamarotes') as FormArray).controls;
  }

  addPlanosButton() {
    (this.addCruceroForm.get('planos') as FormArray).push(new FormControl(''));
  }

  getPlanosControls() {
    return (this.addCruceroForm.get('planos') as FormArray).controls;
  }

  addLugaresButton() {
    (this.addCruceroForm.get('lugares') as FormArray).push(new FormControl(''));
  }

  getLugaresControls() {
    return (this.addCruceroForm.get('lugares') as FormArray).controls;
  }

  addPrecioLugaresButton() {
    (this.addCruceroForm.get('precioLugares') as FormArray).push(new FormControl(''));
  }

  getPrecioLugaresControls() {
    return (this.addCruceroForm.get('precioLugares') as FormArray).controls;
  }

  addPuertosButton() {
    (this.addCruceroForm.get('puertos') as FormArray).push(new FormControl(''));
  }

  getPuertosControls() {
    return (this.addCruceroForm.get('puertos') as FormArray).controls;
  }

  async onSubmit(){
    await this.crucerosService.guardarCrucero(
      this.crucerosService.idCrucero,
      this.addCruceroForm.value.name,
      this.addCruceroForm.value.subtitle,
      this.addCruceroForm.value.imagenCrucero,
      this.addCruceroForm.value.descripcion,
      this.addCruceroForm.value.imagenDescripcion,
      this.addCruceroForm.value.tituloQueHacer || [],
      this.addCruceroForm.value.imagenQueHacer || [],
      this.addCruceroForm.value.descripcionQueHacer || [],
      this.addCruceroForm.value.tituloCamarotes || [],
      this.addCruceroForm.value.descripcionCamarotes || [],
      this.addCruceroForm.value.imagenCamarotes || [],
      this.addCruceroForm.value.planos || [],
      this.addCruceroForm.value.lugares || [],
      this.addCruceroForm.value.precioLugares || [],
      this.addCruceroForm.value.puertos || []
    )
    this.alertaReserva();
  }

  async alertaReserva() {
    const alert = await this.alertController.create({
      header: '¡Crucero Añadido Con Éxito!',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

}
