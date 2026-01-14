import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuthStore } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      navigate("/admin");
    } catch (err) {
      setError("Giriş bilgileri hatalı");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8">
        <h1 className="text-2xl font-heading font-semibold">Admin Girişi</h1>
        <p className="mt-2 text-sm text-black/60">Göre Medya Ajans yönetim paneli</p>
        <div className="mt-6 grid gap-4">
          <input
            className="rounded-lg border border-black/10 px-4 py-3 text-sm"
            placeholder="E-posta"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="rounded-lg border border-black/10 px-4 py-3 text-sm"
            placeholder="Şifre"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="text-xs text-red-500">{error}</p> : null}
          <button className="button-primary" type="submit">
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
}
