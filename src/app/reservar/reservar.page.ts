import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ReservasService } from '../reservas.service';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { CrucerosService } from '../cruceros.service';
import { LugaresService } from '../lugares.service';
import { PuertosService } from '../puertos.service';
import { CamarotesService } from '../camarotes.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonicModule, ReactiveFormsModule ]
})
export class ReservarPage implements OnInit {
  cruceros: any[] = [];
  lugares: any[] = [];
  puertos: any[] = [];
  camarotes: any[] = [];
  reservaForm!: FormGroup;
  today: any;
  lugaresTotal: any[] = []
  puertosTotal: any[] = []
  ngOnInit(){
    this.getDate();
    this.initializeForm();
    this.loadCruceros();
    this.loadLugares();
    this.loadPuertos();
    this.loadCamarotes();
  }

  getDate() { 
    const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2); 
  }

  async loadCruceros() {
    try {
      this.cruceros = await this.crucerosService.obtenerCruceros();
    } catch (error) {
      console.error('Error al obtener los cruceros:', error);
    }
  }

  async loadLugares() {
    try{
      this.lugares = await this.lugaresService.obtenerLugares();
      this.lugaresTotal = this.lugares
    }catch(error){
      console.error('Error al obtener los lugares:', error);
    }
  }

  async loadPuertos() {
    try{
      this.puertos = await this.puertosService.obtenerPuertos();
      this.puertosTotal = this.puertos
    }catch(error){
      console.error('Error al obtener los puertos:', error);
    }
  }

  async loadCamarotes(){
    try{
      this.camarotes = await this.camarotesService.obtenerCamarotes();
    }catch(error){
      console.error('Error al obtener los camarotes:', error);
    }
  }

  onCruceroChange() {
    this.reservaForm.get('lugares')?.reset();
    this.reservaForm.get('puertoSalida')?.reset();
    const cruceroSeleccionado = this.reservaForm.value.nombreCrucero;

    if(cruceroSeleccionado == null){
      this.loadLugares()
      this.loadPuertos()
    }else{
      this.lugares = []
      for ( let i in cruceroSeleccionado.lugares){
        let aux = this.lugaresTotal.filter(lug => {
         
          return lug.name == cruceroSeleccionado.lugares[i]
        })
        if (aux.length>0){
          this.lugares.push(aux[0]);
        }
      }

      this.puertos = []
      for( let i in cruceroSeleccionado.puertos){
        let aux = this.puertosTotal.filter(pue => {
          return pue.name == cruceroSeleccionado.puertos[i]
        })
        if (aux.length>0){
          this.puertos.push(aux[0]);
        }
      }
    }
  }

  compareFn(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  calcularCamarotes() {
    const huespedes = this.reservaForm.value.huespedes || 0;
    const camarote = this.reservaForm.value.nombreCamarote;
    if(camarote.name == "Camarotes Interiores"){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 6).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }else if(camarote.name == "Vista al Océano" || camarote.name == "Camarotes con Balcón"){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 8).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }else if(camarote.name == "Suite Presidencial"){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 9).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }else if(camarote.name == "Sunset Corner Suite" || camarote.name == "Infinity Balconies"){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 4).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }else if(camarote.name == "Panoramic Suite"){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 3).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }else if(camarote.name == ""){
      const numeroCamarotes = Math.ceil(Number(huespedes) / 1).toString();
      this.reservaForm.patchValue({ numeroCamarotes });
    }
  }

  initializeForm(){
    this.reservaForm = new FormGroup({
      fechaInicio: new FormControl("", Validators.required),
      lugares: new FormControl(null, [Validators.required]),
      puertoSalida: new FormControl("", [Validators.required]),
      noches: new FormControl("", [Validators.required]),
      huespedes: new FormControl(0, [Validators.required]),
      nombreCamarote: new FormControl("", [Validators.required]),
      numeroCamarotes: new FormControl("1", [Validators.required]),
      nombreCrucero: new FormControl(null, [Validators.required])
    })
  }

  onCamaroteChange() {
    this.reservaForm.get('huespedes')?.reset();
    this.reservaForm.get('numeroCamarotes')?.reset();
  }

  precioTotal: number = 0;

  async onSubmit(){
    this.calcularPrecioTotal();
    await this.reservasService.guardarReserva(
      this.globalService.uid,
      this.reservaForm.value.fechaInicio, 
      this.reservaForm.value.lugares, 
      this.reservaForm.value.puertoSalida,
      this.reservaForm.value.noches, 
      this.reservaForm.value.huespedes, 
      this.reservaForm.value.nombreCamarote, 
      this.reservaForm.value.numeroCamarotes, 
      this.reservaForm.value.nombreCrucero.name,
      this.precioTotal)
    this.alertaReserva();
  }

  calcularPrecioTotal() {
    const noches = Number(this.reservaForm.value.noches);
    const huespedes = Number(this.reservaForm.value.huespedes);
    const lugares = this.reservaForm.value.lugares;

    const crucero = this.reservaForm.value.nombreCrucero;

    const camarote = this.reservaForm.value.nombreCamarote;

    const precioNoches = noches * 20;
    console.log(precioNoches)
    const precioCrucero = crucero.precioCrucero;
    console.log(precioCrucero)
    const precioLugares = lugares.precio;
    console.log(precioLugares)
    const precioHuespedes = huespedes * 50
    console.log(precioHuespedes)
    const numeroCamarotes = Math.ceil(huespedes / 5);

    const precioCamarotes = numeroCamarotes * camarote.precio;
    console.log(precioCamarotes)
    this.precioTotal = precioNoches + precioCrucero + precioLugares + precioCamarotes + precioHuespedes;
    console.log(this.precioTotal)
    this.reservaForm.patchValue({ numeroCamarotes: numeroCamarotes.toString() });
  }

  async alertaReserva() {
    const alert = await this.alertController.create({
      header: '¡Crucero Reservado Con Éxito!',
      subHeader: 'El precio total de tu reserva es de '+ this.precioTotal + '€',
      message: 'Si quieres ver o cancelar tus reservas, lo puedes hacer desde tu perfil',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  
  constructor(
    public menu: MenuController, 
    public reservasService: ReservasService, 
    private alertController: AlertController, 
    public globalService: GlobalService,
    private crucerosService: CrucerosService,
    private formBuilder: FormBuilder,
    private lugaresService: LugaresService,
    private puertosService: PuertosService,
    private camarotesService: CamarotesService) { 
    this.menuActive();
    this.lugares = this.lugares;
    this.puertos = this.puertos;
  }

  menuActive(){
    this.menu.enable(true, 'menu');
  }

}