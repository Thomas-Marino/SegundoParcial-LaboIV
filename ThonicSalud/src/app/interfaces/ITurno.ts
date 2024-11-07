export interface Turno {
    dniEspecialista: string;
    dniPaciente: string;
    fecha: string;
    horario: string;
    estado: "Finalizado" | "Cancelado" | "Rechazado" | "Aceptado" | "Pendiente";
    mensajeEstado: string;
    valoracionConsulta: number;
    comentarioValoracion: string;
}
