
import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'

import { testDates, testDatesUpdate } from '../api/testRoutes'

import './dates.css'

const Dates = () => {
  const [date, setDate] = useState(moment())
  const [id, setId] = useState('')

  const [returnedDate, setReturnedDate] = useState([])
  const [loading, setLoading] = useState(false)
  const onDateChange = (createdAt) => {
    
    createdAt && setDate(createdAt)
  }

  const handleSubmit = () => {
 
    setLoading(true)
    testDates(date)
      .then(res => {
        setReturnedDate(res.data.dates)
        setId(res.data._id)
        setLoading(false)
      })
      .catch(err => console.log(err))
    
  }
  
  const addToDate = () => {
    setLoading(true)
    testDatesUpdate(date.add(1, "days"), id )
      .then(res => {
        setLoading(false)
        console.log(res.data.dates);
        setReturnedDate(res.data.dates)
      })
  }
  

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        ...returnedDate.map(date => new Date(moment(date).toDate()))
      ]
    }
  ];


  return (
    <div>
     <div className="container mx-auto text-center mb-5">
      <DatePicker 
          selected={date && new Date(date.toDate())}
          onChange={(date) => setDate(moment(date))}
          highlightDates={highlightWithRanges}
        />
     </div>
     <div className="text-center">
      <button onClick={handleSubmit}>Pretend this marks late</button>
      <button className="btn btn-success ml-5" onClick={addToDate}>Pretend this marks more dates as late</button>
     </div>
      
  {!loading && returnedDate && returnedDate.map(date => <p className="mx-auto text-center mt-4">The date you chose: {moment(date).format('YYYY/M/D')}</p>) }
      <p className="mx-auto text-center mt-5">Legend: <span className="legend-late"></span> Late  <span className="legend-absent"></span> Absent </p>
   
    </div>
  );
};

export default Dates;