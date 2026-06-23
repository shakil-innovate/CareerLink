import { useState } from "react";
import { Briefcase } from "lucide-react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "../styles/Auth.css";

export default function Auth() {
  const [tab, setTab] = useState("signin");

  return (
    <div className="auth-page">
      <div className="auth-wrapper">

        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <Briefcase size={20} />
          </div>
          <h1>Job Portal</h1>
          <p>Find your next opportunity</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "signin" ? "active" : ""}`}
            onClick={() => setTab("signin")}
          >
            Sign in
          </button>
          <button
            className={`auth-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => setTab("signup")}
          >
            Sign up
          </button>
        </div>

        {/* Card */}
        <div className="auth-card">
          {tab === "signin" ? (
            <SignIn onSwitch={() => setTab("signup")} />
          ) : (
            <SignUp onSwitch={() => setTab("signin")} />
          )}
        </div>

      </div>
    </div>
  );
}