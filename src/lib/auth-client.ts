import { createAuthClient } from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

// Vide en dev = même origine, le proxy Vite redirige vers le backend (évite CORS)
const baseURL = import.meta.env.VITE_AUTH_API_URL ?? ""

// Better-auth utilise par défaut /api/auth comme chemin de base
// Si votre backend utilise un chemin différent, ajoutez-le ici
// Exemple: baseURL: "http://localhost:3000/api/auth"
export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [ usernameClient() ],
  fetchOptions: {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }
})