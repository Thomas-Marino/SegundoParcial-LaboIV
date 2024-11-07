# SegundoParcial-LaboIV
Segundo parcial de la materia Laboratorio de computación IV del 4to cuatrimestre de TUP.

# Thonic Salud
![icono](https://github.com/user-attachments/assets/6d9c977c-2188-48d7-a86c-7040e53ac96c)

>“Thonic Salud, es una clínica que cuenta actualmente con 6 consultorios, dos laboratorios físicos en la clínica, y una sala de espera general. Está abierta al público de lunes a viernes de 8:00 a 19:00, y los sábados de 8:00 a 14:00. En ella trabajan profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, recibiendo pacientes con turno para consulta o tratamiento. Los turnos son solicitados a través de la web, seleccionando el profesional o la especialidad. La duración mínima de un turno es de 30 minutos, pero los profesionales pueden modificarla según su especialidad. Además, contamos con un sector que se encarga de la organización y administración de la clínica."

## Explicación de la aplicación web

### Landing Page
![image](https://github.com/user-attachments/assets/fe094e99-0607-4ea9-82bc-6e43b4fb9a89)
Esta vista será lo primero que te topes al entrar en nuestra aplicación web. Además de proveer una breve descripción acerca de la clínica, te permite ingresar al sistema o registrarte en el mismo.

### Registro de usuarios
![image](https://github.com/user-attachments/assets/a7be99ad-8562-49dc-a800-9eb04c9bd3b2)

Contamos con dos formularios de registro de usuarios, uno para aquellos pacientes que deseen registrarse en el sistema y otro formulario para aquellos especialistas que esten interesados en trabajar con nosotros! 
Simplemente debes seleccionar tu tipo de perfil, llenar los datos solicitados y verificar tu correo electrónico una te registres. En el caso de solicitar una cuenta como especialista, deberás aguardar a que alguno de nuestros administradores verifique tu usuario.

### Inicio de sesión
![image](https://github.com/user-attachments/assets/c34c6e39-174e-4b65-aaa6-5a9de9975022)

Una vez que dispongas de tus credenciales y se autorice tu cuenta, puedes iniciar sesión con las credenciales que proporcionaste en el registro de tu usuario.

### Pantalla de Inicio - Usuario Paciente
![image](https://github.com/user-attachments/assets/993732d4-b80f-42c1-9bb5-064a30fc67ed)

Una vez dentro del sistema, el paciente tendrá 3 opciones: Solicitar turno / Mis turnos / Cerrar sesión

### Solicitar turno - Usuario Paciente
![image](https://github.com/user-attachments/assets/73553234-0e38-4b52-a976-ea02514c238b)

El usuario podrá realizar el proceso de agendar un turno médico, para ello, deberá especificar una especialidad, un especialista, una fecha y un horario.

### Mis turnos - Usuario Paciente
![image](https://github.com/user-attachments/assets/b45cc91f-84fc-4105-8e4c-be6c38a74aeb)

Dentro de esta sección el paciente podrá realizar lo siguiente:
- Ver el estado de sus turnos y la información acerca de los mismos.
- Filtrar turnos por Especialista o Especialidad o ambas.
- Cancelar un turno, dejando un mensaje de registro.
- Ver reseñas sobre el turno.
- Completar encuesta de satisfacción acerca del turno

### Pantalla de Inicio - Usuario Especialista
![image](https://github.com/user-attachments/assets/fe5b87b3-7790-4e73-b526-67045f5a41ba)

Una vez dentro del sistema, el especialista tendrá 2 opciones:  Mis turnos / Cerrar sesión

### Mis turnos - Usuario Especialista
![image](https://github.com/user-attachments/assets/34fce238-d2ff-43dd-97d8-3d89bfd88ff9)

Dentro de esta sección el especialista podrá realizar lo siguiente:
- Ver el estado de los turnos solicitados con el y la información acerca de los mismos.
- Filtrar turnos por paciente.
- Cancelar un turno, dejando un mensaje de registro.
- Aceptar un turno, dejando un mensaje de registro.
- Rechazar un turno, dejando un mensaje de registro.
- Finalizar un turno, dejando un mensaje de registro.
- Ver reseñas sobre el turno.

### Pantalla de Inicio - Usuario Administrador
![image](https://github.com/user-attachments/assets/2153baef-f85c-408f-b3e3-0a60fc337b54)

Una vez dentro del sistema, el administrador tendrá 4 opciones:  Administrar usuarios / Turnos / Solicitar turno / Cerrar sesión

### Administrar usuarios 
![image](https://github.com/user-attachments/assets/038f07b7-3717-410f-9551-65d19c6fd486)

En esta sección se dispone de un dashboard que permite navegar al administrador entre tres funcionalidades:
- Alta de usuarios: El administrador puede dar de alta a un usuario en el sistema, siendo el usuario generado aprobado por defecto.
- Información de usuarios: Permite ver todos los usuarios y su información detalladamente.
- Administrar especialistas: Permite otorgar o revocar permisos a los especialistas dentro del sistema.

### Solicitar turno - Usuario Administrador
![image](https://github.com/user-attachments/assets/854f2b80-93f4-45ea-a768-00fa97153dc2)

Permite asignarle un turno a un paciente con un especialista, para ello, deberá especificar una especialidad, un especialista, un paciente, una fecha y un horario.

### Turnos
![image](https://github.com/user-attachments/assets/c639f97a-e238-4f10-a1f3-0dfc36bdad9e)

En esta sección, el administrador podrá ver y administrar todos los turnos solicitados en la clínica, pudiendo realizar 4 acciones:
- Cancelar un turno: Solamente si este está en estado pendiente y se debe proveer una explicación frente a la cancelación
- Filtrado de turnos por especialista.
- Filtrado de turnos por especialidad.
- Ver reseñas dejadas en los turnos.