import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    public uid: string = '';
    public idCrucero: string = '';
    public usuario!: {};
    public isDark='';

    async inicializarGlobales() {
        this.uid = '';
        this.usuario = {};
    }

    constructor() {}

    initializeDarkPalette(isDark: any) {
        this.toggleDarkPalette(isDark);
    }

    toggleDarkPalette(shouldAdd: boolean | undefined){
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd)
    }
}