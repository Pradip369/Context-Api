import './App.css';
import { createContext, useContext, useReducer, useState } from 'react';

const mycontext = createContext()

const initialState = {
  "name": "Click below button1",
  "name2": "Click below button2",
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        "name": action.payload,
      }
    case 'CHANGE_NAME2':
      return {
        ...state,
        "name2": action.payload,
      }
    default:
      return state
  }
}

const User1 = () => {
  const myname = useContext(mycontext)
  return (
    <div>
      <h1>{myname.state.name}</h1>
      <h1>{myname.state2.name2}</h1>
    </div>
  )
}
const User2 = () => {
  const myname = useContext(mycontext)
  return (
    <div>
      <h1>{myname.state.name}</h1>
      <h1>{myname.state2.name2}</h1>
    </div>
  )
}
const User3 = () => {
  const myname = useContext(mycontext)
  return (
    <div>
      <h1>{myname.state.name}</h1>
      <h1>{myname.state2.name2}</h1>
      <button onClick={myname.getName}>Change name1</button>
      <button onClick={myname.getName2}>Change name2</button>
    </div>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [state2, dispatch2] = useReducer(reducer, initialState)
  const [loder, setLoder] = useState(false)

  const url = 'https://jsonplaceholder.typicode.com/users'

  const getName = () => {
    setLoder(true)
    return fetch(url)
      .then(res => res.json())
      .then(res2 => {
        (dispatch({ type: 'CHANGE_NAME', payload: res2[1].name }))
        setLoder(false)
      })
  }
  const getName2 = () => {
    setLoder(true)
    return fetch(url)
      .then(res => res.json())
      .then(res2 => {
        (dispatch2({ type: 'CHANGE_NAME2', payload: res2[2].name }))
        setLoder(false)
      })
  }
  return (
    <mycontext.Provider value={{ 'getName': getName, 'getName2': getName2, 'state': state, 'state2': state2 }}>
      <div className='App'>
        <h1>{loder && "Data Fetching....."}</h1>

        <h2>Name1 : {state.name}</h2>
        <h2>Name2 : {state2.name2}</h2>
        <button onClick={() => getName()}>Change name1</button>
        <button onClick={() => getName2()}>Change name2</button>
        <User1 />
        <User2 />
        <User3 />
        <br /><br />
      </div>
    </mycontext.Provider >
  );
}

export default App;