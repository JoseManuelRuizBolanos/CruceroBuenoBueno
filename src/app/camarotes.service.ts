import { Injectable } from "@angular/core";
import { collection, Firestore, getDocs, orderBy, query } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root',
})
export class CamarotesService {
    constructor(private firestore: Firestore){}

    async obtenerCamarotes(){
        const Ref = collection(this.firestore, 'Camarotes');
        const q = query(Ref, orderBy('name'));
        const querySnapshot = await getDocs(q);
        const camarotes = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        return camarotes
    }
}