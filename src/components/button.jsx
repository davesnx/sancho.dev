import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Color from 'color'
import variables from './variables'
import Spacer from './spacer'

const buttonTypes = {
  level0: {
    backgroundColor: variables.colors.grey3,
    contentColor: variables.colors.body
  },
  level1: {
    backgroundColor: variables.colors.body,
    contentColor: variables.colors.white
  },
  level2: {
    backgroundColor: variables.colors.primary,
    contentColor: variables.colors.white
  },
  warning: {
    backgroundColor: variables.colors.error,
    contentColor: variables.colors.white
  },
  inverted: {
    backgroundColor: variables.colors.white,
    contentColor: variables.colors.body
  }
}

const buttonSmall = css`
  padding: 8px 16px;
  font-size: ${variables.fontSizes.size0}px;
  line-height: ${variables.lineHeights.sizeN1}px;
`
const buttonMedium = css`
  padding: 8px 24px;
  font-size: ${variables.fontSizes.size1}px;
  line-height: ${variables.lineHeights.size1}px;
`
const buttonLarge = css`
  padding: 8px 32px;
  font-size: ${variables.fontSizes.size2}px;
  line-height: ${variables.lineHeights.size2}px;
`

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.contentColor};
  font-family: inherit;
  border: 0;
  transition: 0.4s;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  border-radius: 4px;
  font-weight: 400;
  letter-spacing: 1.5px;

  ${props => (props.size === 'small' ? buttonSmall : '')};
  ${props => (props.size === 'medium' ? buttonMedium : '')};
  ${props => (props.size === 'large' ? buttonLarge : '')};

  ${props => (props.fullWidth ? 'width: 100%' : '')};

  &:hover {
    background-color: ${props =>
      props.backgroundColor
        ? Color(props.backgroundColor)
            .mix(Color('black'), 0.1)
            .toString()
        : 'transparent'};
    transition: 0.2s;
  }

  &:active {
    background-color: ${props =>
      props.backgroundColor
        ? Color(props.backgroundColor)
            .mix(Color('black'), 0.05)
            .toString()
        : 'transparent'};
    transition: 0.2s;
  }

  &:focus {
    background-color: ${props =>
      props.backgroundColor
        ? Color(props.backgroundColor)
            .mix(Color('black'), 0.1)
            .toString()
        : 'transparent'};
    transition: 0.2s;
    outline: 0;
  }

  ${props =>
    props.disabled
      ? `background-color: ${variables.colors.grey2}; color: ${
          variables.colors.grey5
        }; pointer-events: none`
      : ''};
`

ButtonWrapper.displayName = 'ButtonWrapper'

export const availableSizes = ['large', 'medium', 'small']

const Button = ({
  type,
  size,
  contentColor = buttonTypes[type].contentColor,
  backgroundColor = buttonTypes[type].backgroundColor,
  fullWidth,
  children,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  dataQa,
  icon
}) => {
  return (
    <ButtonWrapper
      data-qa={dataQa}
      size={size}
      contentColor={contentColor}
      backgroundColor={backgroundColor}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {icon}
      {icon ? <Spacer left={1} /> : null}
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(availableSizes),
  contentColor: PropTypes.string,
  dataQa: PropTypes.string,
  backgroundColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(buttonTypes)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.node
}

Button.defaultProps = {
  size: 'medium',
  fullWidth: false,
  type: 'level1',
  disabled: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  icon: null
}

export default Button
