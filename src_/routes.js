import React from 'react';

const SujetPl = React.lazy(() => import('./views/Sujet_pl/SujetPl'));
const Sujetspropo = React.lazy(()=> import('./views/Propose/Sujetspropo'))
const SujetArch = React.lazy(()=> import('./views/Sujet_arch/SujetArch'))
const tirage = React.lazy(()=> import('./views/Tirage/tirage'))
const GestionSJ = React.lazy(()=> import('./views/Admin/Sujet/index'))

const routes = [
  { path: '/', exact: true, name: 'Accueil' },
  { path: '/SujetPl', exact: true,  name: 'Sujets planifiés', component: SujetPl },
  { path: '/Sujetspropo', exact: true,  name: 'Sujets proposés', component: Sujetspropo },
  { path: '/tirage', exact: true,  name: 'Tirage au sort', component: tirage },
  { path: '/sujet', exact: true,  name: 'Gestion Sujets', component: GestionSJ },
  { path: '/SujetArch', exact: true,  name: 'Sujets archivés', component: SujetArch },
];
export default routes;
