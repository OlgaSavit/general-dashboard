import {combineReducers} from 'redux';
import {globalSlice} from './globalSlice';
import {themeSlice} from './themeSlice';
import {languageSlice} from './languageSlice';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [languageSlice.name]: languageSlice.reducer,
  [languageSlice.name]: languageSlice.reducer,
});

export default rootReducer;
