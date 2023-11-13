import confetti from "canvas-confetti"
import { useState } from "react"
import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"
import { TURNS } from "./constants"
import { checkWinner, checkEndgame } from "./logic/board"
import { Turn } from "./components/Turn"

function App() {
  const [board, setBoard] = useState(Array(42).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const [redCount, setRedCount] = useState(Array(42).fill(null))
  const [yellowCount, setYellowCount] = useState(Array(42).fill(null))

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setRedCount(Array(42).fill(null))
    setYellowCount(Array(42).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //Update board
    if(board[index] || winner) return
    const cell = getCell(index)
    const newBoard = [...board]
    newBoard[cell] = turn
    setBoard(newBoard)
    if(turn===TURNS.X){
      const newColorBoard = [...redCount]
      newColorBoard[cell] = TURNS.X
      setRedCount(newColorBoard)
    } else{
      const newColorBoard = [...yellowCount]
      newColorBoard[cell] = TURNS.O
      setYellowCount(newColorBoard)
    }

    
      
    //Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Check winner or endgame
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndgame(board)) setWinner(false)
  }

  const getCell = (col) => {
    for(let i=col; i<42; i=i+7){
      if(board[i]!=null){
        return i-7
      } 
      if(i>34){
        return i
      }
    }
  }

  return (
    <main className="board">
      <table>
        <tbody>
          <tr>
              <td>
                <Turn turn={turn} color={'red'}></Turn>
              </td>
              <td>
                <section className="game">
                {
                  board.map((square, index) => {
                    if(yellowCount[index]!=null){
                      return (
                        <Square updateBoard={updateBoard} color={TURNS.O} index={index} key={index}>{square}</Square>
                      )
                    } else if(redCount[index]!=null){
                      return(
                        <Square updateBoard={updateBoard} color={TURNS.X} index={index} key={index}>{square}</Square>
                      )
                    }  
                    return(
                      <Square updateBoard={updateBoard} color={null} index={index} key={index}>{square}</Square>
                    )
                    
                  })
                }
                </section>
              </td>
              <td>
                <Turn turn={turn} color={'yellow'}></Turn>
              </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button onClick={resetGame}>New game</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
