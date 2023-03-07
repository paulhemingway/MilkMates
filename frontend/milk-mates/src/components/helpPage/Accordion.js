import React, { useEffect } from "react";


export default function Accordion(props) {
    useEffect(() => {
        console.log(props)
      }) 
    
    return (
        <div>
            {props.question.Question}
        </div>
    )
}
