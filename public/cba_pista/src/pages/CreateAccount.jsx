// pages/CreateAccount.jsx
import { useState } from 'react';

const ROLES = ['Administrador', 'Auditor', 'Publico'];

const FIELDS = [
  { name: 'first_name',   label: 'First name',   type: 'text',     placeholder: 'John' },
  { name: 'second_name',  label: 'Last name',     type: 'text',     placeholder: 'Doe' },
  { name: 'users_name',   label: 'Username',      type: 'text',     placeholder: 'johndoe' },
  { name: 'email',        label: 'Email',         type: 'email',    placeholder: 'john@example.com' },
  { name: 'password',     label: 'Password',      type: 'password', placeholder: '········' },
];

export default function CreateAccount() {

    const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};


  const [form, setForm] = useState({
    first_name: '', second_name: '', users_name: '',
    email: '', password: '', user_rol: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${getBaseUrl()}/api/auth/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      } else {
        setStatus({ type: 'success', message: 'Account created successfully.' });
        setForm({ first_name: '', second_name: '', users_name: '', email: '', password: '', user_rol: '' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Could not reach the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-wrapper">
      <div className="ca-card">

        <div className="ca-header">
          <span className="ca-eyebrow">Manager only</span>
          <h1 className="ca-title">Create account</h1>
          <p className="ca-subtitle">New users get immediate access after creation.</p>
        </div>

        <form className="ca-form" onSubmit={handleSubmit} noValidate>

          <div className="ca-grid">
            {FIELDS.map(({ name, label, type, placeholder }) => (
              <div className="ca-field" key={name}>
                <label htmlFor={name} className="ca-label">{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className="ca-input"
                  required
                  autoComplete={type === 'password' ? 'new-password' : 'off'}
                />
              </div>
            ))}

            <div className="ca-field">
              <label htmlFor="user_rol" className="ca-label">Role</label>
              <select
                id="user_rol"
                name="user_rol"
                value={form.user_rol}
                onChange={handleChange}
                className="ca-input ca-select"
                required
              >
                <option value="" disabled>Select a role…</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {status.message && (
            <p className={`ca-feedback ca-feedback--${status.type}`}>
              {status.message}
            </p>
          )}

          <button type="submit" className="ca-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>

        </form>
      </div>
    </div>
  );
}
