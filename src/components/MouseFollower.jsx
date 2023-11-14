export const MouseFollower = ({position}) =>{
    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 1.2)',
                border: 'none',
                borderRadius: '50%',
                opacity: 0.5,
                pointerEvents: 'none',
                left: -25,
                top: -25,
                width: 50,
                height: 50,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}>

            </div>
        </>
    )
}