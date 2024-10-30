import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

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
  }

  ObtenerContenido(coleccion: string): Observable<any[]>
  {
    return this.firestore.collection(coleccion).valueChanges();
  }

  ObtenerContenidoOrdenado(coleccion: string, campo: string, orden: "asc" | "desc"): Observable<any[]>
  {
    return this.firestore.collection(coleccion, ref => ref.orderBy(campo, orden)).valueChanges();
  }

  ObtenerIdPorUrl(coleccion: string, fotoUrl: string): any
  {
    // Devuelvo el contenido obtenido como objeto en lugar de observable
    return new Promise((resolve) => {
      this.firestore.collection(coleccion, ref => ref.where('foto', '==', fotoUrl)).get().subscribe(snapshot => {
        const id = snapshot.docs[0].id; 
        resolve(id);
      });
    });
  }
}
