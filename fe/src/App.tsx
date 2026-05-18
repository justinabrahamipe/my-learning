import { useEffect,useState } from 'react'
import './App.css'

function App() {

const [apiOutput,setApiOutput]=useState("null");
useEffect(()=>{fetch('/api/').then(response=>response.json()).then(response=>{setApiOutput(response.data)})},[]);
  return (
    <>
    <section id="next-steps">
      <h1>The output from api: </h1>
      <h2>{apiOutput}</h2>
    </section>
    </>
  )
}

export default App
