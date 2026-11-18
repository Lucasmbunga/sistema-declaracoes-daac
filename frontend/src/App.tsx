import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { NewRequest } from "./components/NewRequest";
import { StudentDashboard } from "./components/StudentDashboard";
import { TrackRequestDetailsPage } from "./pages/TrackRequestDetailsPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { TechnicianLayout } from "./pages/TechnicianLayout";
import { TechnicianDashboardPage } from "./pages/TechnicianDashboardPage";
import { BatchPrintPage } from "./components/BatchPrintPage";
import { AdministrationPage } from "./pages/AdministrationPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new-request" element={<NewRequest />} />

          {/* Rotas Protegidas para Estudantes */}
          <Route element={<ProtectedRoute allowedRoles={["ESTUDANTE"]} />}>
            <Route path="/perfil/student" element={<StudentDashboardPage />}>
              <Route index element={<StudentDashboard />} />
              <Route path="pedir-requerimento" element={<NewRequest />} />
              <Route path="pedidos" element={<TrackRequestDetailsPage />} />
            </Route>
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={["ATENDENTE", "ADMINISTRADOR"]} />
            }
          >
            <Route element={<TechnicianLayout />}>
              <Route
                path="/tecnico/painel"
                element={<TechnicianDashboardPage />}
              />
              <Route path="/tecnico/impressao-lote" element={<BatchPrintPage />} />
              <Route path="/tecnico/administracao" element={<AdministrationPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
