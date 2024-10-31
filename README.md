# SegundoParcial-LaboIV
Segundo parcial de la materia Laboratorio de computación IV del 4to cuatrimestre de TUP.

# Clínica Online

## Descripción del Proyecto

El TP se comenzará durante la cursada y el sistema de corrección será por sprints, que tendrán tanto funcionalidades del sistema como requerimientos mínimos de aprobación. La entrega del TP estará compuesta por cuatro sprints previos a la finalización de la cursada. Una vez finalizada la cursada, el mismo TP se deberá entregar en fecha de Final con el agregado solicitado para esas instancias.

### Requerimientos de la Aplicación

Se debe realizar un sistema según las necesidades y deseos del cliente. A continuación, se describe el negocio según los comentarios del cliente:

> “La Clínica OnLine, especialista en salud, cuenta actualmente con 6 consultorios, dos laboratorios físicos en la clínica, y una sala de espera general. Está abierta al público de lunes a viernes de 8:00 a 19:00, y los sábados de 8:00 a 14:00. En ella trabajan profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, recibiendo pacientes con turno para consulta o tratamiento. Los turnos son solicitados a través de la web, seleccionando el profesional o la especialidad. La duración mínima de un turno es de 30 minutos, pero los profesionales pueden modificarla según su especialidad. Estos profesionales pueden tener más de una especialidad. Además, contamos con un sector que se encarga de la organización y administración de la clínica."

## Sprints

### Sprint 1

**Requerimientos mínimos:**
- Favicon.
- Subido a la web.
- Loading en pantallas de carga.

Se debe tener la posibilidad de registrarse, ingresar al sistema y administrar los usuarios. A continuación, se detallan las especificaciones:

#### Página de bienvenida
- Accesos al login y registro del sistema.

#### Registro
- Sección para registrar pacientes y especialistas.
  - **Datos para Pacientes:**
    - Nombre, Apellido, Edad, DNI, Obra Social, Mail, Contraseña, 2 imágenes de perfil.
  - **Datos para Especialistas:**
    - Nombre, Apellido, Edad, DNI, Especialidad (con opción de agregar nueva), Mail, Contraseña, Imagen de perfil.
  - Validación de campos según corresponda.

#### Login
- Acceso al sistema con botones de acceso rápido.
- **Usuarios Especialista:** Solo pueden ingresar si un administrador aprobó su cuenta y verificaron el mail.
- **Usuarios Paciente:** Solo pueden ingresar si verificaron su mail.

#### Sección Usuarios
- Visible solo para el usuario Administrador.
- Permite habilitar/inhabilitar el acceso de usuarios Especialista y generar nuevos usuarios, incluyendo Administrador.

### Sprint 2

**Requerimientos mínimos:**
- Captcha (de Google o propio) en el registro de usuarios.
- Readme con explicación de la Clínica, pantallas, formas de acceder a las secciones y descripción de cada sección.

#### Mis Turnos
- **Como Paciente:** 
  - Acceso a los turnos solicitados con filtro único por Especialidad y Especialista.
  - Acciones: Cancelar turno, Ver reseña, Completar encuesta, Calificar Atención (según el estado del turno).
- **Como Especialista:** 
  - Acceso a turnos asignados con filtro único por Especialidad y Paciente.
  - Acciones: Cancelar turno, Rechazar turno, Aceptar turno, Finalizar Turno, Ver Reseña (según el estado del turno).
  
#### Turnos
- **Administrador:** Acceso a los turnos de la clínica con filtro único por Especialidad y Especialista, y posibilidad de Cancelar turno.

#### Solicitar Turno
- Permite a Paciente y Administrador seleccionar Especialidad, Especialista, Día y horario del turno dentro de los próximos 15 días.

#### Mi Perfil
- **Especialistas:** Pueden marcar su disponibilidad horaria según especialidad.

### Sprint 3

**Requerimientos mínimos:**
- Exportar datos a Excel o PDF (Usuarios para Administrador; Historia clínica para Pacientes).
- Agregar al menos 2 animaciones de transición entre componentes.

#### Historia Clínica
- Guardar atenciones y controles del paciente.
- **Visible en:** Mi Perfil (Pacientes), Sección Usuarios (Administradores), Sección Pacientes (Especialistas).
- Datos: Altura, Peso, Temperatura, Presión y hasta 3 datos dinámicos (clave-valor).
- Mejoras en el filtro de turnos para búsqueda avanzada.

### Sprint 4

**Requerimientos mínimos:**
- Incorporación de al menos 3 Pipes y 3 Directivas.

#### Informes y Gráficos
- **Para Administradores:**
  - Log de ingresos, cantidad de turnos por especialidad y día, y estadísticas por médico (con opción de exportar a Excel o PDF).

### Sprint 5

**Nuevos datos dinámicos en Historia Clínica:**
- Control de rango, cuadro de texto numérico y switch "Sí/No".

#### Captcha Propio
- Implementar captcha en operaciones de alta para Pacientes y Especialistas, con opción de deshabilitarlo.

#### Animaciones de Transición
- Aplicar al menos 6 animaciones de transición entre componentes.

### Sprint 6

**Idiomas:**
- Implementar traducción a Inglés, Español y Portugués en al menos 3 pantallas.

#### Encuesta de Atención
- Encuesta de satisfacción para pacientes con controles como cuadro de texto, estrellas, radio button, checkbox, control de rango, etc.

#### Generar Informes Gráficos
- Cantidad de visitas, pacientes y médicos por especialidad, resultados de encuestas.
