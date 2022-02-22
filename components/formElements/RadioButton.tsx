import { FC, InputHTMLAttributes } from 'react'
import styled from '@xstyled/styled-components'

type Props = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

const RadioButton: FC<Props> = ({ label, ...props }) => {
  return (
    <Wrapper>
      <input type='radio' {...props} />
      <Check />
      <label htmlFor={props.id}>{label}</label>
    </Wrapper>
  )
}

const Check = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 100%;
  background-color: layout-level0;
  border: 2px solid;
  border-color: layout-divider;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 100%;
    background-color: transparent;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;

  label {
    z-index: 1;
    margin: 0;
    padding: 0 32px;
    line-height: 1.25rem;
    cursor: pointer;
    width: 100%;
    text-transform: capitalize;
    color: content-default;
  }

  input[type='radio'] {
    margin: 0;
    height: 0;
    width: 0;
    visibility: hidden;
  }

  input[type='radio']:checked {
    & ~ ${Check} {
      border: 2px solid;
      border-color: brand-primary;

      &:after {
        background-color: brand-primary;
      }
    }

    & ~ label {
      color: content-contrast;
    }
  }
`

export default RadioButton