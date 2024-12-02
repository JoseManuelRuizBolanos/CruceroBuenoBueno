import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore'
import { GlobalService } from './global.service';

@Injectable({
    providedIn: 'root',
  })
  export class UsuarioService {
    private firestore = inject(Firestore);
    public modoOscuro: boolean = false;

    constructor(public globalService: GlobalService) {}

    async obtenerDatosUsuario(uid: string) {
      const Ref = collection(this.firestore, 'Usuario');
      const q = query(Ref, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        this.modoOscuro = userDoc['modoOscuro'] || false;
        return userDoc;
      }
      return null;
    }

    async guardarDatosUsuario(nombre: string, email:string){
        const obj = {
            "uid" : this.globalService.uid,
            "nombre" : nombre,
            "email" : email,
            "modoOscuro" : this.modoOscuro
        };

    const Ref = collection(this.firestore, 'Usuario');

    await addDoc(Ref, obj);
  }
}