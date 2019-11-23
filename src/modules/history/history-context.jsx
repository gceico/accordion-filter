import { generateContext } from '../../helpers'
import { GET_HISTORY, GET_HISTORY_FAIL, GET_HISTORY_SUCCESS } from './history-actions'

const initialState = {
  loading: false
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
        loading: false
      }
    case GET_HISTORY_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

const { Context, ContextProvider } = generateContext(initialState, reducer)
export const HistoryContext = Context
export const HistoryContextProvider = ContextProvider
