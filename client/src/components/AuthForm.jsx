import { useRef } from "react"

const AuthForm = ({ page }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      {page === "signup" ? <h1>Sign Up</h1> : <h1>Login</h1>}
      <input type="text" placeholder="Username" name="username" ref={usernameRef} />
      <input type="password" placeholder="Password" name="password" ref={passwordRef} />
      <button type="submit">{page}</button>
    </div>
  )
}

export default AuthForm