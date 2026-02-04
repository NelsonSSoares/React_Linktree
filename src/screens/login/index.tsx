import { useState, type FormEvent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import {auth} from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
   if(email === "" || password === "") return;

   signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User logged in successfully");
      navigate("/admin", { replace: true });
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-1">
        <Input
          type="email"
          placeholder="Type your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-9 bg-blue-600 text-white border-0 text-lg font-medium rounded-md"
        >
          Access
        </button>
      </form>
    </div>
  );
}
