import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { changeFilters } from '../filters-actions'
import { FiltersContext } from '../filters-context'

export default function FilterItem({ count, checked, name, group, fetchFunction }) {
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
