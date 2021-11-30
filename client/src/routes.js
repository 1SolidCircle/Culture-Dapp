import React from 'react';
import $ from 'jquery';
import RequireAuth from './RequireAuth';
import RequireRefresh from './RequireRefresh';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

//Users
const Dashboard = React.lazy(() => import("./Demo/dashboard/dashboard"));
const EditProfile = React.lazy(() => import("./Demo/dashboard/editProfile"));
const CreateTrack = React.lazy(() => import("./Demo/tracks/createTrack"));
const EditTrack = React.lazy(() => import("./Demo/tracks/editTrack"));

//Not Found
const NotFound = React.lazy(() => import("./Demo/NotFound/NotFound"));

const routes = [
    //user routes
    { path: '/profile', exact: true, role:'user', user: true, admin: false, component: RequireAuth(Dashboard) },
    { path: '/profile/edit', exact: true, role:'user', user: true, admin: false, component: RequireAuth(EditProfile) },
    { path: '/user/track/add', exact: true, role:'user', user: true, admin: false, component: RequireAuth(CreateTrack) },
    { path: '/user/track/:id/edit', exact: true, role:'user', user: true, admin: false, component: RequireRefresh(EditTrack) },
    

    //public
    { path: '/not-found', exact: true, role:'public', component: RequireAuth(NotFound) }
];

export default routes;