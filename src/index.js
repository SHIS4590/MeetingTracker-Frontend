import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Schedule from './Schedule'
import 'antd/dist/antd.css'

ReactDOM.render(
  <Router>
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/schedule" component={Schedule} />
    </div>
  </Router>,
  document.getElementById('root')
)
