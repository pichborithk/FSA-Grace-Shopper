import { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken, setUser } = useOutletContext()
  const navigate = useNavigate()

  const userLogin = async (ev) => {
    ev.preventDefault()
    console.log(email, password)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      )
      const result = await response.json()
      if (result.success) {
        const token = result.data.token
        setUser({
          name: result.data.name,
          email: result.data.email,
          type: result.data.type,
        })
        console.log(result)
        setToken(result.data.token)
        localStorage.setItem('token', result.data.token)
        navigate('/')
        toast.success('login!')
      }
      return result
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div id="login-form">
        <h1 className="registerHereTag">Login</h1>
        <form className="loginInputFields" onSubmit={userLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <img id="logoLogin" src="images/4.png" alt="Logo" />®
          <button className="submitLogin" type="submit">
            Login
          </button>
        </form>
        <p id="new-reg">
          New To Moodi Fashion?{' '}
          <Link className="registerLink" to={'/register'}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}
