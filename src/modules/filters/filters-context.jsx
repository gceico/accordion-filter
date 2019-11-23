import { generateContext } from '../../helpers'
import {
  CHANGE_FILTERS,
  CHANGE_FILTERS_FAIL,
  CHANGE_FILTERS_SUCCESS,
  GET_FILTERS,
  GET_FILTERS_FAIL,
  GET_FILTERS_SUCCESS,
} from './filters-actions'

const initialState = {
  filters: {
    providerName: {},
    cloudAccount: {}
  },
  touched: false,
  loading: false,
  error: undefined
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        loading: true
      }
    case GET_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        touched: true,
        filters: action.payload
      }
    case GET_FILTERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CHANGE_FILTERS:
      return {
        ...state
      }
    case CHANGE_FILTERS_SUCCESS:
      return {
        ...state,
        filters: action.payload
      }
    case CHANGE_FILTERS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

const { Context, ContextProvider } = generateContext(initialState, reducer)
export const FiltersContext = Context
export const FiltersContextProvider = ContextProvider
