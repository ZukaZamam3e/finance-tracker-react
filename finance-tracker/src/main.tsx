import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-3126h7e6syg2548p.us.auth0.com"
      clientId="FWAtgpgx8wPxWN4pVvjpgCVhwMYzqbgn"
      authorizationParams={{
        audience: "https://oaprojects-api.oaprojects.net",
        redirect_uri: window.location.origin,
        scope: "openid profile email offline_access",
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
