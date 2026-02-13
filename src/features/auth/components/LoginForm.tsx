import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import { routes } from "../../../routes";

export default function LoginForm() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ login: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation côté client (évite les 500 sur formulaire vide)
    if (!login.trim() || !password.trim()) {
      setError("username et password sont requis");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.username({
        username: login.trim(),
        password,
      });

      if (error) {
        if (error.status === 401 || error.status === 403) {
          setError(error.message ?? "Identifiants invalides");
        } else {
          setError(error.message ?? `Erreur serveur (${error.status})`);
        }
        return;
      }

      if (data) {
        navigate(routes.adminUsers);
      } else {
        setError("Aucune donnée reçue du serveur");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible de contacter le serveur. Vérifiez votre connexion."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
          <p className="text-gray-500 text-sm">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Champs du formulaire */}
        <div className="space-y-6">
          {/* Champ Login */}
          <div className="relative">
            <label
              htmlFor="login"
              className={`absolute left-4 transition-all duration-200 ${
                isFocused.login
                  ? "top-2 text-xs text-indigo-600 font-semibold"
                  : "top-4 text-sm text-gray-500"
              }`}
            >
              Login
            </label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, login: true })}
              onBlur={(e) =>
                setIsFocused({
                  ...isFocused,
                  login: e.target.value.length > 0,
                })
              }
              className="w-full pt-6 pb-2 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
              
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-4 transition-all duration-200 ${
                isFocused.password
                  ? "top-2 text-xs text-indigo-600 font-semibold"
                  : "top-4 text-sm text-gray-500"
              }`}
            >
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={(e) =>
                  setIsFocused({
                    ...isFocused,
                    password: e.target.value.length > 0,
                  })
                }
                className="w-full pt-6 pb-2 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400"
                placeholder="Votre mot de passe"
                
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                aria-label="Afficher le mot de passe"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          {/* Lien mot de passe oublié */}
          <div className="flex items-center justify-end">
            <Link
              to={routes.forgetedPassword}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
