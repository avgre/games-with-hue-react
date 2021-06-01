import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  hubAddress: undefined,
  hubUsername: undefined,
  lights: {},
  selectedLight: '',
  connected: false,
  gameName: '',
  globalOptions: {
    players: 2,
    sound: 'on',
  },
  games: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'INITIALIZE_GAME':
      return { ...state, gameName: action.payload };
    case 'CHANGE_COLOR':
      return { ...state, currentColor: action.payload };
    case 'SET_BRIDGE_IP':
      return { ...state, hubAddress: action.payload };
    case 'SET_USER':
      return { ...state, hubUsername: action.payload };
    case 'SET_LIGHTS':
      return { ...state, lights: action.payload };
    case 'SET_PLAYLIGHT':
      return { ...state, selectedLight: action.payload };
    case 'SET_CONNECTED':
      return { ...state, connected: action.payload };
    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, reducer);

const Reducer = () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default Reducer;
