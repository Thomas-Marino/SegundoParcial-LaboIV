import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(AngularFirestore);
  
  constructor() {}

  GuardarContenido(coleccion: string, datos: any): void
  {
    const col = this.firestore.collection(coleccion);

    if(datos.length > 0)
    {
      for (const dato of datos) { col.add(dato); }
    }
    else { col.add(datos); }

    console.log(`Datos guardados: ${JSON.stringify(datos)}\nColección: ${coleccion}.`);
  }

  ObtenerContenido(coleccion: string): Observable<any[]> {
    return this.firestore.collection(coleccion).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(id)
        return { id, ...data }; // Devuelve un objeto con el id y los datos
      }))
    );
  }

  ObtenerContenidoOrdenado(coleccion: string, campo: string, orden: "asc" | "desc"): Observable<any[]>
  {
    return this.firestore.collection(coleccion, ref => ref.orderBy(campo, orden)).valueChanges();
  }

  ObtenerUsuarioPorMail(email: string): any
  {
    // Devuelvo el contenido obtenido como objeto en lugar de observable
    return new Promise((resolve) => {
      this.firestore.collection("Usuarios", ref => ref.where('email', '==', email)).get().subscribe(snapshot => {
        const objetoUsuario: any = snapshot.docs[0].data(); 
        resolve(objetoUsuario);
      });
    });
  }

  // ObtenerIdPorUrl(coleccion: string, fotoUrl: string): any
  // {
  //   // Devuelvo el contenido obtenido como objeto en lugar de observable
  //   return new Promise((resolve) => {
  //     this.firestore.collection(coleccion, ref => ref.where('foto', '==', fotoUrl)).get().subscribe(snapshot => {
  //       const id = snapshot.docs[0].id; 
  //       resolve(id);
  //     });
  //   });
  // }

  async ModificarContenido(coleccion: string, id: string, nuevosDatos: any): Promise<void> 
  {
    const docRef = this.firestore.collection(coleccion).doc(id);
    return docRef.update(nuevosDatos).then(() => {
      console.log(`Datos modificados en la colección ${coleccion} con ID ${id}: ${JSON.stringify(nuevosDatos)}`); }).catch(error => {
      console.error("Error al modificar documento: ", error);
    });
  }
}
