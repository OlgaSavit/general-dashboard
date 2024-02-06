import '@testing-library/jest-dom/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
jest.mock('react-native-localize', () => require('react-native-localize/mock'))
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
