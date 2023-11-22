import express, { Application } from 'express';
import bodyParser from 'body-parser';
import jugadoresRoutes from './routes/jugadores';
import autenticacionRoutes, { authenticateToken} from './routes/autenticacion';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/players', authenticateToken, jugadoresRoutes);
app.use(autenticacionRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});