# Vacunassist
Vacunassist. Una aplicacion web que te permite gestionar el sistema de turnos para diferentes vacunas dentro de la ciudad de La Plata.

**Realizado por:**

- :black_nib: Juan Cruz Gutierrez
- :black_nib: Dolores Pondarré
- :black_nib: Maria Marcheschi

## Estado del proyecto

Este proyecto se encuentra finalizado.

La aplicacion permite el registro de usuarios, identificados mediante roles (Vacunador, Administrador, Paciente) que podran realizar diferentes acciones de acuerdo al rol asignado.

A continuacion las caracteristicas:

* **Administrador**
  - Dar de alta/baja un usuario vacunador
  - Rechazo/Aceptacion de solicitud de turno para la vacuna de  *Fiebre Amarilla* (Usuario Paciente)
  - Asignacion de fecha/hora (turno) para una solicitud aprobada de *Fiebre Amarilla*
      - El admistrador ingresa la fecha y la hora deseada para la asignacion efectiva del turno.
      El listado muestra unicamente los turnos disponibles, es decir, aquellos horarios que no se encuentren previamente registrados en el sistema.
  - Modificacion del nombre de un vacunatorio
  - Solicitud de stock de vacunas (Por vacunatorio)
      - El administrador puede determinar asi con facilidad la cantidad de vacunas disponibles. Ademas cuenta con la opcion de agregar o disminuir la cantidad disponible de una determinada vacuna.
  - Generar reporte (Informacion de turnos dentro del sistema)
      - Debera ingresar dos fechas (inicio, fin) para generar un listado de los turnos asignados, junto con informacion del paciente y vacunatorio, dentro de ese rango. Ademas se brindan opciones para generar un reporte mas especifico, teniendo en consideracion parametros como el DNI del paciente, vacunatorio y/o tipo de vacuna aplicada.
   - Solicitar listados:
      - Pacientes
      - Vacunadores
      - Turnos
      
* **Vacunador**
  - Solicitar listado de turnos del dia
      - El vacunador puede ver la informacion de los pacientes que debera esperar para ese dia en el vacunatorio asignado. Podra visualizar, ademas, dos botones con los que podra indicar si el paciente en cuestion asistio o no a su respectivo turno.
  - Registrar asistencia a turno
      - Se corresponde a los dos botones mencionados anteriormente. Si el vacunador indica que un paciente asistio a su turno entonces se **enviara un email** a la direccion de correo electronico del paciente (indicada durante el registro) informando la confirmacion y brindando los datos necesarios sobre su turno y vacuna aplicada.
      - Por el contrario, si indica que no asistio a su turno, se realiza una **reasignacion** de dicho turno. Para la nueva fecha se tendra en cuenta la edad del paciente y si es de riesgo (o no). Finalmente se envia un email indicando, si corresponde, los datos del nuevo turno asignado.
  - Busqueda de turnos por DNI de paciente
  - Edicion de perfil
      - Cambio de nombre, zona y/o contraseña
      
* **Paciente**
  - Registro en el sistema
      - Debera ingresar sus datos. Nombre, apellido, DNI (valido, no registrado con anterioridad en el sistema), indicacion si es paciente de riesgo, fecha de nacimiento, email.
      - Tambien debera ingresar los datos acerca de las vacunas que se aplico con anterioridad, para ello cuenta con tres menus desplegables donde indica el tipo de vacuna, vacunatorio, y fecha de aplicacion (siempre anterior al dia de la fecha actual)
  - Solicitar turno (Fiebre amarilla)
      - En la ventana principal, si no se dio la vacuna de la fiebre amarilla con anterioridadd y cumple con una serie de requisitos evaluados por el sistema, tiene la opcion para solicitar un turno para la vacuna de la *Fiebre Amarilla*. De no cumplir las condiciones simplemente se deshabilita esta opcion y le informa al paciente que no se la puede aplicar
  - Cancelar turno (Fiebre Amarilla)
      - En la ventana principal, cuando el paciente presiona la opcion de "Cancelar Turno" entonces se informa al usuario que su turno ha sido cancelado, libera el turno que tenia asignado e inmediatamente vuelve a habilitar la opcion de solicitud en el panel de *Fiebre Amarilla* mencionada anteriormente.
  - Ver mis turnos
      - Se muestran los turnos asignados del paciente junto con informacion del vacunatorio asignado, fecha/hora del turno y si la vacuna fue aplicada. 
      - Se brindan opciones para reasignar/cancelar un turno (Dependiente el tipo de vacuna). Dependiendo la vacuna y si es un paciente de riesgo se le otorgara un turno con mayor prioridad.
  - Reasignar turno
      - Una vez reasigando el turno, se envia un mail indicando los nuevos datos (fecha/hora)
  - Edicion de perfil
      - Cambio de nombre, zona, indicacion si es paciente de riesgo y/o contraseña
  
## Algunas capturas de pantalla :camera:

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Login_2.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Usuario_Home.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Usuario_MisTurnos.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Usuario_Solicitud.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Admin_Solicitud.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Admin_Reporte.png" width="75%" height="75%">

<img src="https://github.com/GutierrezS-JC/vacunassist-frontend/blob/main/src/img/Display/Admin_Reporte_2.png" width="75%" height="75%">

## Pre-requisitos, Instalacion y Configuracion :gear:

Vamos a hacer uso de `node` y `npm`, por lo que deberas tenerlos instalados en tu maquina.

En primer lugar, hay que clonar el repositorio. 
#### `git clone https://github.com/GutierrezS-JC/vacunassist-frontend.git`

Tambien hay que hacer un clone del repositorio con el backend, de lo contrario no podra realizar ninguna de las acciones del sistema. 
#### `git clone https://github.com/GutierrezS-JC/vacunassist-backend.git`

PD: Hay que instalar Spring Boot Okk :)

Instalacion (Frontend): 
#### `npm install`

Para correr la aplicacion:
#### `npm start`

Para ver en el navegador:
#### `localhost:3000`

## Herramientas usadas :hammer_and_wrench:

  - **React (v18.1.0)**
  - **Bootstrap (v5.1.3)**
  - **React-Bootstrap (v2.4.0)**
  - **React-Icons (v4.4.0)**
  - **React-Router-Dom (v6.3.0)**
  - **Sweetalert2 (v11.4.14)**
  - **Sweetalert2-react-content (v5.0.0)**
  - **Axios (v0.27.2)**
  - **Date-fns (v2.28.0)**
  - **React-Datepicker (v4.8.0)**
  

<br />
<br />
In my thoughts :coffee:
<br />
JDR
