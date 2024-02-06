import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act
} from '@testing-library/react-native'

import App from '@/App'

import SignInForm from '@/components/auth/signInForm'
import {useSignIn} from '@/components/auth/signInForm/useSignIn'
import {languages} from '@/constants/language'

const appRender = async () => {
  render(<SignInForm />, {wrapper: AllTheProviders})
  await waitFor(() => {
    const button = screen.getByTestId('goToSignInBtn')
    fireEvent.press(button)
  })
}

const AllTheProviders = ({children}) => {
  const initialState = {language: languages.en.code}
  const mockStore = configureStore()
  const store = mockStore(initialState)
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  )
}

describe('Test signIn', () => {
  test('test incorrect email value', async () => {
    await appRender()
    await waitFor(() => {
      const emailInput = screen.getByTestId('email')
      act(() => {
        fireEvent.changeText(emailInput, 'Test')
      })
      expect(emailInput.props.value).toEqual('Test')
      const emailInputError = screen.getByTestId('errorText-email')
      expect(emailInputError.props.children).toEqual(
        'The value "Email" is invalid'
      )
    })
    // Snapshot testing after interacting with the component
    // expect(screen.toJSON()).toMatchSnapshot()
  })
  test('test correct email value', async () => {
    await appRender()
    await waitFor(() => {
      const emailInput = screen.getByTestId('email')
      act(() => {
        fireEvent.changeText(emailInput, 'Test@gmail.com')
      })
      expect(emailInput.props.value).toEqual('Test@gmail.com')
      const emailInputError = screen.getByTestId('errorText-email')
      expect(emailInputError).not.toBe()
    })
  })
  test('test empty email value', async () => {
    await appRender()
    await waitFor(() => {
      const emailInput = screen.getByTestId('email')
      act(() => {
        fireEvent.changeText(emailInput, '')
      })
      expect(emailInput.props.value).toEqual('')
    })
    const emailInputError = screen.getByTestId('errorText-email')
    expect(emailInputError.props.children).toEqual('This field is required')
    expect(screen.toJSON()).toMatchSnapshot()
  })

  test('test password value is empty has error', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('password')
      act(() => {
        fireEvent.changeText(input, '')
      })
      expect(input.props.value).toEqual('')
      const inputError = screen.getByTestId('errorText-password')
      expect(inputError.props.children).toEqual('This field is required')
    })
  })

  test('test signInBtn when form is not field', async () => {
    await appRender()
    await waitFor(() => {
      const btn = screen.getByTestId('signInBtn')
      const inputPass = screen.getByTestId('password')
      const inputEmail = screen.getByTestId('email')
      expect(inputPass.props.value).toEqual('')
      expect(inputEmail.props.value).toEqual('')
      expect(btn.props.accessibilityState.disabled).toBe(true)
    })
  })
})
