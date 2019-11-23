import React from 'react'

export function generateContext(initialState, reducer) {
  const Context = React.createContext(initialState)
  const ContextProvider = ({ children }) => {
    const localReducer = reducer
    const localState =initialState
    const [state, dispatch] = React.useReducer(localReducer, localState)
    return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>
  }
  return { Context, ContextProvider }
}
