import Axios from 'axios'
import _ from 'lodash'

import { API_URL } from '../../config'

export const GET_HISTORY = 'GET_HISTORY'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_FAIL = 'GET_HISTORY_FAIL'

export const getHistory = async ({ historyContext }) => {
  let response
  historyContext.dispatch({
    type: GET_HISTORY
  })
  try {
    response = await Axios({
      url: `${API_URL}/history`,
      method: 'get'
    })
    historyContext.dispatch({
      type: GET_HISTORY_SUCCESS,
      payload: {}
    })
  } catch (err) {
    const errors = _.get(err, 'response.data.errors')
    historyContext.dispatch({
      type: GET_HISTORY_FAIL
    })
  }
}
