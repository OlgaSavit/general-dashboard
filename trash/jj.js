import configureStore from 'redux-mock-store'
import {fireEvent, render, screen} from '@testing-library/react-native'
import {Provider} from 'react-redux'
import App from '@/App'
import Settings from '@/screens/Settings'

// test('test settings correctly', async () => {
//   const initialState = {output: 10}
//   const mockStore = configureStore()
//   const store = mockStore(initialState)
//   const tree = render(
//     <Provider store={store}>
//       <App>
//         <Settings />
//       </App>
//     </Provider>
//   ).toJSON()
//   const button = await screen.findByText('More')
//   fireEvent(button, 'press')
//   const newScreen = await screen.findByText('Settings')
//   const textContent = newScreen.props.children
//   expect(textContent).toBe('Settings')
// })
