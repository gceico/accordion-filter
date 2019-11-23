import React, { useContext, useEffect } from 'react'

import { getHistory } from '../history-actions'
import { HistoryContext } from '../history-context'

export default function HistoryList() {
  const historyContext = useContext(HistoryContext)
  const { loading } = historyContext
  useEffect(() => {
    getHistory({ historyContext })
  }, [])
  return <div>List</div>
}
