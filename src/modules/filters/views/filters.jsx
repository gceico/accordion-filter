import { ExpansionPanel } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { getFilters } from '../filters-actions'
import { FiltersContext } from '../filters-context'
import FilterGroup from './filter-group'



const initialState = {
  filterProvider: true,
  filterAccount: true
}

export default function Filters({ data, fetchFunction }) {
  const [expanded, setExpanded] = useState(initialState)
  const filtersContext = useContext(FiltersContext)
  const {
    loading,
    filters: { providerName, cloudAccount }
  } = filtersContext

  useEffect(() => {
    getFilters({ filtersContext, data })
  }, [data])

  const handleExpansion = panel => (event, isExpanded) => {
    setExpanded(
      isExpanded ? { ...expanded, [panel]: true } : { ...expanded, [panel]: false }
    )
  }
  return (
    <div>
      <ExpansionPanel
        expanded={expanded.filterProvider}
        onChange={handleExpansion('filterProvider')}
      >
        <FilterGroup
          group={providerName}
          groupName={'providerName'}
          heading={'Cloud Providers'}
          fetchFunction={fetchFunction}
        />
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded.filterAccount}
        onChange={handleExpansion('filterAccount')}
      >
        <FilterGroup
          group={cloudAccount}
          groupName={'cloudAccount'}
          heading={'Accounts'}
          fetchFunction={fetchFunction}
          maxFilters={3}
          withSearch={true}
        />
      </ExpansionPanel>
    </div>
  )
}

