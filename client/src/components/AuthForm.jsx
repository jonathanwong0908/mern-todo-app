import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk, loginThunk } from "../store/authSlice";

const AuthForm = ({ page }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonText = page === "signup" ? "Sign Up" : "Login";
  const authThunk = page === "signup" ? signupThunk : loginThunk;

  return (
    <div>
      {page === "signup" ? <h1>Sign Up</h1> : <h1>Login</h1>}
      <input type="text" placeholder="Username" name="username" ref={usernameRef} />
      <input type="password" placeholder="Password" name="password" ref={passwordRef} />
      <button
        onClick={() => dispatch(
          authThunk({
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
        ).then(() => navigate(page === "signup" ? "/login" : "/"))}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default AuthForm