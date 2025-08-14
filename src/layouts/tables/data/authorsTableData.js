/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// React
import { useState } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Modal édition
function EditFormModal({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    title: user.title,
    description: user.description,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modifier {user.name}</DialogTitle>
      <DialogContent>
        <MDBox display="flex" flexDirection="column" gap={2} mt={1}>
          <MDInput
            label="Nom complet"
            value={formData.name}
            onChange={handleChange("name")}
            fullWidth
          />
          <MDInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            fullWidth
          />
          <MDInput
            label="Titre / Poste"
            value={formData.title}
            onChange={handleChange("title")}
            fullWidth
          />
          <MDInput
            label="Description"
            value={formData.description}
            onChange={handleChange("description")}
            fullWidth
          />
        </MDBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Fonction message (toast simple)
const showMessage = (message, type = "info") => {
  const messageDiv = document.createElement("div");
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 9999;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    ${
      type === "success"
        ? "background-color: #4caf50;"
        : type === "error"
        ? "background-color: #f44336;"
        : type === "warning"
        ? "background-color: #ff9800;"
        : "background-color: #2196f3;"
    }
  `;
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 300);
    }
  }, 3000);
};

export default function Data() {
  // État liste des vendeurs
  const [rows, setRows] = useState([
    {
      id: "1",
      image: team2,
      name: "John Michael",
      email: "john@creative-tim.com",
      title: "Manager",
      description: "Organization",
      employed: "23/04/18",
    },
    {
      id: "2",
      image: team3,
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      title: "Programator",
      description: "Developer",
      employed: "11/01/19",
    },
    {
      id: "3",
      image: team4,
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      title: "Executive",
      description: "Projects",
      employed: "19/09/17",
    },
    {
      id: "4",
      image: team3,
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      title: "Programator",
      description: "Developer",
      employed: "24/12/08",
    },
    {
      id: "5",
      image: team3,
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      title: "Manager",
      description: "Executive",
      employed: "04/10/21",
    },
    {
      id: "6",
      image: team4,
      name: "Miriam Eric",
      email: "miriam@creative-tim.com",
      title: "Programator",
      description: "Developer",
      employed: "14/09/20",
    },
  ]);

  // Modal édition ouvert ?
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Utilisateur en cours d'édition
  const [editUser, setEditUser] = useState(null);

  // Composants auxiliaires
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  // Ouvre la modale avec données utilisateur
  const handleEdit = (id) => {
    const user = rows.find((u) => u.id === id);
    if (!user) return;
    setEditUser(user);
    setEditModalOpen(true);
  };

  // Sauvegarde la modif dans l'état
  const handleSaveEdit = (updatedData) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === editUser.id ? { ...row, ...updatedData } : row))
    );
    showMessage(`${updatedData.name} a été modifié avec succès!`, "success");
  };

  // Suppression avec confirmation
  const handleDelete = (id) => {
    const user = rows.find((u) => u.id === id);
    if (!user) return;
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.name} ?`)) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      showMessage(`${user.name} a été supprimé avec succès!`, "success");
    }
  };

  // Boutons action pour chaque ligne
  const ActionButtons = ({ userId }) => {
    const user = rows.find((u) => u.id === userId);
    if (!user) return null;
    return (
      <MDBox display="flex" alignItems="center" gap={1}>
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          style={{ cursor: "pointer", marginRight: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            handleEdit(userId);
          }}
        >
          Edit
        </MDTypography>
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="error"
          fontWeight="medium"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            handleDelete(userId);
          }}
        >
          Supp
        </MDTypography>
      </MDBox>
    );
  };

  // Prépare les lignes au format attendu par la table
  const formattedRows = rows.map((user) => ({
    author: <Author image={user.image} name={user.name} email={user.email} />,
    function: <Job title={user.title} description={user.description} />,
    download: (
      <Button
        variant="contained"
        style={{ color: "#333" }}
        size="small"
        href={`http://localhost:3001/download/${user.id}`}
        target="_blank"
      >
        Télécharger
      </Button>
    ),
    employed: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {user.employed}
      </MDTypography>
    ),
    action: <ActionButtons userId={user.id} />,
  }));

  return {
    columns: [
      { Header: "vendeurs", accessor: "author", width: "45%", align: "left" },
      { Header: "Localisation", accessor: "function", align: "left" },
      { Header: "Slug", accessor: "download", align: "center" },
      { Header: "Abonnée depuis le", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: formattedRows,
  };
}
