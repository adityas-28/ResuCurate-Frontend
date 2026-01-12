import React from "react";

function Login() {
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-950 focus-within:ring-indigo-500/60">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-2xl px-8 py-6 shadow-2xl focus-within:ring-indigo-500/60"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-800/50 ring-2 ring-cyan-900/50 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <circle
                cx="12"
                cy="8"
                r="5"
              /> <path d="M20 21a8 8 0 0 0-16 0" />{" "}
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none  "
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-gray-800/50 ring-2 ring-cyan-900/50 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
            <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-gray-800/50 ring-2 ring-cyan-900/50 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left">
          <button className="text-sm text-indigo-400 hover:underline">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition focus-within:ring-indigo-500/60 "
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer focus-within:ring-indigo-500/60"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-indigo-400 hover:underline ml-1">
            click here
          </span>
        </p>
      </form>
      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gray-950">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)",
          }}
        />
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-900/40 to-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-[400px] h-[300px] bg-gradient-to-bl from-indigo-800/30 to-blue-900/20 rounded-full blur-2xl" />
      </div>
    </div>
  );
}

export default Login;
