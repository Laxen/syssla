import React from 'react'
import { useState, useRef } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'

export function App() {
  const dragItem = useRef()
  const dragOverItem = useRef()
  const [count, setCount] = useState(0)
  const [data, setData] = useState([
    {
      "title": "todo1",
      "labels": [
        "syssla",
        "wow",
      ]
    },
    {
      "title": "todo2",
      "labels": [
        "chore",
        "electronics",
      ]
    }
  ])

  const dragStart = (e) => {
    dragItem.current = e.target.id
    console.log("dragStart: ", e)
  }
  const dragEnter = (e) => {
    dragOverItem.current = e.currentTarget.id
  }
  const drop = () => {
    const copyListItems = [...data]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setData(copyListItems)
  }

  const row = data.map((item) => {
    return (
      <tr
        onDragStart = {(e) => dragStart(e)}
        onDragEnter = {(e) => dragEnter(e)}
        onDragEnd = {drop}
        draggable
      >
        <td>{item.title}</td>
        <td>{item.labels}</td>
      </tr>
    )
  })

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {React.Children.toArray(row)}
        </tbody>
      </table>
      {/* <div> */}
      {/*   <a href="https://vitejs.dev" target="_blank"> */}
      {/*     <img src={viteLogo} class="logo" alt="Vite logo" /> */}
      {/*   </a> */}
      {/*   <a href="https://preactjs.com" target="_blank"> */}
      {/*     <img src={preactLogo} class="logo preact" alt="Preact logo" /> */}
      {/*   </a> */}
      {/* </div> */}
      {/* <h1>Vite + Preact</h1> */}
      {/* <div class="card"> */}
      {/*   <button onClick={() => setCount((count) => count + 1)}> */}
      {/*     count is {count} */}
      {/*   </button> */}
      {/*   <p> */}
      {/*     Edit <code>src/app.tsx</code> and save to test HMR */}
      {/*   </p> */}
      {/* </div> */}
      {/* <p class="read-the-docs"> */}
      {/*   Click on the Vite and Preact logos to learn more */}
      {/* </p> */}
    </>
  )
}
