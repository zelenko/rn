import React, { useState } from 'react'

const DataContext = React.createContext([{}, () => {}])

const DataProvider = (props) => {
  const [state, setState] = useState({
    members: [],
    isLoading: false
  })

  return (
    <DataContext.Provider value={[state, setState]}>
      {props.children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
