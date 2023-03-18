import React, { Component } from 'react'
import loading from './loading.gif'
// eslint-disable-next-line
export default class  extends Component {
 
  render() {
    return (
      <div className='text-center'>
        <img  src={loading} alt="loading..." />
      </div>
    )
  }
}

