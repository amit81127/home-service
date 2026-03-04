import './Login.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

  return (
    <div className="login-container">
        <div className="login-form">
            <form action="/login" method="post">
                <h2>Login</h2>
                <div className="form-container">
                    <div>User Name</div>
                    <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange}/>
                    <div>Password</div>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                    <button className="login-btn" type="submit">Log In</button>
                    <div className="signup-text">Don't have a account <Link to='/Signup'>Sign Up Now</Link></div>
                </div>
            </form>
        </div>
    </div>   
  )
}

export default Login