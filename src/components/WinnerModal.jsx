import { Square } from './Square'

export const WinnerModal = ({resetGame, winner}) => {
    if(winner === null) return null
  
    const winnerText = winner === false ? 'Tie' : 'Winner'
  
    return (
      <section className="winner">
        <div className="text">
          <h2>{winnerText}</h2>
  
          <header className="win">
            {winner && <Square color={winner}></Square>}
          </header>
  
          <footer>
            <button onClick={resetGame}>Start over</button>
          </footer>
        </div>
      </section>
    )
  }