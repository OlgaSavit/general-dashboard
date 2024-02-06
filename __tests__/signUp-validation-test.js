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
import SignUpForm from '@/components/auth/signUpForm'

const appRender = async () => {
  render(<SignUpForm />, {wrapper: AllTheProviders})
  await waitFor(() => {
    const button = screen.getByTestId('goToSignUpBtn')
    fireEvent.press(button)
  })
}

const AllTheProviders = ({children}) => {
  const initialState = {output: 10}
  const mockStore = configureStore()
  const store = mockStore(initialState)
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  )
}

describe('Test signUp', () => {
  test('test empty username value', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('username')
      act(() => {
        fireEvent.changeText(input, '')
      })
      expect(input.props.value).toEqual('')
      const emailInputError = screen.getByTestId('errorText-username')
      expect(emailInputError.props.children).toEqual('This field is required')
    })
  })
  test('test username has value', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('username')
      act(() => {
        fireEvent.changeText(input, 'user')
      })
      expect(input.props.value).toEqual('user')
      const inputError = screen.getByTestId('errorText-username')
      expect(inputError).not.toBe('The value "Email" is invalid')
    })
  })

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
  test('test password value is < 6', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('password')
      act(() => {
        fireEvent.changeText(input, '111')
      })
      expect(input.props.value).toEqual('111')
      const inputError = screen.getByTestId('errorText-password')
      expect(inputError.props.children).toEqual(
        'Password too short - must contain at least 6 characters'
      )
    })
  })
  test('test password value is correct', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('password')
      act(() => {
        fireEvent.changeText(input, '111111')
      })
      expect(input.props.value).toEqual('111111')
      const inputError = screen.getByTestId('errorText-password')
      expect(inputError.props.children).not.toBe()
    })
  })

  test('test confirm password value is empty', async () => {
    await appRender()
    await waitFor(() => {
      const input = screen.getByTestId('confirm_password')
      act(() => {
        fireEvent.changeText(input, '')
      })
      expect(input.props.value).toEqual('')
      const inputError = screen.getByTestId('errorText-confirm_password')
      expect(inputError.props.children).toEqual('This field is required')
    })
  })
  test('test confirm password value is passwordsNotMatch', async () => {
    await appRender()
    await waitFor(() => {
      const inputPassConf = screen.getByTestId('confirm_password')
      const inputPass = screen.getByTestId('password')
      act(() => {
        fireEvent.changeText(inputPass, '111111')
      })
      act(() => {
        fireEvent.changeText(inputPassConf, '123')
      })
      expect(inputPass.props.value).toEqual('111111')
      expect(inputPassConf.props.value).toEqual('123')
      expect(inputPassConf.props.value).not.toBe(inputPass.props.value)
      const inputError = screen.getByTestId('errorText-confirm_password')
      expect(inputError.props.children).toEqual('Passwords do not match')
    })
  })
})
