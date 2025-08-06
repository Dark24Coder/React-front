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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Composant de carte personnalisé avec dégradé
function GradientStatCard({
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  count,
  // eslint-disable-next-line react/prop-types
  iconBg = "#00D4AA",
  // eslint-disable-next-line react/prop-types
  bgGradient = "linear-gradient(135deg, #E8F9F5 0%, #B8E6D3 100%)",
}) {
  return (
    <Card
      sx={{
        background: bgGradient,
        borderRadius: "15px",
        padding: "30px 25px",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "1px solid rgba(0, 0, 0, 0.02)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Icône avec arrière-plan coloré */}
      <Box
        sx={{
          width: "48px",
          height: "48px",
          backgroundColor: iconBg,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          [0]
        </Typography>
      </Box>

      {/* Titre */}
      <Typography
        sx={{
          color: "#6B7280",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        {title}
      </Typography>

      {/* Valeur principale */}
      <Typography
        sx={{
          color: "#1F2937",
          fontSize: "32px",
          fontWeight: "bold",
          lineHeight: "1",
        }}
      >
        {count}
      </Typography>
    </Card>
  );
}

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Carte 1: Mon solde */}
          <Grid item xs={12} md={6} lg={3}>
            <GradientStatCard
              title="Mon solde"
              count="0 XOF"
              iconBg="#00D4AA"
              bgGradient="linear-gradient(135deg, #E8F9F5 0%, #B8E6D3 100%)"
            />
          </Grid>

          {/* Carte 2: Recettes de ce mois */}
          <Grid item xs={12} md={6} lg={3}>
            <GradientStatCard
              title="Recettes de ce mois"
              count="0 XOF"
              iconBg="#3B82F6"
              bgGradient="linear-gradient(135deg, #F3E8FF 0%, #DDD6FE 100%)"
            />
          </Grid>

          {/* Carte 3: Recettes d'aujourd'hui */}
          <Grid item xs={12} md={6} lg={3}>
            <GradientStatCard
              title="Recettes d'aujourd'hui"
              count="0 XOF"
              iconBg="#10B981"
              bgGradient="linear-gradient(135deg, #ECFDF5 0%, #BBF7D0 100%)"
            />
          </Grid>

          {/* Carte 4: Vendus aujourd'hui */}
          <Grid item xs={12} md={6} lg={3}>
            <GradientStatCard
              title="Vendus aujourd'hui"
              count="0"
              iconBg="#3B82F6"
              bgGradient="linear-gradient(135deg, #F3E8FF 100%, #DDD6FE 50%)"
            />
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox sx={{ marginTop: "30px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
