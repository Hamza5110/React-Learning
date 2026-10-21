// import React from 'react'

// function Event() {
//     const handleClick = ()=> {
//         alert("Button clicked")
//     }
//   return (
//     <div>
//         <button onClick={handleClick}>Click me</button>
//     </div>
//   )
// }

// export default Event


export default function Event() {
    const handleMouseMove = (e)=> {
        // console.log(e.clientX, e.clientY)
        alert("Mouse moved")
    }
  return (
    <div onMouseMove={handleMouseMove}>Mouse Move Here</div>
  )
}
