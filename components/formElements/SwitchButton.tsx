import styled from '@xstyled/styled-components'
import { InputHTMLAttributes } from 'react'

const Slider = styled.span<{ height: number }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: layout-level2accent;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${(props) => (props.height && `${props.height}px`) || '34px'};

  &:before {
    position: absolute;
    content: '';
    height: ${(props) =>
      (props.height && `calc((26 / 34) * ${props.height}px)`) ||
      'calc((26 / 34) * 34px)'};
    width: ${(props) =>
      (props.height && `calc((26 / 34) * ${props.height}px)`) ||
      'calc((26 / 34) * 34px)'};
    left: ${(props) =>
      (props.height && `calc((4 / 34) * ${props.height}px)`) ||
      'calc((4 / 34) * 34px)'};
    bottom: ${(props) =>
      (props.height && `calc((4 / 34) * ${props.height}px)`) ||
      'calc((4 / 34) * 34px)'};
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`

const Switch = styled.label<{ height: number }>`
  position: relative;
  display: inline-block;
  width: ${(props) =>
    (props.height && `calc((60 / 34) * ${props.height}px)`) ||
    'calc((60 / 34) * 34px)'};
  height: ${(props) => (props.height && `${props.height}px`) || '34px'};

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + ${Slider} {
    background-color: brand-primary;
  }

  input:focus + ${Slider} {
    box-shadow: 0 0 1px brand-primary;
  }

  input:checked + ${Slider}:before {
    -webkit-transform: ${(props) =>
      (props.height && `translateX(calc((26 / 34) * ${props.height}px))`) ||
      'translateX(calc((26 / 34) * 34px))'};

    -ms-transform: ${(props) =>
      (props.height && `translateX(calc((26 / 34) * ${props.height}px))`) ||
      'translateX(calc((26 / 34) * 34px))'};

    transform: ${(props) =>
      (props.height && `translateX(calc((26 / 34) * ${props.height}px))`) ||
      'translateX(calc((26 / 34) * 34px))'};
  }
`

type Props = {
  height: number
} & InputHTMLAttributes<HTMLInputElement>

function SwitchButton(props: Props) {
  return (
    <Switch height={props.height} htmlFor={props.id}>
      <input type='checkbox' {...props} />
      <Slider height={props.height}></Slider>
    </Switch>
  )
}

export default SwitchButton