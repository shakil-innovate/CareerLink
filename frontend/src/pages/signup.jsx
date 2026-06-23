import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { signupUser } from "../services/authService";

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  password: "",
  role: "",
};

export default function SignUp({ onSwitch }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isCompany = form.role === "company";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await signupUser(form);
      setSuccess(data.message);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Role selector */}
      <div className="field">
        <label>I am a</label>
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select your role</option>
          <option value="job_seeker">Job seeker</option>
          <option value="company">Company / Employer</option>
        </select>
      </div>

      {/* Company approval notice */}
      {isCompany && (
        <div className="company-notice">
          <Info size={15} />
          <span>
            Company accounts require admin approval before you can post jobs.
          </span>
        </div>
      )}

      {/* Name field — label changes based on role */}
      <div className="field">
        <label>{isCompany ? "Company name" : "Full name"}</label>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder={isCompany ? "Your company name" : "Your full name"}
          required
        />
      </div>

      {/* Email */}
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

      {/* Phone */}
      <div className="field">
        <label>Phone number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="01XXXXXXXXX"
          maxLength={11}
          required
        />
      </div>

      {/* Password */}
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

      {error && <p className="alert alert-error">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="switch-link">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </form>
  );
}       