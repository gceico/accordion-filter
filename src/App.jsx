import React from 'react'

import { FiltersContextProvider } from './modules/filters/filters-context'
import { HistoryContextProvider } from './modules/history/history-context'
import HistoryList from './modules/history/views/history-list'

function App() {
  return (
    <HistoryContextProvider>
      <FiltersContextProvider>
        <HistoryList />
      </FiltersContextProvider>
    </HistoryContextProvider>
  )
}

export default App
