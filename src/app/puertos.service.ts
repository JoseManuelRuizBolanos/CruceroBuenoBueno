import { inject, Injectable } from "@angular/core";
import { collection, Firestore, getDocs, orderBy, query } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root',
})
export class PuertosService {
    private firestore = inject(Firestore);

    async obtenerPuertos(){
        const Ref = collection(this.firestore, 'Puertos');
        const q = query(Ref, orderBy('name'));
        const querySnapshot = await getDocs(q);
        const puertos = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        return puertos
    }
}