import { getMove } from './utils/minimax';
import express, { Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
const port = 8080;

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ok: 'Connect four sever!'})
})

app.post( "/move", async (req: Request, res: Response) => {
    const { board, depth } = req.body
    const column = await getMove(board, depth)
    return res.json({column})
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );