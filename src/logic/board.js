import { WINNER_COMBOS } from "../constants"

export const checkEndgame = (board) => {
    for(let i=0; i<42; i++){
      if(board[i]===null) return false
    }
  }

export const checkWinner = (board) => {
    for(const combo of WINNER_COMBOS) {
        const [a, b, c, d] = combo
        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c] &&
            board[a] === board[d]
        ){
            return board[a]
        }
    }
    return null
}


