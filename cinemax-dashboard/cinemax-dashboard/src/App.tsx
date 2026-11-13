import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Films from "./pages/Films";
import CreateFilm from "./pages/CreateFilm";
import EditFilm from "./pages/EditFilm";
import Settings from "./pages/Settings";

export default function App() {
  return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="filmes" element={<Films/>}/><Route path="filmes/novo" element={<CreateFilm/>}/><Route path="filmes/:id/editar" element={<EditFilm/>}/><Route path="configuracoes" element={<Settings/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>;
}