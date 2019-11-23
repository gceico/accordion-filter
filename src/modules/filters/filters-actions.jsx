import _ from 'lodash'

export const GET_FILTERS = 'GET_FILTERS'
export const GET_FILTERS_SUCCESS = 'GET_FILTERS_SUCCESS'
export const GET_FILTERS_FAIL = 'GET_FILTERS_FAIL'
export const CHANGE_FILTERS = 'CHANGE_FILTERS'
export const CHANGE_FILTERS_SUCCESS = 'CHANGE_FILTERS_SUCCESS'
export const CHANGE_FILTERS_FAIL = 'CHANGE_FILTERS_FAIL'

export const getFilters = async ({ filtersContext, data }) => {
  const { filters, touched } = filtersContext
  let newFilters = Object.create(filters)
  filtersContext.dispatch({
    type: GET_FILTERS
  })

  _.map(data, ({ providerName, cloudAccount }) => {
    newFilters.providerName[providerName] === undefined
      ? (newFilters.providerName[providerName] = {
          count: 0,
          checked: false,
          name: providerName,
          group: 'providerName'
        })
      : newFilters.providerName[providerName].count++

    newFilters.cloudAccount[cloudAccount] === undefined
      ? (newFilters.cloudAccount[cloudAccount] = {
          count: 0,
          checked: false,
          name: cloudAccount,
          group: 'cloudAccount'
        })
      : newFilters.cloudAccount[cloudAccount].count++
  })
  console.log(filters, newFilters)
  try {
    if (!touched) {
      console.log('aici')
      filtersContext.dispatch({
        type: GET_FILTERS_SUCCESS,
        payload: newFilters
      })
    } else {
      throw new Error('Filters already initialized')
    }
  } catch (err) {
    const errors = _.get(err, 'message')
    filtersContext.dispatch({
      type: GET_FILTERS_FAIL
    })
  }
}

export const changeFilters = ({ filtersContext, fetchFunction, name, group, value }) => {
  let { filters } = filtersContext
  filtersContext.dispatch({
    type: CHANGE_FILTERS
  })
  try {
    filters[group][name].checked = value
    filtersContext.dispatch({
      type: CHANGE_FILTERS_SUCCESS,
      payload: filters
    })
    if (fetchFunction) {
      fetchFunction(filters)
    }
  } catch (err) {
    const errors = _.get(err, 'message')
    filtersContext.dispatch({
      type: CHANGE_FILTERS_FAIL
    })
  }
}

export const changeAllFilters = ({ filtersContext, fetchFunction, group, value }) => {
  let { filters } = filtersContext
  filtersContext.dispatch({
    type: CHANGE_FILTERS
  })
  try {
    _.map(filters[group], (item, name) => {
      filters[group][name].checked = value
    })
    filtersContext.dispatch({
      type: CHANGE_FILTERS_SUCCESS,
      payload: filters
    })
    if (fetchFunction) {
      fetchFunction(filters)
    }
  } catch (err) {
    const errors = _.get(err, 'message')
    filtersContext.dispatch({
      type: CHANGE_FILTERS_FAIL
    })
  }
}
