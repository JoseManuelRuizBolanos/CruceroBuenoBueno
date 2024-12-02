import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TiempoPage } from './tiempo.page';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: TiempoPage }])],
})
export class TiempoPageModule {}