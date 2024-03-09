import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import {Error as ErrorPage} from './pages/Error/Error.tsx';
import {Login} from './pages/Login/Login.tsx';
import {Layout} from './layout/Layout/Layout.tsx';
import {Register} from './pages/Register/Register.tsx';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {Home} from "./pages/Home/Home.tsx";
import {RequireAuth} from "./helpers/RequireAuth.tsx";
import {Greeting} from "./pages/Greeting/Greeting.tsx";
import {ConfirmLogin} from "./pages/ConfirmLogin/ConfirmLogin.tsx";


const router = createBrowserRouter([
    {
        path: '/greeting',
        element: <Greeting/>
    },
    {
        path: '/',
        element: <RequireAuth><Layout/></RequireAuth>,
        children: [
            {
                path: '/',
                element: <Home/>
            }
        ]
    },
    {
        path: '/authorization',
        element: <Layout/>,
        children: [
            {
                path: 'sign-in',
                element: <Login/>
            },
            {
                path: 'sign-up',
                element: <Register/>
            },
            {
                path: 'confirm',
                element: <ConfirmLogin/>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

