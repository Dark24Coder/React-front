import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const [showUploader, setShowUploader] = useState(false);
  const [fichier, setFichier] = useState(null);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const toggleUploader = () => {
    setShowUploader(!showUploader);
    setFichier(null);
  };

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!fichier) return alert("Aucun fichier sélectionné");

    const formData = new FormData();
    formData.append("fichier", fichier);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert("Fichier envoyé avec succès !");
      setShowUploader(false);
      setFichier(null);
    } catch (err) {
      console.error("Erreur d’envoi :", err);
      alert("Erreur lors de l’envoi du fichier");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5" mb={2} padding="20px">
                  Importer un fichier
                </MDTypography>

                {!showUploader ? (
                  <MDBox display="flex" justifyContent="center">
                    <MDButton variant="gradient" color="toi" onClick={toggleUploader}>
                      Ajouter
                    </MDButton>
                  </MDBox>
                ) : (
                  <MDBox
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    mt={2}
                  >
                    <label htmlFor="upload-file">
                      <MDButton
                        variant="outlined"
                        component="span"
                        color="toi"
                        style={{ border: "none", fontSize: "15px", marginLeft: "10px" }}
                      >
                        Choisir un fichier
                      </MDButton>
                      <input
                        id="upload-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </label>
                    {fichier && (
                      <MDTypography variant="button" color="text" ml={2}>
                        {fichier.name}
                      </MDTypography>
                    )}

                    <MDButton variant="gradient" color="moi" onClick={handleUpload}>
                      Ajouter
                    </MDButton>
                    <MDButton variant="outlined" color="secondary" onClick={toggleUploader}>
                      Annuler
                    </MDButton>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Notifications;
