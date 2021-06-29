import React from 'react'
import './calcKey.css'


export default props => 
    <button 
    onClick={e => props.click(e.target.innerHTML)}
    className={`
    button
    ${props.operation ? 'operation' : ''}
    ${props.double ? 'double' : ''}
    ${props.triple ? 'triple' : ''}
    `}>
        {props.label}
    </button>
