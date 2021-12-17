
import React from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'


//date prop must be a moment object
//highlight with ranges configures what dates to highlight

const Dates = ({ date, setDate, highlightWithRanges }) => {
  
  return (
      <DatePicker 
          selected={date && new Date(date.toDate())}
          onChange={(date) => setDate(moment(date))}
          highlightDates={highlightWithRanges}
        />
  );
};

export default Dates;