import React, { useEffect } from 'react'
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import Person from './Person'
import useData from '../data/useData'
import { FontAwesome } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 5
  }
})

export default function Members ({ navigation }) {
  const { isLoading, members, getDataFromEndpointsIntoContext } = useData()
  // console.log("Members mounted")

  // run only once
  useEffect(() => {
    navigation.setParams({ reload: () => getDataFromEndpointsIntoContext() })
    getDataFromEndpointsIntoContext()
    // console.log("run only once")
  }, [])

  // run every time isLoading changes
  useEffect(() => {
    navigation.setParams({ isLoading })
  }, [isLoading])

  return (
    <FlatList
      data={members}
      style={styles.list}
      keyExtractor={(item, index) => 'id=' + index}
      renderItem={ ({ item, separators }) => (<Person person={item.member} />) } />
  )
}

Members.navigationOptions = (screenProps) => {
  const r = screenProps.navigation.getParam('reload')
  const isLoading = screenProps.navigation.getParam('isLoading')

  if (isLoading) {
    return {
      title: 'Loading ...',
      headerRight: (
        <ActivityIndicator size="small" color="#48BBEC" style={{ padding: 10 }} />
      )
    }
  }

  return {
    title: 'Developers-Guild',
    headerRight: (
      <FontAwesome key="k1" size={20} name="refresh" color="#48BBEC" onPress={r} style={{ padding: 10 }} />
    )
  }
}

Members.propTypes = {
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired
  // }).isRequired
  navigation: PropTypes.object.isRequired
}
