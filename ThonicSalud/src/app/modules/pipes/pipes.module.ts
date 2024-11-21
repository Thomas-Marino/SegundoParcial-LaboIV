import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignarEstadoPipe } from '../../pipes/asignar-estado.pipe';
import { CapitalizadorPipe } from '../../pipes/capitalizador.pipe';
import { FormatearDniPipe } from '../../pipes/formatear-dni.pipe';
import { AcortarNombrePipe } from '../../pipes/acortar-nombre.pipe';



@NgModule({
  declarations: [
    AsignarEstadoPipe,
    CapitalizadorPipe,
    FormatearDniPipe,
    AcortarNombrePipe
  ],
  imports: [ CommonModule ],
  exports: [
    AsignarEstadoPipe,
    CapitalizadorPipe,
    FormatearDniPipe,
    AcortarNombrePipe
  ]
})
export class PipesModule { }
