import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import ResuBuilder from "./pages/ResuBuilder";
import Layout from "./pages/Layout";
import Notify from "./components/Notify";
import NotFound from "./components/NotFound";
// import Settings from './pages/Settings'
// import Templates from './pages/Templates'
// import NewTemplate from './pages/NewTemplate'
// import Template from './pages/Template'
// import EditTemplate from './pages/EditTemplate'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResuBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
        <Route path="notify" element={<Notify />} />
        <Route path="*" element={<NotFound />} />

        {/* <Route path='/builder/:resumeId/preview' element={<Preview />} />
        <Route path='/builder/:resumeId/edit' element={<ResuBuilder />} />
        <Route path='/builder/:resumeId/settings' element={<Settings />} />
        <Route path='/builder/:resumeId/templates' element={<Templates />} />
        <Route path='/builder/:resumeId/templates/new' element={<NewTemplate />} />
        <Route path='/builder/:resumeId/templates/:templateId' element={<Template />} />
        <Route path='/builder/:resumeId/templates/:templateId/edit' element={<EditTemplate />} /> */}
      </Routes>
    </>
  );
}

export default App;
