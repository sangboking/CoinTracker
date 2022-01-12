import React from 'react'
import { useParams } from 'react-router-dom'

interface Params {
  coinId : string
}

export default function Coin() {
  const {coinId}:Params = useParams();
  
  return (
    <div>
      <h1>Coin</h1>
    </div>
  )
}
