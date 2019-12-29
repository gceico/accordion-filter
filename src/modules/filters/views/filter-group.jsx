import {
  Button,
  Checkbox,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  Icon,
  TextField,
  Typography,
} from '@material-ui/core'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import { changeAllFilters } from '../filters-actions'
import { FiltersContext } from '../filters-context'
import { useStyles } from '../filters-styles'
import FilterItem from './filter-item'

export default function FilterGroup({ group, groupName, heading, fetchFunction, maxFilters, withSearch }) {
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
        <Typography className={classes.heading}>{heading}</Typography>
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