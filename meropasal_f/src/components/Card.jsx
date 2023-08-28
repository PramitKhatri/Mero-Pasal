import React from 'react'

const Card = (props) => {
  return (
    <div className='card'>
      <div className="card-image"><img src={props.item.product_image} alt="img" /></div>
      <div className="card-desc">
        <h1>{props.item.product_name}</h1>
        <p>{props.item.price}</p>
      </div>
    </div>
  )
}

export default Card