import { InputHTMLAttributes } from 'react'

type Props<T> = {} & InputHTMLAttributes<HTMLInputElement>

function InputComp<T>(props: Props<T>) {
  return <input {...props} />
}

export default InputComp
// import { useState, InputHTMLAttributes } from 'react'
// import Fieldset from './Fieldset'
// import { useController, UseControllerProps } from 'react-hook-form'

// type Props<T> = {
//   label?: string
//   supportiveText?: string
//   type?: string
//   placeholder?: string
// } & UseControllerProps<T> &
//   InputHTMLAttributes<HTMLInputElement>

// function InputComp<T>(props: Props<T>) {
//   const [focus, setFocus] = useState(false)

//   const onFocusHandler = () => setFocus(true)
//   const onBlurHandler = () => setFocus(false)

//   const {
//     field: { onChange, value, name },
//     fieldState: { invalid, isTouched, isDirty, error },
//     formState: { touchedFields, dirtyFields },
//   } = useController(props)

//   return (
//     <Fieldset label={props.label} focus={focus} error={error}>
//       <input
//         name={name}
//         type={props.type}
//         placeholder={props.placeholder}
//         onChange={onChange}
//         onFocus={onFocusHandler}
//         onBlur={onBlurHandler}
//       />
//     </Fieldset>
//   )
// }

// export default InputComp
