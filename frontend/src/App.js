import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./modules/Login/login";
import _Login from "./modules/Login/_Login.jsx";

import Dashboard from "./modules/Dashboard/dashboard";
import _Dashboard from "./modules/Dashboard/_Dashboard.jsx";

import ForgotPass from "./modules/Forgot Password/sub-modules/fgpass";
import OTP from "./modules/Forgot Password/sub-modules/otp";
import ConfirmPass from "./modules/Forgot Password/sub-modules/cpass";
import Rbac from "./modules/Administrator/sub-modules/UserMasterData/UserRole";
import CreateRole from "./modules/Administrator/sub-modules/UserMasterData/CreateRole";
import EditRole from "./modules/Administrator/sub-modules/UserMasterData/EditRole";
import MasterList from "./modules/Administrator/sub-modules/UserMasterData/MasterList";

import Layout from "./layout/layout.jsx";

import ProductManagement from "./modules/Product/ProductManagement";
import ExtraOption from "./modules/Extra Option/ExtraOption";
import ProductCategoryMain from "./modules/ProductCategory/ProductCategoryManagement.jsx";
import ProductCategory from "./modules/ProductCategory/ProductCategory.jsx";

import { DataProvider } from "./modules/Forgot Password/sub-modules/data/dataPost";
import ProtectedRoutes from "./hooks/protectedRoute";
import Menu from "./modules/Menu/Menu.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <DataProvider>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<_Login />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/OTP" element={<OTP />} />
            <Route path="/ConfirmPassword/:email?" element={<ConfirmPass />} />
          </Routes>
        </DataProvider>

        <DataProvider>
          <ProtectedRoutes>
            <Routes>
              <Route path="/menu" element={<Menu />} />
              <Route element={<Layout />}>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/dashboard" element={<_Dashboard />} />

                {/* User Master Data */}

                <Route path="/userRole" element={<Rbac />} />

                <Route path="/createRole" element={<CreateRole />} />

                <Route path="/editRole/:id" element={<EditRole />} />

                <Route path="/masterList" element={<MasterList />} />

                <Route
                  path="/productManagement"
                  element={<ProductManagement />}
                />

                <Route path="/extraOption" element={<ExtraOption />} />

                <Route
                  path="/productCategoryMain"
                  element={<ProductCategoryMain />}
                />
                <Route path="/productCategory" element={<ProductCategory />} />
              </Route>
            </Routes>
          </ProtectedRoutes>
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
