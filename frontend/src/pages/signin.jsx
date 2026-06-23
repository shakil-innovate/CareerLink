import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signinUser } from "../services/authService";

export default function SignIn({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await signinUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // TODO: replace with react-router redirect when routing is added
      alert(`Welcome back, ${data.user.full_name}!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="field">
        <label>Password</label>
        <div className="input-icon-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <div className="forgot-link">
        <a href="#">Forgot password?</a>
      </div>

      {error && <p className="alert alert-error">{error}</p>}

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="switch-link">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Sign up
        </button>
      </p>
    </form>
  );
}