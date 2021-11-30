import React from 'react';
import RequireRefresh from './RequireRefresh';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const ForgotPassword = React.lazy(() => import('./Demo/Authentication/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./Demo/Authentication/ResetPassword/ResetPassword'));
const Home = React.lazy(() => import('./Demo/Public/Home/Home'));
const Listen = React.lazy(() => import('./Demo/Public/Listen/Listen'));
const Timeline = React.lazy(() => import('./Demo/Public/Timeline/Timeline'))

const route = [
    { path: '/login', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/signup', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/forgot/password', exact: true, name: 'Forgot Password', component: ForgotPassword },
    { path: '/reset/password/:token', exact: true, name: 'Reset Password', component: ResetPassword },
    { path: '/', exact: true, name: 'Home', component: RequireRefresh(Home) },
    { path: '/home', exact: true, name: 'Listen', component: RequireRefresh(Timeline) },
    { path: '/listen', exact: true, name: 'Listen', component: RequireRefresh(Listen) },
];

export default route;