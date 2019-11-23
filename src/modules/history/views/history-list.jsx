import { Avatar, Icon, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import _ from 'lodash'
import React, { useContext, useEffect, useState } from 'react'

import { FiltersContext } from '../../filters/filters-context'
import Filters from '../../filters/views/filters'
import { deleteHistory, getHistory } from '../history-actions'
import { HistoryContext } from '../history-context'

export default function HistoryList() {
  const historyContext = useContext(HistoryContext)
  const filtersContext = useContext(FiltersContext)
  const { loading, history } = historyContext
  const {filters} = filtersContext
  useEffect(() => {
    getHistory({ historyContext, filters })
  }, [])

  const handleDelete = id => {
    deleteHistory({ historyContext, id })
  }

  if (loading) {
    return <div>loading...</div>
  }
  return (
    <>
      <Filters
        data={history}
        fetchFunction={filters => getHistory({ historyContext, filters })}
      />
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Picture</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Run By</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Finished At</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(history, item => (
            <TableRow key={item.id}>
              <TableCell>
                <Avatar variant='square' src={item.picture} />
              </TableCell>
              <TableCell>{item.providerName}</TableCell>
              <TableCell>{item.cloudAccount}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.result}</TableCell>
              <TableCell>{item.runBy}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.finishedAt}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <IconButton
                  color='secondary'
                  component='span'
                  onClick={() => handleDelete(item.id)}
                >
                  <Icon>delete_forever</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
