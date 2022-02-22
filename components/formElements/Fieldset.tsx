import { FieldError } from 'react-hook-form'
import styled, { css, x } from '@xstyled/styled-components'

export const Label = styled.label`
  display: block;
  margin-bottom: 1;
  font-size: sm;
  color: content-subtle;
  &::first-letter {
    text-transform: uppercase;
  }
`

const Wrapper = styled.div<{
  success?: boolean
  error?: boolean
  noBorder?: boolean
}>`
  width: 100%;
  position: relative;

  padding: 0;
  background-color: layout-level0;
  border-radius: 2;
  border: 1px solid;
  border-color: layout-divider;
  box-shadow: none;
  transition: all 0.2s ease-out;

  input,
  textarea,
  button {
    padding: 3 2;
  }

  &:focus-within {
    border-color: brand-primary;
  }

  ${({ success, error, theme: { colors } }) => css`
    border-color: ${(success && 'utility.confirmation') ||
    (error && 'utility-critical')};
  `}

  ${({ noBorder }) => css`
    border: ${noBorder && 'none'};
  `}
`

const Fieldset = styled.fieldset`
  &:disabled {
    ${Wrapper} {
      background-color: layout-level1accent;
    }
  }
`

const SupportiveText = styled.span`
  font-size: xs;
  line-height: tighter;
  color: content-subtle;
  display: block;
  margin-top: 1;

  &:first-letter {
    text-transform: uppercase;
  }
`
const ErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: utility-critical;
`

type Props = {
  children: JSX.Element
  label?: string
  supportiveText?: string
  disabled?: boolean
  error: FieldError | undefined
  noBorder?: boolean
  optionalField?: boolean
  id?: string
}

function FieldsetComp(props: Props) {
  const {
    label,
    disabled,
    error,
    children,
    supportiveText,
    noBorder,
    optionalField,
    id,
  } = props

  return (
    <Fieldset disabled={disabled}>
      {label && (
        <Label color={error && 'utility-critical'} htmlFor={id}>
          {label}{' '}
          {optionalField && (
            <x.span color='content-nonessential'>(optional)</x.span>
          )}
        </Label>
      )}
      <Wrapper error={error && true} noBorder={noBorder}>
        {children}
      </Wrapper>

      {supportiveText && (
        <SupportiveText as='span'>{supportiveText}</SupportiveText>
      )}

      {error && <ErrorMessage as='span'>{error.message}</ErrorMessage>}
    </Fieldset>
  )
}

export default FieldsetComp