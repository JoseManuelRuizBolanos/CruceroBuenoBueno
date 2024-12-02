import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pagina-principal',
    pathMatch: 'full'
  },
  
  {
    path: 'login', 
    loadComponent: () => import ('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'pagina-principal',
    loadComponent: () => import('./pagina-principal/pagina-principal.page').then( m => m.PaginaPrincipalPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./crear-cuenta/crear-cuenta.page').then( m => m.CrearCuentaPage)
  },
  {
    path: 'recordar-contrasena',
    loadComponent: () => import('./recordar-contrasena/recordar-contrasena.page').then( m => m.RecordarContrasenaPage)
  },
  {
    path: 'preguntas-frecuentes',
    loadComponent: () => import('./preguntas-frecuentes/preguntas-frecuentes.page').then( m => m.PreguntasFrecuentesPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'guias-cruceros',
    loadComponent: () => import('./guias-cruceros/guias-cruceros.page').then( m => m.GuiasCrucerosPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia1',
    loadComponent: () => import('./guias-cruceros/guia1/guia1.page').then( m => m.Guia1Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia2',
    loadComponent: () => import('./guias-cruceros/guia2/guia2.page').then( m => m.Guia2Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia3',
    loadComponent: () => import('./guias-cruceros/guia3/guia3.page').then( m => m.Guia3Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia4',
    loadComponent: () => import('./guias-cruceros/guia4/guia4.page').then( m => m.Guia4Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia5',
    loadComponent: () => import('./guias-cruceros/guia5/guia5.page').then( m => m.Guia5Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia6',
    loadComponent: () => import('./guias-cruceros/guia6/guia6.page').then( m => m.Guia6Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia7',
    loadComponent: () => import('./guias-cruceros/guia7/guia7.page').then( m => m.Guia7Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'guia8',
    loadComponent: () => import('./guias-cruceros/guia8/guia8.page').then( m => m.Guia8Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservar',
    loadComponent: () => import('./reservar/reservar.page').then( m => m.ReservarPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas1',
    loadComponent: () => import('./preguntas-frecuentes/preguntas1/preguntas1.page').then( m => m.Preguntas1Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas2',
    loadComponent: () => import('./preguntas-frecuentes/preguntas2/preguntas2.page').then( m => m.Preguntas2Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas3',
    loadComponent: () => import('./preguntas-frecuentes/preguntas3/preguntas3.page').then( m => m.Preguntas3Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas4',
    loadComponent: () => import('./preguntas-frecuentes/preguntas4/preguntas4.page').then( m => m.Preguntas4Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas5',
    loadComponent: () => import('./preguntas-frecuentes/preguntas5/preguntas5.page').then( m => m.Preguntas5Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas6',
    loadComponent: () => import('./preguntas-frecuentes/preguntas6/preguntas6.page').then( m => m.Preguntas6Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas7',
    loadComponent: () => import('./preguntas-frecuentes/preguntas7/preguntas7.page').then( m => m.Preguntas7Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas8',
    loadComponent: () => import('./preguntas-frecuentes/preguntas8/preguntas8.page').then( m => m.Preguntas8Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas9',
    loadComponent: () => import('./preguntas-frecuentes/preguntas9/preguntas9.page').then( m => m.Preguntas9Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas10',
    loadComponent: () => import('./preguntas-frecuentes/preguntas10/preguntas10.page').then( m => m.Preguntas10Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas11',
    loadComponent: () => import('./preguntas-frecuentes/preguntas11/preguntas11.page').then( m => m.Preguntas11Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'preguntas12',
    loadComponent: () => import('./preguntas-frecuentes/preguntas12/preguntas12.page').then( m => m.Preguntas12Page),
    canActivate: [AuthGuard]
  },
  {
    path: 'tiempo',
    loadComponent: () => import('./tiempo/tiempo.page').then( m => m.TiempoPage),
    canActivate: [AuthGuard]
  },
  /*{
    path: 'como-llegar',
    loadComponent: () => import('./como-llegar/como-llegar.page').then( m => m.ComoLlegarPage),
    canActivate: [AuthGuard]
  },*/
  {
    path: 'gestor-cruceros',
    loadComponent: () => import('./gestor-cruceros/gestor-cruceros.page').then( m => m.GestorCrucerosPage)
  },
  {
    path: 'add-crucero',
    loadComponent: () => import('./add-crucero/add-crucero.page').then( m => m.AddCruceroPage)
  },
  {
    path: 'edit-crucero/:id',
    loadComponent: () => import('./edit-crucero/edit-crucero.page').then( m => m.EditCruceroPage)
  },
  {
    path: 'crucero/:id',
    loadComponent: () => import('./crucero/crucero.page').then( m => m.CruceroPage)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
