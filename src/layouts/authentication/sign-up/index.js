/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Identifiants valides (à remplacer par une vraie vérification backend)
  const validCredentials = {
    email: "admin@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Vérification des champs vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    // Validation de l'email (format basique)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    // Vérification des conditions acceptées
    if (!acceptedTerms) {
      setError("Veuillez accepter les conditions d'utilisation");
      return;
    }

    setLoading(true);

    // Simulation de vérification (remplacez par un appel API)
    setTimeout(() => {
      if (email === validCredentials.email && password === validCredentials.password) {
        // Stockage du token (simulé)
        localStorage.setItem("authToken", "simulated-token");
        // Redirection vers le dashboard
        navigate("/dashboard");
      } else {
        setError("Email ou mot de passe incorrect");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Bienvenue
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Entrer votre email et votre mot de passe pour vous connecter
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} padding="50px">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <MDBox component="form" role="form" onSubmit={handleLogin}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Mot de passe"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;J’accepte&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                les conditions d’utilisation
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="moi"
                fullWidth
                type="submit"
                disabled={loading || !acceptedTerms}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
