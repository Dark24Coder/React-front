/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function AbonnementPage() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // États pour la gestion des abonnements
  const [abonnements, setAbonnements] = useState([]);
  const [vendeurs, setVendeurs] = useState([]);
  const [newAbonnement, setNewAbonnement] = useState({
    vendeurId: "",
    abonnement: "",
    email: "",
    montant: "",
  });

  // États pour les modals
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddVendeurModal, setOpenAddVendeurModal] = useState(false);
  const [currentAbonnement, setCurrentAbonnement] = useState(null);
  const [editForm, setEditForm] = useState({
    vendeurId: "",
    abonnement: "",
    email: "",
    montant: "",
  });
  const [newVendeur, setNewVendeur] = useState({
    nom: "",
    email: "",
    telephone: "",
  });

  // Charger les vendeurs au démarrage (simulé - à remplacer par un appel API)
  useEffect(() => {
    // Simulation de données de vendeurs existants
    const vendeursSimules = [
      { id: 1, nom: "Jean Dupont", email: "jean@example.com", telephone: "123456789" },
      { id: 2, nom: "Marie Martin", email: "marie@example.com", telephone: "987654321" },
      { id: 3, nom: "Pierre Durand", email: "pierre@example.com", telephone: "456789123" },
    ];
    setVendeurs(vendeursSimules);
  }, []);

  // Fonctions pour le formulaire principal
  const handleFormChange = (field, value) => {
    setNewAbonnement((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAbonnement = (e) => {
    e.preventDefault();
    if (
      newAbonnement.vendeurId &&
      newAbonnement.email &&
      newAbonnement.abonnement &&
      newAbonnement.montant
    ) {
      const vendeur = vendeurs.find((v) => v.id === newAbonnement.vendeurId);
      setAbonnements((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...newAbonnement,
          vendeurNom: vendeur ? vendeur.nom : "Vendeur inconnu",
        },
      ]);
      setNewAbonnement({ vendeurId: "", abonnement: "", email: "", montant: "" });
    }
  };

  // Fonctions pour les modals d'édition
  const handleOpenEditModal = (abonnement) => {
    setCurrentAbonnement(abonnement);
    setEditForm({
      vendeurId: abonnement.vendeurId,
      abonnement: abonnement.abonnement,
      email: abonnement.email,
      montant: abonnement.montant,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentAbonnement(null);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    if (currentAbonnement) {
      const vendeur = vendeurs.find((v) => v.id === editForm.vendeurId);

      setAbonnements((prev) =>
        prev.map((ab) =>
          ab.id === currentAbonnement.id
            ? {
                ...ab,
                ...editForm,
                vendeurNom: vendeur ? vendeur.nom : "Vendeur inconnu",
              }
            : ab
        )
      );
      handleCloseEditModal();
    }
  };

  // Fonctions pour la suppression
  const handleOpenDeleteModal = (abonnement) => {
    setCurrentAbonnement(abonnement);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCurrentAbonnement(null);
  };

  const handleConfirmDelete = () => {
    if (currentAbonnement) {
      setAbonnements((prev) => prev.filter((ab) => ab.id !== currentAbonnement.id));
      handleCloseDeleteModal();
    }
  };

  // Fonctions pour l'ajout de vendeur
  const handleOpenAddVendeurModal = () => {
    setOpenAddVendeurModal(true);
  };

  const handleCloseAddVendeurModal = () => {
    setOpenAddVendeurModal(false);
    setNewVendeur({ nom: "", email: "", telephone: "" });
  };

  const handleVendeurFormChange = (field, value) => {
    setNewVendeur((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddVendeur = (e) => {
    e.preventDefault();
    if (newVendeur.nom && newVendeur.email && newVendeur.telephone) {
      const nouvelId = Math.max(...vendeurs.map((v) => v.id), 0) + 1;
      setVendeurs((prev) => [...prev, { id: nouvelId, ...newVendeur }]);
      handleCloseAddVendeurModal();
    }
  };

  // Calcul des statistiques
  const totalRevenue = abonnements.reduce((total, ab) => {
    const montant = parseFloat(ab.montant.replace("€", "").replace(",", "."));
    return total + (isNaN(montant) ? 0 : montant);
  }, 0);

  const abonnementTypes = [...new Set(abonnements.map((ab) => ab.abonnement))];

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Formulaire d'ajout */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: "100%" }}>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Enregistrer un abonnement
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <form onSubmit={handleAddAbonnement}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Vendeur</InputLabel>
                        <Select
                          value={newAbonnement.vendeurId}
                          label="Vendeur"
                          onChange={(e) => handleFormChange("vendeurId", e.target.value)}
                        >
                          {vendeurs.map((vendeur) => (
                            <MenuItem key={vendeur.id} value={vendeur.id}>
                              {vendeur.nom}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <MDBox mt={1}>
                        <MDButton
                          variant="text"
                          color="info"
                          size="small"
                          onClick={handleOpenAddVendeurModal}
                        >
                          + Ajouter un vendeur
                        </MDButton>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        label="Type d'abonnement"
                        value={newAbonnement.abonnement}
                        onChange={(e) => handleFormChange("abonnement", e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        type="email"
                        label="Email"
                        value={newAbonnement.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDInput
                        label="Montant (Fcfa)"
                        value={newAbonnement.montant}
                        onChange={(e) => handleFormChange("montant", e.target.value)}
                        fullWidth
                        required
                        placeholder="ex: 5000"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDButton type="submit" variant="gradient" color="success" fullWidth>
                        Enregistrer l’abonnement
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              </MDBox>
            </Card>
          </Grid>

          {/* Section statistiques */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: "100%" }}>
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
                <MDTypography variant="h6" color="white">
                  Statistiques
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDBox mb={3}>
                  <MDTypography variant="h6">Total Abonnements: {abonnements.length}</MDTypography>
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography variant="h6">
                    Revenus Totaux: {totalRevenue.toLocaleString()} Fcfa
                  </MDTypography>
                </MDBox>
                <MDBox mb={3}>
                  <MDTypography variant="h6">Total Vendeurs: {vendeurs.length}</MDTypography>
                </MDBox>
                <MDBox>
                  <MDTypography variant="h6" mb={2}>
                    Types d’abonnements:
                  </MDTypography>
                  {abonnementTypes.length > 0 ? (
                    abonnementTypes.map((type) => (
                      <MDTypography key={type} variant="body2" mb={1}>
                        {type}: {abonnements.filter((ab) => ab.abonnement === type).length}
                      </MDTypography>
                    ))
                  ) : (
                    <MDTypography variant="body2" color="text">
                      Aucun type d’abonnement enregistré
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {/* Liste des abonnements */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <MDTypography variant="h6" color="white">
                  Liste des Abonnements ({abonnements.length})
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                {abonnements.length > 0 ? (
                  <MDBox component="ul" p={0} m={0} sx={{ listStyle: "none" }}>
                    {abonnements.map((abonnement) => (
                      <MDBox
                        key={abonnement.id}
                        component="li"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        bgColor={darkMode ? "transparent" : "grey-100"}
                        borderRadius="lg"
                        p={3}
                        mb={2}
                        sx={{
                          border: darkMode
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.1)",
                        }}
                      >
                        <MDBox width="100%">
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                          >
                            <MDTypography variant="h6" fontWeight="medium">
                              {abonnement.vendeurNom}
                            </MDTypography>
                            <MDBox display="flex">
                              <MDButton
                                variant="text"
                                color={darkMode ? "white" : "dark"}
                                onClick={() => handleOpenEditModal(abonnement)}
                              >
                                <Icon>edit</Icon>
                              </MDButton>
                              <MDButton
                                variant="text"
                                color="error"
                                onClick={() => handleOpenDeleteModal(abonnement)}
                              >
                                <Icon>delete</Icon>
                              </MDButton>
                            </MDBox>
                          </MDBox>
                          <MDTypography variant="body2" mb={0.5}>
                            Abonnement: {abonnement.abonnement}
                          </MDTypography>
                          <MDTypography variant="body2" mb={0.5}>
                            Email: {abonnement.email}
                          </MDTypography>
                          <MDTypography variant="body2" fontWeight="medium" color="success">
                            Montant: {abonnement.montant} Fcfa
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    ))}
                  </MDBox>
                ) : (
                  <MDBox textAlign="center" py={6}>
                    <MDTypography variant="h5" color="text" mb={2}>
                      Aucun abonnement enregistré
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Ajoutez votre premier abonnement en utilisant le formulaire ci-dessus
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {/* Modal d'édition */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <MDTypography variant="h5">Modifier l’abonnement</MDTypography>
        </DialogTitle>
        <DialogContent>
          <MDBox p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Vendeur</InputLabel>
                  <Select
                    value={editForm.vendeurId}
                    label="Vendeur"
                    onChange={(e) => handleEditFormChange("vendeurId", e.target.value)}
                  >
                    {vendeurs.map((vendeur) => (
                      <MenuItem key={vendeur.id} value={vendeur.id}>
                        {vendeur.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Abonnement"
                  value={editForm.abonnement}
                  onChange={(e) => handleEditFormChange("abonnement", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  type="email"
                  label="Email"
                  value={editForm.email}
                  onChange={(e) => handleEditFormChange("email", e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Montant"
                  value={editForm.montant}
                  onChange={(e) => handleEditFormChange("montant", e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseEditModal} color="secondary">
            Annuler
          </MDButton>
          <MDButton onClick={handleSaveChanges} color="info">
            Enregistrer
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Modal de suppression */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          <MDTypography variant="h5" color="error">
            Confirmer la suppression
          </MDTypography>
        </DialogTitle>
        <DialogContent>
          <MDTypography>
            Êtes-vous sûr de vouloir supprimer l’abonnement de {currentAbonnement?.vendeurNom} ?
          </MDTypography>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDeleteModal} color="secondary">
            Annuler
          </MDButton>
          <MDButton onClick={handleConfirmDelete} color="error">
            Supprimer
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Modal d'ajout de vendeur */}
      <Dialog
        open={openAddVendeurModal}
        onClose={handleCloseAddVendeurModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <MDTypography variant="h5">Ajouter un nouveau vendeur</MDTypography>
        </DialogTitle>
        <DialogContent>
          <MDBox p={2}>
            <form onSubmit={handleAddVendeur}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MDInput
                    label="Nom complet"
                    value={newVendeur.nom}
                    onChange={(e) => handleVendeurFormChange("nom", e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDInput
                    type="email"
                    label="Email"
                    value={newVendeur.email}
                    onChange={(e) => handleVendeurFormChange("email", e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDInput
                    label="Téléphone"
                    value={newVendeur.telephone}
                    onChange={(e) => handleVendeurFormChange("telephone", e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </form>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseAddVendeurModal} color="secondary">
            Annuler
          </MDButton>
          <MDButton onClick={handleAddVendeur} color="success">
            Ajouter le vendeur
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default AbonnementPage;
