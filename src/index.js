import React from 'react';
import ReactDOM from 'react-dom';



//font-awesome incase you want to use it
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


import './index.css'

import App from './App';

//fas just loads all the icons LoL
library.add(fas)

ReactDOM.render(
     <App />
   ,
  document.getElementById('root')
);


