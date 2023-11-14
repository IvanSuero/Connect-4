import confetti from "canvas-confetti"
import { useEffect, useState } from "react"
import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"
import { TURNS } from "./constants"
import { checkWinner, checkEndgame } from "./logic/board"
import { Turn } from "./components/Turn"
import { removeFromLocalStorage, saveToLocalStorage } from "./logic/localStorage"
import { MouseFollower } from "./components/MouseFollower"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(42).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if(turnFromStorage) return turnFromStorage
    return TURNS.X
  })
  const [winner, setWinner] = useState(null)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({x: clientX, y: clientY})
    }
    window.addEventListener('pointermove', handleMove)

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [])

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    removeFromLocalStorage()
  }

  const updateBoard = (index) => {
    //Update board
    if(board[index] || winner) return
    const cell = getCell(index)
    const newBoard = [...board]
    newBoard[cell] = turn
    setBoard(newBoard)
      
    //Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Check winner or endgame
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndgame(board)) setWinner(false)
    saveToLocalStorage({board: newBoard, turn: newTurn})
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
                    return(
                      <Square updateBoard={updateBoard} color={square} index={index} key={index}>{square}</Square>
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

      <MouseFollower position={position} />
    </main>
  )
}

export default App
