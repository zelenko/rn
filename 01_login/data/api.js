
// get list of members
export function membersAPI () {
  return fetch('https://api.meetup.com/Greenville-Spartanburg-Developers-Guild/events/qkcnglyzlbbc/rsvps?&sign=true&photo-host=public', {
    headers: {
      Cache: 'no-cache'
    },
    method: 'GET'
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .catch(function (res) {
      console.log('catch:', res)
      return ['not', 'found', res.message]
    })
}
