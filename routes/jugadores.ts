import { Request, Response , Router } from 'express';
import { Jugador } from '../models/jugador';
let data = require('../db');

const router = Router();

const valid_positions = ["GK","DF","MD","FW"];

let jugadores: Jugador[] = data;

let size: number = jugadores.length - 1 ;

//Otener jugadores y jugadores por position
router.get('/', (req: Request, res: Response) => {
  const searchTerm = req.query.position;
  if (searchTerm){
    jugadores = jugadores.filter(jugador => jugador.position == searchTerm)
  }
  res.status(200).json({ jugadores: jugadores });
});

//Obtener un jugador
router.get('/:id', (req: Request, res: Response) => {
  const jid = parseInt(req.params.id);
  const jugador = jugadores.find((j) => j.id === jid);
  if (!jugador) {
    return res.status(404).json({
      message: `El jugador con id ${jid} no fue encontrado`,
    });
  } else {
    return res.status(200).json({ jugador: jugador });
  }
});

//Agregar un jugador
router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  size ++;
  if(body.name != undefined && body.position != undefined && body.suspended != undefined && body.injured != undefined){

    if (valid_positions.includes(body.position)){
      const jugador: Jugador = {
        id: size,
        name: body.name,
        position: body.position,
        suspended: body.suspended,
        injured: body.injured
      };
      jugadores.push(jugador);
      res.status(201).json({ jugador: jugador });
    } else{
      res.status(422).json({ message: "Position invalida" });
    }

  } else {
    res.status(422).json({ message: "Datos incompletos" });
  }
});

//Borrar un jugador
router.delete('/:id', (req: Request, res: Response) => {
  const jid = parseInt(req.params.id);
  let jugador = jugadores.find((jugador) => jugador.id == jid);
  if (jugador){
    jugadores = jugadores.filter((jugador) => jugador.id !== jid);
    res.status(200).json({ jugadores: jugadores });
  } else {
    res.status(404).json({ message: `No existe el jugador con el id ${jid}` });
  }
 
});

//Modificar un jugador
router.put("/:id", (req, res, next) => {
  const jid = parseInt(req.params.id);
  const body = req.body;
  if( body.id || body.name) {
    res.status(422).json({ message: `Solo se puede editar position, suspended e injured` });
  } else {
    const pIndex = jugadores.findIndex((jugador) => jugador.id === jid);
    if (pIndex >= 0) {
      let newJugador = {
        id: jugadores[pIndex].id,
        name: jugadores[pIndex].name,
        position: body.position || jugadores[pIndex].position,
        suspended: body.suspended || jugadores[pIndex].suspended,
        injured: body.injured || jugadores[pIndex].injured
      }
      jugadores[pIndex] = newJugador;
      return res.status(200).json({ jugador: newJugador });
    } else {
      res.status(404).json({ message: `No existe el jugador con el id ${jid}` });
    }
  }
});

//Jugadores convovados
router.post('/call', (req: Request, res: Response) => {
  let habilitados = jugadores.filter((jugador) => jugador.suspended == false && jugador.injured == false ).slice(0,20);
  if(habilitados.length < 20){
    res.status(422).json({ message: "No se cuenta con los suficientes jugadores" });
  } else {
    let gk = habilitados.find(jugador => jugador.position=="GK");
    let df = habilitados.find(jugador => jugador.position=="DF");
    let md = habilitados.find(jugador => jugador.position=="MD");
    let fw = habilitados.find(jugador => jugador.position=="FW");
    if ( gk && df && md && fw){
      res.status(200).json({ jugadores: habilitados });
    } else {
      res.status(422).json({ message: "El equipo de convocados no cubre todas las posiciones" });
    }
  }
});

export default router;