import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk, loginThunk } from "../store/authSlice";

const AuthForm = ({ page }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const text = page === "signup" ? "Sign Up" : "Login";
  const authThunk = page === "signup" ? signupThunk : loginThunk;

  return (
    <div className="authFormContainer">
      <h1>{text}</h1>
      <input type="text" placeholder="Username" name="username" ref={usernameRef} />
      <input type="password" placeholder="Password" name="password" ref={passwordRef} />
      <div className="authFormButtons">
        <button
          onClick={() => dispatch(
            authThunk({
              username: usernameRef.current.value,
              password: passwordRef.current.value
            })
          ).then(() => navigate(page === "signup" ? "/login" : "/"))}
        >
          {text}
        </button>
        <button onClick={() => navigate(page === "signup" ? "/login" : "/signup")}>
          {page === "signup" ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  )
}

export default AuthForm