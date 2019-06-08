import React, { useRef, Fragment } from 'react'
import styled from 'styled-components'

import GlobalStyles from './global-styles.jsx'
import Spacer from './spacer.jsx'
import useMousePosition from './mouse-position.js'
import useDeviceOrientation from './device-orientation'
import background from './images/stardust.png'
import useMediaLayout from 'use-media'

const Main = styled.div`
  width: 100%;
  height: 100%;
  background: url(${background});

  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.p.attrs(props => {
  return {
    style: {
      transform: `
          translate(
            ${props.translateX || 0}px,
            ${props.translateY || 0}px
          )`,
      filter: `blur(${props => props.blur}px)`,
      color: `${props.color}`
    }
  }
})`
  font-size: ${props => props.size};
  font-weight: 500;
  margin: 0;
  mix-blend-mode: screen;
`

const Overlap = styled.div`
  height: ${props => props.size};

  & > * {
    position: absolute;
  }
`

const Center = styled.div`
  margin-top: -5vh;
  max-width: 80vw;
`

const Description = styled.p`
  color: ${props => props.color || 'white'};
  margin: 10px 0;
`

const Link = styled.a.attrs({
  target: '_blank'
})`
  color: ${props => props.color || 'white'};
  font-weight: 600;

  ${props => (props.small ? 'font-size: 16px;' : '')}

  transition: color 0.4s ease;

  &:hover {
    color: #03c9a9;
  }
`

const Content = styled.p`
  font-weight: 200;
  font-size: ${props => props.size}px;
  line-height: 1.5;
  color: white;
`

const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints

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

const App = () => {
  const { x, y } = useMousePosition()
  const { alpha, beta, gamma } = useDeviceOrientation()
  const isSmall = useMediaLayout({ maxWidth: 450 })

  return (
    <Fragment>
      <GlobalStyles />
      <Main>
        <Center>
          <Cromatic
            smallScreen={isSmall}
            mouse={{ x, y }}
            orientation={{
              alpha: Math.floor(alpha),
              beta: Math.floor(beta),
              gamma: Math.floor(gamma)
            }}
          >
            David Sancho
          </Cromatic>
          <Spacer top={1}>
            <Content size={isSmall ? 18 : 22}>
              <Description>
                Software Engineer working at{' '}
                <Link href='https://www.typeform.com'>Typeform</Link>
              </Description>
              <Description>
                Maker of <Link href='https://unwel.ch'>unwel.ch</Link> with{' '}
                <Link href='https://gerard.sh?ref=sancho.dev'>gerard.sh</Link>{' '}
              </Description>
              <Description>
                Co-creator of{' '}
                <Link href='https://yolomanifesto.com'>yolomanifesto.com</Link>
              </Description>
              <Description>
                Amateur triathlete{' '}
                <Link href='https://www.strava.com/athletes/davesnx'>
                  strava.com/athletes/davesnx
                </Link>
              </Description>
              <Description>
                <span role='img' aria-label='hello'>
                  👋
                </span>{' '}
                <Link
                  small
                  color='#747474'
                  href='https://davesnx.typeform.com/to/TPD31G'
                >
                  Ask me anything!
                </Link>
              </Description>
            </Content>
          </Spacer>
        </Center>
      </Main>
    </Fragment>
  )
}

export default App
