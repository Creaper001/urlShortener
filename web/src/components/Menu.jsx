import { useNavigate } from "react-router-dom";
import { Auth } from "../services/Auth";

export function Menu() {
  const navigate = useNavigate();

  function logout() {
    Auth.$().clear();
    navigate("/");
  }

  return (
    <nav className="flex items-center justify-between px-4 py-6 bg-teal-800">
      <div>
        <a href="/" className="text-xl text-white">
          URL Shortener
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <a
          onClick={logout}
          className="px-5 py-3 rounded-xl text-white bg-teal-600 hover:bg-teal-700 cursor-pointer"
        >
          Sair
        </a>
      </div>
    </nav>
  );
}
