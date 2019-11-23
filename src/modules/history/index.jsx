import React from 'react'

import { HistoryContextProvider } from './history-context'
import HistoryList from './views/history-list'

export default function History() {
  return (
    <HistoryContextProvider>
      <HistoryList/>
    </HistoryContextProvider>
  )
}
