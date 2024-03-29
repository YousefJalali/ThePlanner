import { x } from '@xstyled/styled-components'
import { FiSearch } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import Search from '../Search'
import Button from './Button'

const SearchInput = () => {
  const { setModal, clearModal } = useModal()

  const clickHandler = () => {
    setModal({
      id: 'search-modal',
      fullScreen: true,
      content: <Search onRequestClose={() => clearModal('search-modal')} />,
    })
  }

  return (
    <Button name='search' variant='textOnly' onClick={clickHandler}>
      <x.span fontSize='1.5rem' color='content-contrast'>
        <FiSearch />
      </x.span>
    </Button>
  )
}

export default SearchInput
