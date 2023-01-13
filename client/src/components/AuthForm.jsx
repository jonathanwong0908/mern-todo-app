import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupThunk, loginThunk } from "../store/authSlice";

const AuthForm = ({ page }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(store => store.auth.isAuthenticated);

  const buttonText = page === "signup" ? "Sign Up" : "Login";

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated, navigate])

  return (
    <div>
      {page === "signup" ? <h1>Sign Up</h1> : <h1>Login</h1>}
      <input type="text" placeholder="Username" name="username" ref={usernameRef} />
      <input type="password" placeholder="Password" name="password" ref={passwordRef} />
      <button
        onClick={() => dispatch(
          page === "signup"
            ? signupThunk({
              username: usernameRef.current.value,
              password: passwordRef.current.value
            })
            : loginThunk({
              username: usernameRef.current.value,
              password: passwordRef.current.value
            })
        ).then(() => {
          navigate(page === "signup" ? "/login" : "/")
        })}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default AuthForm