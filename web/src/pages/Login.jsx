import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api";
import { Auth } from "../services/Auth";
import { Menu } from "../components/Menu";

export default function Login() {
  const navigate = useNavigate();
  const [email, Email] = useState("");
  const [password, Password] = useState("");

  useEffect(() => {
    if (Auth.$().isAuth()) navigate("/dashboard");
  }, []);

  async function submit(e) {
    e.preventDefault();

    const { token } = await Api.post("/auth", {
      email: email,
      password: password,
    });

    Auth.$().set(token);
    navigate("/dashboard");
  }

  return (
    <div>
      <Menu />
      <div className="p-10 lg:p-20 text-center">
        <h1 className="text-3xl lg:text-6xl text-white">Entrar</h1>
      </div>
      <form onSubmit={submit} className="lg:w-1/4 px-4 mx-auto">
        <div className="mb-5">
          <label className="text-white">E-mail</label>
          <input
            value={email}
            onChange={(e) => Email(e.target.value)}
            type="text"
            id="email"
            className="w-full mt-2 px-4 py-2 rounded-xl"
            required={true}
          />
        </div>
        <div className="mb-5">
          <label className="text-white">Senha</label>

          <input
            value={password}
            onChange={(e) => Password(e.target.value)}
            type="password"
            id="password"
            className="w-full mt-2 px-4 py-2 rounded-xl"
            required={true}
          />
        </div>
        <button className="px-5 py-3 rounded-xl text-white bg-teal-800 hover:bg-teal-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
