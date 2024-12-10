import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router';
import './styles.scss';

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
