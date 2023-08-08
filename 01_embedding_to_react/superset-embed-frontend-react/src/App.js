//import logo from './logo.svg';
//import './App.css';
import { useEffect } from "react"
import { embedDashboard } from "@superset-ui/embedded-sdk"
import "./App.css"



function App() {
  const getToken = async () => {
    const response = await fetch("http://localhost:3001/gues-token")
    const token = await response.json()
    //const token ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjkwMTY5MjA3LCJqdGkiOiIzNWI0MGYxNi0xYzUxLTQ3MzEtYjQwYi1iZmIwNjI2NTllNDgiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2OTAxNjkyMDcsImV4cCI6MTY5MDE3MDEwN30.Ckps6buFBJiOUE88vc9kL4Wido5BPVtXNfatOuJB7rE"
    return token
  }

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "af2ec01e-a768-4d7f-9eb2-e0861d603e51", // given by the Superset embedding UI
        supersetDomain: "http://localhost:8088",
        mountPoint: document.getElementById("dashboard"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
      })
    }
    if (document.getElementById("dashboard")) {
    embed()
    }
  }, [])

  return (
    <div className="App">
      <h1>How to Embed Superset Dashboard into React</h1>
      <div id="dashboard" />
    </div>
  )
}

export default App
