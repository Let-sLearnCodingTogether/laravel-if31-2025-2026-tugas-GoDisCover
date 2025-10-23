import React from 'react'
import { NavLink } from 'react-router'

export default function createTask() {
  return (
    <div><NavLink to="/home">
            <button>back</button>
    </NavLink></div>
  )
}
