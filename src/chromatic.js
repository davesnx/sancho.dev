/*
  const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints


  const { x, y } = useMousePosition()
  const { alpha, beta, gamma } = useDeviceOrientation()
 */

const Cromatic = ({ children, smallScreen, mouse, orientation }) => {
  const ref = useRef(null)

  const positionElLeft = ref.current && ref.current.offsetLeft
  const positionElTop = ref.current && ref.current.offsetTop
  const distanceX = mouse.x - positionElLeft
  const distanceY = mouse.y - positionElTop

  let translateX
  let translateY
  let pita

  if (isTouchDevice) {
    translateX = orientation.gamma / 6
    translateY = (orientation.beta - 30) / 6
    const x = Math.abs(Math.pow(translateX, 2))
    const y = Math.abs(Math.pow(translateY, 2))
    pita = Math.sqrt(x + y) / 10
  } else {
    translateX = distanceX / 100
    translateY = distanceY / 100
    pita = Math.sqrt(Math.pow(translateX, 2) + Math.pow(translateY, 2)) / 10
  }

  return (
    <Overlap ref={ref} size={smallScreen ? '2rem' : '55px'}>
      <Text
        size={smallScreen ? '2rem' : '55px'}
        blur={pita / 2}
        color='rgb(0, 255, 0)'
      >
        {children}
      </Text>
      <Text
        size={smallScreen ? '2rem' : '55px'}
        translateY={translateY}
        translateX={translateX}
        blur={pita}
        color='rgb(255, 0, 0)'
      >
        {children}
      </Text>
      <Text
        size={smallScreen ? '2rem' : '55px'}
        translateY={-translateY}
        translateX={-translateX}
        blur={pita}
        color='rgb(0, 0, 255)'
      >
        {children}
      </Text>
    </Overlap>
  )
}

/* const Overlap = styled.div`
  height: ${props => props.size};

  & > * {
    position: absolute;
  }
`
 */
