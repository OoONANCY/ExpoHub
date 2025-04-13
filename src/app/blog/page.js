"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [values, setValues] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", values);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const root = document.documentElement;
      root.style.setProperty("--mouse-x", `${e.clientX}px`);
      root.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Tron Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none tron-grid" />

      {/* Tron-Styled Login Box */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="tron-box px-8 py-10 w-96">
          <h2 className="text-4xl text-cyan-400 text-center font-bold mb-6">VITality⁺</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-cyan-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="tron-input"
                onChange={handleChanges}
                value={values.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-cyan-300 font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="tron-input"
                onChange={handleChanges}
                value={values.password}
              />
            </div>
            <button className="w-full neon-button">Submit</button>
          </form>
          <div className="text-center mt-6 text-cyan-400">
            <span>Don't have an account?</span>
            <a href="/register" className="text-cyan-300 underline ml-1 hover:text-white">Signup</a>
          </div>
        </div>
      </div>

      {/* Tron Theme Styles */}
      <style jsx>{`
        .tron-grid {
          background-image:
            linear-gradient(to right, rgba(0, 255, 255, 0.25) 3px, transparent 3px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.25) 3px, transparent 3px);
          background-size: 30px 30px;
        }

        .tron-grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(0, 255, 255, 0.4),
            transparent 150px
          );
          pointer-events: none;
          z-index: 1;
        }

        .tron-box {
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px solid cyan;
          border-radius: 12px;
          box-shadow: 0 0 20px cyan, 0 0 60px rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(12px);
        }

        .tron-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background-color: rgba(0, 0, 0, 0.6);
          border: 2px solid cyan;
          border-radius: 8px;
          color: cyan;
          outline: none;
          transition: box-shadow 0.2s, border-color 0.2s;
        }

        .tron-input:focus {
          box-shadow: 0 0 12px cyan;
          border-color: white;
        }

        .neon-button {
          background-color: black;
          border: 2px solid cyan;
          color: cyan;
          padding: 0.5rem;
          border-radius: 8px;
          font-weight: bold;
          transition: background-color 0.3s, box-shadow 0.3s;
        }

        .neon-button:hover {
          background-color: cyan;
          color: black;
          box-shadow: 0 0 16px cyan, 0 0 32px cyan;
        }
      `}</style>
    </div>
  );
}
