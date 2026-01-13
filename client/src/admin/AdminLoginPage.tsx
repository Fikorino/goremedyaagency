import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError("Giriş bilgileri hatalı.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black/5">
      <form onSubmit={handleSubmit} className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-bold">Admin Giriş</h1>
        <p className="mt-2 text-sm text-black/70">Yönetim paneline erişmek için giriş yapın.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label">E-posta</label>
            <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div>
            <label className="label">Şifre</label>
            <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button type="submit" className="button-primary mt-6 w-full">Giriş Yap</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
