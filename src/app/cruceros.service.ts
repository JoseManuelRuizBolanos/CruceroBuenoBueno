import { inject, Injectable } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, orderBy, query, setDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root',
})
export class CrucerosService {
    private firestore = inject(Firestore);
    public idCrucero: string = "";

    async guardarCrucero(
        idCrucero: any, 
        name: any, 
        subtitle: any, 
        imagenCrucero: any, 
        descripcion: any, 
        imagenDescripcion: any, 
        tituloQueHacer: any[],
        imagenQueHacer: any[],
        descripcionQueHacer: any[],
        tituloCamarotes: any[],
        descripcionCamarotes: any[],
        imagenCamarotes: any[],
        planos: any[],
        lugares: any[],
        precioLugares: any[],
        puertos: any[]
    ) {
        const obj ={
            "idCrucero" : idCrucero,
            "name" : name,
            "subtitle" : subtitle,
            "imagenCrucero" : imagenCrucero,
            "descripcion" : descripcion,
            "imagenDescripcion" : imagenDescripcion,
            "tituloQueHacer" : tituloQueHacer,
            "imagenQueHacer" : imagenQueHacer,
            "descripcionQueHacer" : descripcionQueHacer,
            "tituloCamarotes" : tituloCamarotes,
            "descripcionCamarotes" : descripcionCamarotes,
            "imagenCamarotes" : imagenCamarotes,
            "planos" : planos,
            "lugares": lugares,
            "precioLugares": precioLugares,
            "puertos": puertos
        };

        const Ref = collection(this.firestore, 'Cruceros');
        const docRef = await addDoc(Ref, obj);
        this.idCrucero = docRef.id;
        console.log(this.idCrucero)
    }

    async obtenerCruceros(){
        const Ref = collection(this.firestore, 'Cruceros');
        const q = query(Ref, orderBy('name'));
        const querySnapshot = await getDocs(q);
        const cruceros = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        return cruceros
    }

    async actualizarCrucero(id: string, formData: any) {
        const cruceroRef = doc(this.firestore, 'Cruceros', id.toString()); 
        await setDoc(cruceroRef, formData, { merge: true });
    }

    async borrarCrucero(cruceroId: string){
        try {
          const reservaRef = doc(this.firestore, "Cruceros", cruceroId);
          await deleteDoc(reservaRef);
        } catch (error) {
          console.error('Error al eliminar el crucero:', error);
        }
      }

    async obtenerCruceroPorId(id: string) {
        const Ref = doc(this.firestore, 'Cruceros', id);
        const docSnap = await getDoc(Ref);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log("No such document!");
          return null;
        }
      }
}