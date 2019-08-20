import { useContext } from 'react'
import { DataContext } from './DataContext'
import { membersAPI } from './api';

const useData = () => {
  const [state, setState] = useContext(DataContext);


  function setMembers(name) {
    setState(state => ({ ...state, members: name, isLoading: false }))
  }


  function setIsLoading(name) {
    setState(state => ({ ...state, isLoading: name }))
  }


  const getDataFromEndpointsIntoContext = () => {
    // console.log("getting data")
    setIsLoading(true)


    // MEMBERS
    membersAPI()
      .then(list => {

        if (Array.isArray(list)) {
          setMembers(list)
        } else {
          console.log("personnelAPI", list.error)
          setIsLoading(false)
        }
      })
      .catch(error => console.error('members error:', error))

  }

  const clearData = () => {
    setMembers([])
  }

  return {
    getDataFromEndpointsIntoContext,
    clearData,

    setMembers,
    setIsLoading,

    members: state.members,
    isLoading: state.isLoading,
  }
};

export default useData;
