import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearCuentaPage } from './crear-cuenta.page';
import { CrearCuentaPageRoutingModule } from './crear-cuenta.page.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        CrearCuentaPageRoutingModule
    ],
    declarations: [CrearCuentaPage]
})
export class CrearCuentaPageModule{}