
export const Square = ({ color, updateBoard, index }) => {
    const used = `${color ? color : ''}`
    const className = `square ${used}`

    
    const handleClick = () => {
      updateBoard(index%7)
    }
  
    return (
      <div onClick={handleClick} className={className}></div>
    )
  }