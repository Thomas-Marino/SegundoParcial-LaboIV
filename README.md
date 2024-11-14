# <p align="center">SegundoParcial-LaboIV</p>
Segundo parcial de la materia Laboratorio de computación IV del 4to cuatrimestre de TUP.

# <p align="center">Thonic Salud</p>
<p align="center"><img src="https://github.com/user-attachments/assets/6d9c977c-2188-48d7-a86c-7040e53ac96c"></p>

>“Thonic Salud, es una clínica que cuenta actualmente con 6 consultorios, dos laboratorios físicos en la clínica, y una sala de espera general. Está abierta al público de lunes a viernes de 8:00 a 19:00, y los sábados de 8:00 a 14:00. En ella trabajan profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, recibiendo pacientes con turno para consulta o tratamiento. Los turnos son solicitados a través de la web, seleccionando el profesional o la especialidad. La duración mínima de un turno es de 30 minutos, pero los profesionales pueden modificarla según su especialidad. Además, contamos con un sector que se encarga de la organización y administración de la clínica."

## <p align="center">Explicación de la aplicación web</p>

### <p align="center">Landing Page</p>
![image](https://github.com/user-attachments/assets/fe094e99-0607-4ea9-82bc-6e43b4fb9a89)
Esta vista será lo primero que te topes al entrar en nuestra aplicación web. Además de proveer una breve descripción acerca de la clínica, te permite ingresar al sistema o registrarte en el mismo.

### <p align="center">Registro de usuarios</p>
![image](https://github.com/user-attachments/assets/a7be99ad-8562-49dc-a800-9eb04c9bd3b2)

Contamos con dos formularios de registro de usuarios, uno para aquellos pacientes que deseen registrarse en el sistema y otro formulario para aquellos especialistas que esten interesados en trabajar con nosotros! 
Simplemente debes seleccionar tu tipo de perfil, llenar los datos solicitados y verificar tu correo electrónico una te registres. En el caso de solicitar una cuenta como especialista, deberás aguardar a que alguno de nuestros administradores verifique tu usuario.

### <p align="center">Inicio de sesión</p>
![image](https://github.com/user-attachments/assets/c34c6e39-174e-4b65-aaa6-5a9de9975022)

Una vez que dispongas de tus credenciales y se autorice tu cuenta, puedes iniciar sesión con las credenciales que proporcionaste en el registro de tu usuario.

### <p align="center">Pantalla de Inicio - Usuario Paciente</p>
![image](https://github.com/user-attachments/assets/05c9e68a-c956-4130-9d52-86bb4d933645)

Una vez dentro del sistema, el paciente tendrá 3 opciones: Solicitar turno / Mis turnos / Mi perfil / Cerrar sesión

### <p align="center">Solicitar turno - Usuario Paciente</p>
![image](https://github.com/user-attachments/assets/73553234-0e38-4b52-a976-ea02514c238b)

El usuario podrá realizar el proceso de agendar un turno médico, para ello, deberá especificar una especialidad, un especialista, una fecha y un horario.

### <p align="center">Mis turnos - Usuario Paciente</p>
![image](https://github.com/user-attachments/assets/b45cc91f-84fc-4105-8e4c-be6c38a74aeb)

Dentro de esta sección el paciente podrá realizar lo siguiente:
- Ver el estado de sus turnos y la información acerca de los mismos.
- Filtrar turnos por Especialista o Especialidad o ambas.
- Cancelar un turno, dejando un mensaje de registro.
- Ver reseñas sobre el turno.
- Completar encuesta de satisfacción acerca del turno

### <p align="center">Pantalla de Inicio - Usuario Especialista</p>
![image](https://github.com/user-attachments/assets/11952e6b-1ff6-4b0d-bbdc-29f5ecbfcf34)

Una vez dentro del sistema, el especialista tendrá 4 opciones:  Mis turnos / Mis pacientes / Mi perfil / Cerrar sesión

### <p align="center">Mis turnos - Usuario Especialista</p>
![image](https://github.com/user-attachments/assets/34fce238-d2ff-43dd-97d8-3d89bfd88ff9)

Dentro de esta sección el especialista podrá realizar lo siguiente:
- Ver el estado de los turnos solicitados con el y la información acerca de los mismos.
- Filtrar turnos por paciente.
- Cancelar un turno, dejando un mensaje de registro.
- Aceptar un turno, dejando un mensaje de registro.
- Rechazar un turno, dejando un mensaje de registro.
- Finalizar un turno, dejando un mensaje de registro.
- Ver reseñas sobre el turno.

### <p align="center">Mis pacientes</p>
![image](https://github.com/user-attachments/assets/d82a4c29-89b0-4798-a77c-7b919b35b070)

En esta sección, el especialista podrá:
- Ver los datos de sus pacientes.
- Visualizar la historia clínica de sus pacientes.

### <p align="center">Pantalla de Inicio - Usuario Administrador</p>
![image](https://github.com/user-attachments/assets/fc0f2021-5621-4330-9116-743ea69b8ab0)

Una vez dentro del sistema, el administrador tendrá 5 opciones:  Administrar usuarios / Turnos / Solicitar turno / Mi perfil / Cerrar sesión

### <p align="center">Administrar usuarios</p> 
![image](https://github.com/user-attachments/assets/038f07b7-3717-410f-9551-65d19c6fd486)

En esta sección se dispone de un dashboard que permite navegar al administrador entre tres funcionalidades:
- Alta de usuarios: El administrador puede dar de alta a un usuario en el sistema, siendo el usuario generado aprobado por defecto.
- Información de usuarios: Permite ver todos los usuarios y su información detalladamente.
- Administrar especialistas: Permite otorgar o revocar permisos a los especialistas dentro del sistema.

### <p align="center">Solicitar turno - Usuario Administrador</p>
![image](https://github.com/user-attachments/assets/854f2b80-93f4-45ea-a768-00fa97153dc2)

Permite asignarle un turno a un paciente con un especialista, para ello, deberá especificar una especialidad, un especialista, un paciente, una fecha y un horario.

### <p align="center">Turnos</p>
![image](https://github.com/user-attachments/assets/c639f97a-e238-4f10-a1f3-0dfc36bdad9e)

En esta sección, el administrador podrá ver y administrar todos los turnos solicitados en la clínica, pudiendo realizar 4 acciones:
- Cancelar un turno: Solamente si este está en estado pendiente y se debe proveer una explicación frente a la cancelación
- Filtrado de turnos por especialista.
- Filtrado de turnos por especialidad.
- Ver reseñas dejadas en los turnos.

### <p align="center">Mi Perfil</p>
![image](https://github.com/user-attachments/assets/7db69732-7a93-4409-a50c-edf6b88aa29f)

En esta sección, el usuario podrá:
- Ver los datos de su perfil.
- Si el usuario es de tipo especialista, podrá asignar su disponibilidad horaria.
- Si el usuario es de tipo paciente, podrá descargar su historia clínica.