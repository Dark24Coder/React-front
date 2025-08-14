/* eslint-disable react/no-unescaped-entities */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com
=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";

function Tables() {
  const { columns, rows } = authorsTableData();

  // Champs du formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [abon, setAbon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Membre à ajouter :", { nom, prenom, email });
    setNom("");
    setPrenom("");
    setEmail("");
    setLocalisation("");
    setAbon("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="white">
                  Liste des vendeurs (ses)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h4" color="text">
                  Ajouter un vendeur
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDTypography
                  variant="h5"
                  color="text"
                  mb={2}
                  textAlign="center"
                  marginTop="10px"
                  marginBottom="20px"
                >
                  Veuillez saisir les informations pour ajouter un nouveau vendeur
                </MDTypography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        fullWidth
                        variant="standard"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Prénom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        fullWidth
                        variant="standard"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        variant="standard"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Localisation"
                        value={localisation}
                        onChange={(e) => setLocalisation(e.target.value)}
                        fullWidth
                        variant="standard"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="date"
                        label="Abonnée depuis le"
                        value={abon}
                        onChange={(e) => setAbon(e.target.value)}
                        fullWidth
                        variant="standard"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} marginTop="20px">
                      <MDButton type="submit" variant="gradient" color="info">
                        Ajouter
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
