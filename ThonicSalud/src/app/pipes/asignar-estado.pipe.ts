import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asignarEstado'
})
export class AsignarEstadoPipe implements PipeTransform {

  transform(value: boolean): string 
  {
    console.log(typeof(value))
    if (value === true) { return "Autorizado" };

    return "Sin autorizar";
  }

}
