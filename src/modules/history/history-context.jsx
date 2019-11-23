import { generateContext } from '../../helpers'
import {
  DELETE_HISTORY,
  DELETE_HISTORY_FAIL,
  DELETE_HISTORY_SUCCESS,
  GET_HISTORY,
  GET_HISTORY_FAIL,
  GET_HISTORY_SUCCESS,
} from './history-actions'

const initialState = {
  history: [],
  deleted: {},
  loading: false,
  error: undefined
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        loading: true
      }
    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
        loading: false
      }
    case GET_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      case DELETE_HISTORY:
        return {
          ...state,
          loading: true
        }
      case DELETE_HISTORY_SUCCESS:
        return {
          ...state,
          loading: false
        }
      case DELETE_HISTORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
    default:
      return state
  }
}

const { Context, ContextProvider } = generateContext(initialState, reducer)
export const HistoryContext = Context
export const HistoryContextProvider = ContextProvider
