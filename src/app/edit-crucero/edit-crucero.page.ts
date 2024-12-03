import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CrucerosService } from '../cruceros.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-crucero',
  templateUrl: './edit-crucero.page.html',
  styleUrls: ['./edit-crucero.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterLink]
})
export class EditCruceroPage implements OnInit {

  cruceroId: string = "";
  crucero: any = {};
  editForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crucerosService: CrucerosService,
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.editForm = this.fb.group({
      name: [''],
      subtitle: [''],
      imagenCrucero: [''],
      descripcion: [''],
      imagenDescripcion: [''],
      tituloQueHacer: this.fb.array([]),
      imagenQueHacer: this.fb.array([]),
      descripcionQueHacer: this.fb.array([]),
      tituloCamarotes: this.fb.array([]),
      descripcionCamarotes: this.fb.array([]),
      imagenCamarotes: this.fb.array([]),
      planos: this.fb.array([]),
      lugares: this.fb.array([]),
      precioLugares: this.fb.array([]),
      puertos: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cruceroId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.loadCrucero();
  }

  addTituloQueHacerButton() {
    (this.editForm.get('tituloQueHacer') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getTituloQueHacerControls() {
    return (this.editForm.get('tituloQueHacer') as FormArray).controls;
  }

  addImagenQueHacerButton() {
    (this.editForm.get('imagenQueHacer') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getImagenQueHacerControls() {
    return (this.editForm.get('imagenQueHacer') as FormArray).controls;
  }

  addDescripcionQueHacerButton() {
    (this.editForm.get('descripcionQueHacer') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getDescripcionQueHacerControls() {
    return (this.editForm.get('descripcionQueHacer') as FormArray).controls;
  }

  addTituloCamarotesButton() {
    (this.editForm.get('tituloCamarotes') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getTituloCamarotesControls() {
    return (this.editForm.get('tituloCamarotes') as FormArray).controls;
  }
  addDescripcionCamarotesButton() {
    (this.editForm.get('descripcionCamarotes') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getDescripcionCamarotesControls() {
    return (this.editForm.get('descripcionCamarotes') as FormArray).controls;
  }
  addImagenCamarotesButton() {
    (this.editForm.get('imagenCamarotes') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getImagenCamarotesControls() {
    return (this.editForm.get('imagenCamarotes') as FormArray).controls;
  }
  addPlanosButton() {
    (this.editForm.get('planos') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getPlanosControls() {
    return (this.editForm.get('planos') as FormArray).controls;
  }
  addLugaresButton() {
    (this.editForm.get('lugares') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getLugaresControls() {
    return (this.editForm.get('lugares') as FormArray).controls;
  }
  addPrecioLugaresButton() {
    (this.editForm.get('precioLugares') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getPrecioLugaresControls() {
    return (this.editForm.get('precioLugares') as FormArray).controls;
  }
  addPuertosButton() {
    (this.editForm.get('puertos') as FormArray).push(this.fb.group({
      descripcion: ['']
    }));
  }

  getPuertosControls() {
    return (this.editForm.get('puertos') as FormArray).controls;
  }

  get tituloQueHacer(): FormArray {
    return this.editForm.get('tituloQueHacer') as FormArray;
  }

  addTituloQueHacer(descripcion: string) {
    this.tituloQueHacer.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get imagenQueHacer(): FormArray {
    return this.editForm.get('imagenQueHacer') as FormArray;
  }

  addImagenQueHacer(descripcion: string) {
    this.imagenQueHacer.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get descripcionQueHacer(): FormArray {
    return this.editForm.get('descripcionQueHacer') as FormArray;
  }

  addDescripcionQueHacer(descripcion: string) {
    this.descripcionQueHacer.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get tituloCamarotes(): FormArray {
    return this.editForm.get('tituloCamarotes') as FormArray;
  }

  addTituloCamarotes(descripcion: string) {
    this.tituloCamarotes.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get descripcionCamarotes(): FormArray {
    return this.editForm.get('descripcionCamarotes') as FormArray;
  }

  addDescripcionCamarotes(descripcion: string) {
    this.descripcionCamarotes.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get imagenCamarotes(): FormArray {
    return this.editForm.get('imagenCamarotes') as FormArray;
  }

  addImagenCamarotes(descripcion: string) {
    this.imagenCamarotes.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get planos(): FormArray {
    return this.editForm.get('planos') as FormArray;
  }

  addPlanos(descripcion: string) {
    this.planos.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get lugares(): FormArray {
    return this.editForm.get('lugares') as FormArray;
  }

  addLugares(descripcion: string) {
    this.lugares.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get precioLugares(): FormArray {
    return this.editForm.get('precioLugares') as FormArray;
  }

  addPrecioLugares(descripcion: string) {
    this.precioLugares.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  get puertos(): FormArray {
    return this.editForm.get('puertos') as FormArray;
  }

  addPuertos(descripcion: string) {
    this.puertos.push(this.fb.group({
      descripcion: [descripcion]
    }));
  }

  async loadCrucero() {
    try {
      const cruceroData = await this.crucerosService.obtenerCruceros();
      this.crucero = cruceroData.find(c => c.id === this.cruceroId);
      if (this.crucero) {
        this.editForm.patchValue({
          name: this.crucero.name,
          subtitle: this.crucero.subtitle,
          imagenCrucero: this.crucero.imagenCrucero,
          descripcion: this.crucero.descripcion,
          imagenDescripcion: this.crucero.imagenDescripcion,
        });

        this.crucero.tituloQueHacer.forEach((titulo: string) => {
          this.addTituloQueHacer(titulo);
        });

        this.crucero.imagenQueHacer.forEach((imagen: string) => {
          this.addImagenQueHacer(imagen);
        });

        this.crucero.descripcionQueHacer.forEach((descripcion: string) => {
          this.addDescripcionQueHacer(descripcion);
        });

        this.crucero.tituloCamarotes.forEach((titulo: string) => {
          this.addTituloCamarotes(titulo);
        });

        this.crucero.descripcionCamarotes.forEach((descripcion: string) => {
          this.addDescripcionCamarotes(descripcion);
        });

        this.crucero.imagenCamarotes.forEach((imagen: string) => {
          this.addImagenCamarotes(imagen);
        });

        this.crucero.planos.forEach((planos: string) => {
          this.addPlanos(planos);
        });

        this.crucero.lugares.forEach((lugares: string) => {
          this.addLugares(lugares);
        });

        this.crucero.precioLugares.forEach((precioLugares: string) => {
          this.addPrecioLugares(precioLugares);
        });

        this.crucero.puertos.forEach((puertos: string) => {
          this.addPuertos(puertos);
        });
      }
    } catch (error) {
      console.error('Error loading crucero:', error);
    }
  }

  async borrarCrucero(cruceroId: string){
    await this.crucerosService.borrarCrucero(cruceroId);
  
    this.alertaReservaBorrada();

    this.router.navigate(['/gestor-cruceros']);
  }

  async alertaReservaBorrada() {
    const alert = await this.alertController.create({
      header: '¡Crucero eliminado con éxito!',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async saveChanges() {
    if (this.editForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      const formData = this.editForm.value;

      formData.tituloQueHacer = formData.tituloQueHacer.map((x: any) => x.descripcion);

      formData.imagenQueHacer = formData.imagenQueHacer.map((x: any) => x.descripcion);

      formData.descripcionQueHacer = formData.descripcionQueHacer.map((x: any) => x.descripcion);

      formData.tituloCamarotes = formData.tituloCamarotes.map((x: any) => x.descripcion);

      formData.descripcionCamarotes = formData.descripcionCamarotes.map((x: any) => x.descripcion);

      formData.imagenCamarotes = formData.imagenCamarotes.map((x: any) => x.descripcion);

      formData.planos = formData.planos.map((x: any) => x.descripcion);

      formData.lugares = formData.lugares.map((x: any) => x.descripcion);

      formData.precioLugares = formData.precioLugares.map((x: any) => x.descripcion);

      formData.puertos = formData.puertos.map((x: any) => x.descripcion);

      await this.crucerosService.actualizarCrucero(this.cruceroId, formData);
      
      this.router.navigate(['/gestor-cruceros']);
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  }
}
