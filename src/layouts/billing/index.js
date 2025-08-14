// @mui material components
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

function Billing() {
  const [vendeur, setVendeur] = useState("");
  const [typeAbon, setTypeAbon] = useState("");
  const [montant, setMontant] = useState("");
  const [vendeurs, setVendeurs] = useState([]);

  // Liste des vendeurs disponibles (à remplacer par API plus tard)
  const vendeursDisponibles = [
    { id: 1, nom: "Jean Dupont" },
    { id: 2, nom: "Fatou Ndiaye" },
    { id: 3, nom: "Koffi Kodjo" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const nouveauVendeur = {
      vendeur,
      typeAbon,
      montant,
    };

    setVendeurs([...vendeurs, nouveauVendeur]);

    // Reset des champs
    setVendeur("");
    setTypeAbon("");
    setMontant("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              {/* Formulaire d'ajout */}
              {/* <Grid item xs={12}>
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
                      Enregistrer un Abonnement
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
                      Veuillez saisir les informations pour enregistrer un abonnement
                    </MDTypography>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth variant="standard" required>
                            <InputLabel
                              id="vendeur-label"
                              sx={{
                                marginBottom: "-3px",
                                position: "relative",
                                transform: "none",
                              }}
                            >
                              Vendeur
                            </InputLabel>
                            <Select
                              labelId="vendeur-label"
                              id="vendeur-select"
                              value={vendeur}
                              onChange={(e) => setVendeur(e.target.value)}
                              label="Vendeur"
                            >
                              <MenuItem value="">
                                <em>-- Sélectionner un vendeur --</em>
                              </MenuItem>
                              {vendeursDisponibles.map((v) => (
                                <MenuItem key={v.id} value={v.nom}>
                                  {v.nom}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MDInput
                            type="text"
                            label="Type d'abonnement"
                            value={typeAbon}
                            onChange={(e) => setTypeAbon(e.target.value)}
                            fullWidth
                            variant="standard"
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <MDInput
                            type="text"
                            label="Montant"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                            fullWidth
                            variant="standard"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} marginTop={"20px"}>
                          <MDButton type="submit" variant="gradient" color="info">
                            Ajouter
                          </MDButton>
                        </Grid>
                      </Grid>
                    </form>
                  </MDBox>
                </Card>
              </Grid> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <Invoices /> */}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation vendeurs={vendeurs} />
            </Grid>
            <Grid item xs={12} md={5}>
              {/* <Transactions /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
