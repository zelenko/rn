import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    margin: 0,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row'
  },
  image: {
    width: 100,
    padding: 0
  },
  details: {
    flex: 1,
    paddingLeft: 10
  },
  name: {
    fontSize: 20,
    fontWeight: '700'
  },
  detailText: {
    fontSize: 13,
    fontWeight: '100',
    color: '#a3a3a3'
  }
})

export default function PersonCard ({ person }) {
  if (!person) {
    console.log('not defined')
    return
  }

  // Display photo if photo is available.  Otherwise display placeholder
  let photo
  if (person.photo && person.photo.highres_link) {
    photo = person.photo.highres_link
  } else {
    photo = 'https://placehold.it/100x100'
  }

  return (
    <View style={styles.card}>

      <View style={styles.image}>
        <Image key="logo+{person.phone}"
          style={{ width: undefined, height: 100, alignItems: 'stretch', borderRadius: 5 }}
          resizeMode="contain"
          source={{ uri: photo }}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.detailText}>{person.id}</Text>
      </View>

    </View>
  )
}
