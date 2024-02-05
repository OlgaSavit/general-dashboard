import Home from '../src/screens/Home'
import configureStore from 'redux-mock-store' //ES6 modules
import CustomButton from '../src/components/Button'
import {Provider} from 'react-redux'
import App from '/src/App'
import {render, screen, fireEvent} from '@testing-library/react-native'
import '@testing-library/jest-dom'
import Intro from '../src/components/Intro'

test('test simple component Intro', () => {
  const t = render(<Intro />).toJSON()
  const text = screen.getByTestId('testText')
  const textContent = text.props.children
  expect(textContent).toBe('33test')
  expect(t).toMatchSnapshot()
})
