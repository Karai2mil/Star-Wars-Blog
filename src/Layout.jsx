import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./front/components/scrollToTop";
import { BackendURL } from "./front/components/backendURL";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotFound from "./front/views/NotFound.jsx"
import Home from "./front/views/Home.jsx"
import CreateAccount from "./front/components/CreateAccount.jsx";
import AddElement from './front/views/AddElement.jsx'
import NotLoad from './front/components/NotLoad.jsx'

import injectContext from "./front/store/appContext";


//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	// if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<ScrollToTop>
					<Routes>
						<Route path="*" element={<NotFound />} />
						<Route path="/home" element={<Home />} />
						<Route path='/Createaccount' element={<CreateAccount />} />
						<Route path='/Add' element={<AddElement />} />
						<Route path='/' element={<NotLoad />} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
