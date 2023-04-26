import * as React from 'react'
import {
    leftColumn
  } from './layoutRecipe.module.css'

export default function ColLeft({ children }) {
    return (
        <div className="lCol" style={ leftColumn }>
            { children }  
        </div>
    )
}