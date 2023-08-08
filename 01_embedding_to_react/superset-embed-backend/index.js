
import express from "express"
import fetch from 'node-fetch';
import cors from 'cors';

const PORT = 3001
const app = express()



app.use(cors({
    origin: ['http://localhost:3000','http://localhost']
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function fetchAccessToken() {
  try {
    const body = {
      
      password: "admin",
      provider: "db",
      refresh: true,
      username: "admin"
    }

    const response = await fetch(
      "http://localhost:8088/api/v1/security/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const jsonResponse = await response.json()
    return jsonResponse?.access_token
  } catch (e) {
    console.error(error)
  }
}

async function fetchGuestToken() {
  const accessToken = await fetchAccessToken()
  try {
    const body = {
      resources: [
        {
          type: "dashboard",
          id: "af2ec01e-a768-4d7f-9eb2-e0861d603e51",
        },
      ],
      //rls: [{"clause": "customer_id=4"}],
      rls: [],
      user: {
        username: "test",
        first_name: "test",
        last_name: "test",
      },
    }
    const response = await fetch(
      "http://localhost:8088/api/v1/security/guest_token",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    const jsonResponse = await response.json()
    return jsonResponse?.token
  } catch (error) {
    console.error(error)
  }
}

app.get("/gues-token", async (req, res) => {
  const token = await fetchGuestToken()
  res.json(token)
})
