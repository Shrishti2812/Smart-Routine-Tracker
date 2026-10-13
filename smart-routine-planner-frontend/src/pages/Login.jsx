import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
function Login(){
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [error, setError] =  useState("");
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
e.preventDefault();
setError("");
try{
  const response=await api.post("/user/login",{email,password});
localStorage.setItem("token", response.data.token);
  navigate("/");
}catch(error){
setError( error.response?.data?.message || "Signup failed. Please try again.");
    }}
    return (
         <main className="mt-14 flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-[#e2eee0] via-[#f5f7ef] to-[#d5e9df] px-4 py-8">
      <section className="w-full max-w-sm rounded-xl border border-[#b3ccb0] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(49,112,66,0.6)] sm:p-7">
        <header className="mb-4 text-center">
          
          <h1 className="text-2xl font-bold tracking-tight text-[#172b21]">Login</h1>
        </header>

        <form className="space-y-3" onSubmit={handleSubmit} >
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
      
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email} onChange={(e)=>setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#37864f] focus:ring-4 focus:ring-[#e2eee0]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Choose a password"
                value={password} onChange={(e)=>setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#37864f] focus:ring-4 focus:ring-[#e2eee0]"
              />

              <p className="mt-1.5 text-xs text-slate-400">
                Use at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#286c43] py-2 text-sm font-semibold text-white transition hover:bg-[#245d3b] focus:outline-none focus:ring-4 focus:ring-[#e2eee0]"
            >
              Sign in
            </button>
        </form>

        <div className="mt-5 border-t border-slate-100 pt-4 text-center">
          <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#286c43] transition hover:text-[#245d3b]"
              >
                Sign up
              </Link>
          </p>
        </div>
      </section>
    </main>
    )
}
export default Login;