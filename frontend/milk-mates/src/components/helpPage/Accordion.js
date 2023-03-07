import React, { useEffect } from "react";


export default function Accordion(props) {
    useEffect(() => {
        console.log(props)
      }) 
    
    return (
        <div className="accordion">
            <h3>{props.question.Question}</h3>
            <p>{props.question.Answer}</p>
            <br></br>
        </div>
    )
}
