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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%", width: "350px" }}>
      {/* <MDBox pt={3} px={3}>
        <MDTypography variant="h2" fontWeight="medium">
          Crédit
        </MDTypography>
      </MDBox> */}
      {/* <MDBox p={2} sx={{ marginTop: "20px" }}>
        <TimelineItem
          color="success"
          icon="download"
          title="Minimum de recharge"
          dateTime="1000 XOF"
        />
        <TimelineItem
          color="error"
          icon="Percent"
          title="Taux de commission prépayé"
          dateTime="10%"
        />
        <TimelineItem
          color="info"
          icon="Leaderboard"
          title="Quota de vente restant"
          dateTime="O XOF"
        />
        <TimelineItem
          color="warning"
          icon="EventIcon"
          title="Validité quota"
          dateTime="20 DEC 2:20 AM"
        />
      </MDBox> */}
    </Card>
  );
}

export default OrdersOverview;
