## Levantar API

```
npm run dev 
```

### Endpoints

* POST /register
* POST /login
* GET /players
* GET /players/:id
* POST /players
* DELETE /players/:id
* PUT /players/:id
* POST /players/call

### Propuesta

Debido a los buenos resultados de las últimas fechas, la Asociación Uruguaya de Fútbol desea realizar una aplicación que permita catalogar a todos los futbolistas seleccionables por el actual DT, Marcelo Bielsa.

La aplicación permite agregar, eliminar listar y modificar jugadores.

Se pide realizar una API en Node utilizando Express que permitirá realizar las siguientes acciones: 

* Sign-up & Login
* Autenticación de todos los demás recursos utilizando JWT
* Listado de Jugadores
* Alta y Baja de Jugadores
* Se debe contemplar la entidad Jugador, que constará de las siguientes propiedades:
Id: string (se sugiere número representado como string)
Nombre: string
Posición: string (sólo se acepta GK, DF,MD,FW)
Suspendido: boolean
Lesionado: boolean
NO SE DEBE PERSISTIR EN BASE DE DATOS

#### INFORMACIÓN ADICIONAL
Se cuenta con una colección de Postman que puede ser utilizada para probar los endpoints creados antes de entregar. Asimismo, se cuenta con un db.json con varios jugadores pre-cargados que puede ser utilizado en caso de no querer mantener los datos en memoria.

#### OPCIONALES
* Modificaciónde jugadores (la modificación sólo permite editar las propiedades de posición, suspendido, lesionado)
* Listado de Jugadores convocados
* Convocar Jugadores
* El listado de jugadores convocados debe ser de 22 jugadores, en caso de no llegar, se retorna un error
* Solo se podrán convocar jugadores que tengan las propiedades suspendido y lesionado con valor en false
* Se debe validar que haya al menos un jugador por posición en la convocatoria
