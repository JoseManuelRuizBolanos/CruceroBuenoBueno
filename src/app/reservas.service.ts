import { inject, Injectable } from "@angular/core";
import { addDoc, collection, query, Firestore, getDocs, where, deleteDoc, doc, getDoc } from "@angular/fire/firestore";
import { GlobalService } from "./global.service";

@Injectable({
    providedIn: 'root',
})
export class ReservasService {
    private firestore = inject(Firestore);
    constructor( public globalService: GlobalService ) {  }

    async guardarReserva(uid: any, fechaInicio: any, lugares: any, puertoSalida: any, noches: any, huespedes: any, nombreCamarote: any, numeroCamarotes: any, nombreCrucero: any, precioTotal: number) {
        const obj ={
            "uid" : uid,
            "fechaInicio" : fechaInicio,
            "lugares" : lugares,
            "puertoSalida" : puertoSalida,
            "noches" : noches,
            "huespedes" : huespedes,
            "nombreCamarote" : nombreCamarote,
            "numeroCamarotes" : numeroCamarotes,
            "nombreCrucero" : nombreCrucero,
            "precioTotal" : precioTotal
        };

        const Ref = collection(this.firestore, 'Reservas');

        await addDoc(Ref, obj);
    }

    async borrarReserva(cruceroId: string){
      try {
        const reservaRef = doc(this.firestore, "Reservas", cruceroId);
        await deleteDoc(reservaRef);
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
      }
    }

    async obtenerReservasPorUid(uid: string) {
        const Ref = collection(this.firestore, 'Reservas');
        const q = query(Ref, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        const reservas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return reservas;
    }
    async obtenerCruceroVisitados(uid: string) {
      const Ref = collection(this.firestore, 'CrucerosVisitados');
      const q = query(Ref, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const reservas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return reservas;
  }
    async moverACrucerosVisitados(cruceroId: string) {
        const crucero = await this.obtenerReservaPorId(cruceroId);
        
        const fechaInicio = new Date(crucero["fechaInicio"]);
        const fechaFin = new Date(fechaInicio);
        fechaFin.setDate(fechaFin.getDate() + crucero["noches"]);
    
        const today = new Date();
    
        if (today > fechaFin) {
          const visitadosRef = collection(this.firestore, 'CrucerosVisitados');
          await addDoc(visitadosRef, crucero);
          await deleteDoc(doc(this.firestore, 'Reservas', cruceroId));
    
          return true;
        }
        return false;
      }

    async obtenerReservaPorId(cruceroId: string) {
      const reservaRef = doc(this.firestore, 'Reservas', cruceroId);
      const docSnap = await getDoc(reservaRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('Reserva no encontrada');
      }
    }
}