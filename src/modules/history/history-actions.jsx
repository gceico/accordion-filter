import Axios from 'axios'
import _ from 'lodash'

import { API_URL } from '../../config'
import { encodeFilters } from '../../helpers'

export const GET_HISTORY = 'GET_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_FAIL = 'GET_HISTORY_FAIL'
export const DELETE_HISTORY = 'DELETE_HISTORY'
export const DELETE_HISTORY_SUCCESS = 'DELETE_HISTORY_SUCCESS'
export const DELETE_HISTORY_FAIL = 'DELETE_HISTORY_FAIL'

export const getHistory = async ({ historyContext, filters }) => {
  const query = encodeFilters(filters)
  let response
  historyContext.dispatch({
    type: GET_HISTORY
  })
  try {
    response = await Axios({
      url: `${API_URL}/history?${query}`,
      method: 'get'
    })
    historyContext.dispatch({
      type: GET_HISTORY_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    const error = _.get(err, 'response.data.errors')
    historyContext.dispatch({
      type: GET_HISTORY_FAIL,
      payload: error
    })
  }
}
export const deleteHistory = async ({ historyContext, id }) => {
  const { history } = historyContext
  let response
  historyContext.dispatch({
    type: DELETE_HISTORY
  })
  try {
    response = await Axios({
      url: `${API_URL}/history/${id}`,
      method: 'delete'
    })
    const newHistory = _.filter(history, item => item.id !== id)
    historyContext.dispatch({
      type: DELETE_HISTORY_SUCCESS,
      payload: newHistory
    })
  } catch (err) {
    const error = _.get(err, 'response.data.errors')
    historyContext.dispatch({
      type: DELETE_HISTORY_FAIL,
      payload: error
    })
  }
}
