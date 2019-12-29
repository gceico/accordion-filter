import styled from 'styled-components'

export const HistoryPage = styled('div')`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto;
  grid-template-areas: 
    "sidebar main";
`

export const HistorySidebar = styled('div')`
  grid-area: sidebar;
  padding-right: 16px;
`

export const HistoryMain = styled('div')`
  grid-area: main;
`