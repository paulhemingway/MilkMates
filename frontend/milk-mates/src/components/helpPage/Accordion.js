import React, { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi" 

export default function Accordion(props) {
    useEffect(() => {
        console.log(props)
      }) 
    
      const [open, setOpen] = useState(false)

      const toggleOpen = () => {
        setOpen(!open)

      }
    return (
        <div className = "accordion" onClick = {toggleOpen}>
            <div className={open ? 'question open' : 'question'} >
                <h3>{props.question.Question}</h3>
                <FiChevronDown />
            </div>
            <div className = {open ? 'answer open' : 'answer'} >
                <p>{props.question.Answer}</p>

            </div>
        </div>
    )

    
}
