import { getMove as getMoveMinimax } from './utils/minimax'
import { getMove as getMoveAlphaBeta } from './utils/alphaBeta'
import express, { Request, Response} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const BOTS = {
  MINIMAX: 1,
  ALPHA_BETA: 2
}

const BOTS_MOVES = {
  [BOTS.MINIMAX]: getMoveMinimax,
  [BOTS.ALPHA_BETA]: getMoveAlphaBeta
}

const app = express()
const PORT = process.env.PORT || 8080 

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ok: 'Connectfour sever!'})
})

app.post( "/move", async (req: Request, res: Response) => {
    const { board, depth, bot = BOTS.MINIMAX } = req.body
   
    const column = await BOTS_MOVES[bot](board, depth)
  
    return res.json({ column })
})

app.listen(PORT, () => {
    console.log( `server started at http://localhost:${ PORT }`)
})