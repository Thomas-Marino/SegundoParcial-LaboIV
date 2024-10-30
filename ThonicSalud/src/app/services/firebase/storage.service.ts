import { inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(AngularFireStorage);
  // storageRef = ref(this.storage);

  async GuardarImagen(urlImagen: string, archivo: File): Promise<void>
  {
    // const imgRef = this.storage.ref(urlImagen); // Devuelve una StorageReference para la url pasada como parametro.
    try { await this.storage.upload(urlImagen, archivo); }
    // await imgRef.put(archivo); 
    catch(error) { console.error("Error al subir el archivo a firebase storage."); }
  }

  async ObtenerUrlDescarga(urlImagen: string): Promise<string>
  {
    const imgRef = this.storage.ref(urlImagen); // Devuelve una StorageReference para la url pasada como parametro.
    return firstValueFrom(imgRef.getDownloadURL()); // Devuelve una download URL para la StorageReference pasada como parametro.
  }
}
