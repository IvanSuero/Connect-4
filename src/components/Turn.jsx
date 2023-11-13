import { TURNS } from "../constants"
import { Square } from "./Square"

export const Turn = ({turn, color}) =>{
    return(
        <div className="turn">
            <div>
                <h2>{color==='red' ? 'Player 1: ' : 'Player 2: '}</h2>
                <Square color={color}></Square>
            </div>
            <div className={turn===color ? 'status' : 'no-status'}>Your turn</div>
        </div>
    )
}