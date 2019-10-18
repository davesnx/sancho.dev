import React, { useState } from 'react'
import styled from 'styled-components'
import { Animate } from 'react-simple-animate'

import useLocalStorage from './use-local-storage'
import Button from './components/button.jsx'
import Spacer from './components/spacer.jsx'
import { colors } from './components/variables'

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  outline: 0;
  height: 42px;
  border-radius: 4px;
  border: 1px solid ${props => props.error ? colors.error : colors.grey3};
  max-width: 200px;

  font-weight: 400;
  padding: 0px 12px;
  font-size: 16px;
  line-height: 26px;

  margin-right: 12px;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${props => props.error ? colors.error : colors.grey5};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${props => props.error ? colors.error : colors.grey5};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${props => props.error ? colors.error : colors.grey5};
  }
`

const Title = styled.p`
  margin: 0;

  color: ${colors.black};
  font-size: 40px;
  line-height: 2;
  font-weight: bold;
  `

const Text = styled.p`
  margin: 0;
  margin-bottom: 10px;

  color: ${props => props.color};
  font-size: 16px;
  line-height: 2;
`

const Distribute = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const MAX_ATTEMPTS = 3

const Modal = ({ onSuccess, onFail }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [value, setValue] = useState('')
  const [attempts, setAttempts] = useLocalStorage('__attempts', 0)

  const handleChange = e => {
  }

  const handleSubmit = e => {
    e.preventDefault()

    console.log(value)
    if (value === '5-febrer') {
      onSuccess()
      setIsOpen(false)
    } else {
      if (attempts >= MAX_ATTEMPTS) {
        onFail()
        return
      }
      setValue('')
      setAttempts((attempts) => attempts + 1)
    }
  }

  const hasError = attempts > 0
  const maxAttempsRiched = attempts >= 3

  return (
    <FullScreen>
      <Animate play={isOpen}
          easeType="cubic-bezier(0.17, 0.67, 0.86, 0.55)"
  start={{ opacity: 0, marginTop: '100px' }}
  end={{ opacity: 1, marginTop: '0px' }}
 delay={0} render={({style}) => {

  return (
    <div style={style}>
 <Spacer top={-12} styles={style}>
        <Distribute>
          <Title color={colors.grey8} fontWeight="bold">
            {"Typeshots"}
          </Title>
          <Text size="sizeN1">{"Alguns screenshots per recordar grans moments a Stickbugs!"}</Text>
          <form onSubmit={handleSubmit}>
              <Input
                error={hasError}
                type="password"
                placeholder="Password"
                required
              />
            <Button type="level2" disabled={maxAttempsRiched} onClick={handleSubmit}>
              {"SUBMIT"}
            </Button>
          </form>
          {hasError ? <Text color={colors.error}>{"You have only " + (MAX_ATTEMPTS - attempts) + " attempts. Are you a Stickbug?"}</Text> : <Text color='transparent'>Space lol</Text>}
        </Distribute>
        </Spacer></div>)
 }}
      />
    </FullScreen>
  )
}

export default Modal
