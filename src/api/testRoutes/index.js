import axios from 'axios'

export const testDates = async (date, dateId) => {

  return await axios.post('http://localhost:3001/group7/datestest', { date })
}

export const testDatesUpdate = async (date = Date.now(), dateId) => {
  return await axios.put(`http://localhost:3001/group7/datestest/${dateId}`, { date })
}