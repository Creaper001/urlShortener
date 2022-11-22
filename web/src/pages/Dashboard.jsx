import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api";
import { Auth } from "../services/Auth";
import { Menu } from "../components/Menu";

export default function Login() {
  const navigate = useNavigate();
  const [link, Link] = useState("");
  const [urls, Urls] = useState([]);

  useEffect(() => {
    if (!Auth.$().isAuth()) navigate("/");
    get();
  }, []);

  async function get() {
    const { urls } = await Api.get("/urls");
    Urls(urls);
  }

  function copy(url) {
    const full = `${Api.host}/${url.userHashtag}/${url.id}`;
    navigator.clipboard.writeText(full);
  }

  async function add(e) {
    e.preventDefault();

    const { url } = await Api.post("/urls", {
      path: link,
    });

    Urls(($) => [...$, url]);
  }

  async function remove(id) {
    await Api.delete(`/urls/${id}`);

    Urls(($) => $.filter((url) => url.id !== id));
  }

  return (
    <div>
      <Menu />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-2xl mx-3">
          <div className="text-center mb-5">
            <h1 className="text-5xl uppercase font-bold text-white">
              URL Shortener
            </h1>
          </div>
          <div>
            <form onSubmit={add} className="flex justify-center">
              <input
                value={link}
                onChange={(e) => Link(e.target.value)}
                className="w-96 bg-teal-100 px-5 py-2 rounded-l-full placeholder-teal-400"
                type="text"
                placeholder="Digitar URL"
                required={true}
              />
              <button className="bg-teal-500 text-white px-5 rounded-r-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </form>
          </div>
          {urls.length > 0 ? (
            <div className="bg-white mt-5 p-4 rounded-lg shadow-lg">
              <div>
                <h1 className="text-lg font-bold mb-0 leading-none text-gray-800">
                  URL's
                </h1>
              </div>
              <div className="mt-3 overflow-y-auto max-h-80">
                <table className="w-full">
                  <thead>
                    <tr className="bg-teal-500 text-teal-50">
                      <th className="text-center p-2 rounded-tl-lg">#</th>
                      <th className="text-left p-2 w-full">URL</th>
                      <th className="text-left p-2 rounded-tr-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((url) => (
                      <tr
                        className="odd:bg-teal-100 even:bg-teal-50 text-teal-700"
                        key={url.id}
                      >
                        <td className="p-2 text-center">{url.id}</td>
                        <td className="p-2 text-left max-w-xs truncate">
                          {url.path}
                        </td>
                        <td className="p-2 text-left flex gap-2">
                          <button onClick={() => copy(url)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                              />
                            </svg>
                          </button>
                          <button onClick={() => remove(url.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
