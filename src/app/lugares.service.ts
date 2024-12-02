import { inject, Injectable } from "@angular/core";
import { collection, Firestore, getDocs, orderBy, query } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root',
})
export class LugaresService {
    private firestore = inject(Firestore);

    async obtenerLugares(){
        const Ref = collection(this.firestore, 'Lugares');
        const q = query(Ref, orderBy('name'));
        const querySnapshot = await getDocs(q);
        const lugares = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        return lugares
    }
}