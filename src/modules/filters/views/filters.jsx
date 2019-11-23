import {
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import { changeAllFilters, changeFilters, getFilters } from '../filters-actions'
import { FiltersContext } from '../filters-context'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    alignSelf: 'center'
  },
  groupCheckbox: {
    marginLeft: 'auto'
  },
  groupExpansion: {
    flexDirection: 'column'
  },
  toggleButton: {
    width: 'fit-content'
  },
  searchField: {
    width: 200,
    margin: 0
  }
}))

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
    <>
      <ExpansionPanel
        expanded={expanded.filterProvider}
        onChange={handleExpansion('filterProvider')}
      >
        <FilterGroup
          group={providerName}
          groupName={'providerName'}
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
          fetchFunction={fetchFunction}
          maxFilters={3}
          withSearch={true}
        />
      </ExpansionPanel>
    </>
  )
}

function FilterGroup({ group, groupName, fetchFunction, maxFilters, withSearch }) {
  const classes = useStyles()
  const [limit, setLimit] = useState(maxFilters)
  const [searchedText, setSearchedText] = useState('')
  const [filtersGroup, setFiltersGroup] = useState(group)
  const filtersContext = useContext(FiltersContext)
  const { filters } = filtersContext
  let allChecked = true
  _.map(group, filter => {
    if (!filter.checked) {
      allChecked = false
    }
  })
  const handleCheckAll = (event, isChecked) => {
    changeAllFilters({
      filtersContext,
      group: groupName,
      value: isChecked,
      fetchFunction
    })
  }

  const handleSearch = (event, value) => {
    const searchFor = _.get(event, 'target.value')
    if (searchFor) {
      setFiltersGroup(
        _.pickBy(group, elem =>
          _.includes(elem.name.toLowerCase(), searchFor.toLowerCase())
        )
      )
    } else {
      setFiltersGroup(group)
    }
  }

  return (
    <>
      <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
        <Typography className={classes.heading}>Cloud provider</Typography>
        <FormControlLabel
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
          checked={allChecked}
          onChange={handleCheckAll}
          className={classes.groupCheckbox}
          control={<Checkbox />}
          label={`All (${_.size(group)})`}
        />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.groupExpansion}>
        {withSearch && (
          <TextField
            label='Search filters'
            type='search'
            variant='outlined'
            className={classes.searchField}
            margin='normal'
            onChange={handleSearch}
          />
        )}
        {limit
          ? _.map(_.values(filtersGroup).slice(0, limit), (filter, key) => (
              <FilterItem {...filter} fetchFunction={fetchFunction} key={key} />
            ))
          : _.map(_.values(filtersGroup), (filter, key) => (
              <FilterItem {...filter} fetchFunction={fetchFunction} key={key} />
            ))}
        {maxFilters && (
          <Button
            size='small'
            className={classes.toggleButton}
            onClick={() => setLimit(limit ? undefined : maxFilters)}
          >{`${limit ? `Show all(${_.size(group)})` : 'Hide'} `}</Button>
        )}
      </ExpansionPanelDetails>
    </>
  )
}

function FilterItem({ count, checked, name, group, fetchFunction }) {
  const filtersContext = useContext(FiltersContext)

  const handleCheck = (event, isChecked) => {
    changeFilters({ filtersContext, name, group, value: isChecked, fetchFunction })
  }

  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={handleCheck} value={name} />}
      label={`${name} (${count})`}
    />
  )
}
