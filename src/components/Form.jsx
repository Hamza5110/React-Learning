import { useRef, useState } from 'react'

export default function Form() {
    console.log("Component re-rendereding")
    const [name, setname] = useState("")
    const inputRef = useRef(null)
    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log("Form submitted" + " " + inputRef.current.value)
        setname(inputRef.current.value)
    }
  return ( 
    <form onSubmit={handleSubmit}>
        {/* <input type="email" placeholder='Enter your email' /> */}
        {/* <input type="password" placeholder='Enter your password' /> */}
        {/* <input type="text" placeholder='Enter your name' onChange={(e)=>setname(e.target.value)}/> */}
        <input type="text" placeholder='Enter your name' ref={inputRef}/>
        <button type='submit'>Submit</button>
        <p>{name}</p>
    </form>
  )
}
