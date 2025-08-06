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

// @mui material components
import { Margin } from "@mui/icons-material";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h4" fontWeight="medium">
          Information sur les vendeurs
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            nom="oliver liam"
            abonnement="viking burrito"
            email="oliver@burrito.com"
            montant="FRB1235476"
          />
          <Bill
            nom="lucas harper"
            abonnement="stone tech zone"
            email="lucas@stone-tech.com"
            montant="FRB1235476"
          />
          <Bill
            nom="ethan james"
            abonnement="fiber notion"
            email="ethan@fiber.com"
            montant="FRB1235476"
            noGutter
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
