
'use client'
import { useEffect, useState } from "react"
import AddClassBody from "../elements/AddClassBody"
import BackToTop from '../elements/BackToTop'
import ModalLogin from "../elements/ModalLogin"
import ModalRegister from "../elements/ModalRegister"
import Breadcrumb from './Breadcrumb'
import OffcanvasFilter from "./OffcanvasFilter"
import OffcanvasMenu from "./OffcanvasMenu"
import OffcanvasMobileFilter from "./OffcanvasMobileFilter"
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'

export default function Layout({ headerStyle, hcls, footerStyle, breadcrumbTitle, children }) {
	const [scroll, setScroll] = useState(0)
	// Mobile Menu
	const [isMobileMenu, setMobileMenu] = useState(false)
	const handleMobileMenu = () => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-visible") : document.body.classList.remove("mobile-menu-visible")
	}
	// Login
	const [isLogin, setLogin] = useState(false)
	const handleLogin = () => {
		setLogin(!isLogin)
		!isLogin ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open")
	}
	// Register
	const [isRegister, setRegister] = useState(false)
	const handleRegister = () => {
		setRegister(!isRegister)
		!isRegister ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open")
	}

	// 
	const [isOffcanMenu, setOffcanMenu] = useState(false)
	const handleOffcanMenu = () => setOffcanMenu(!isOffcanMenu)

	// 
	const [isOffcanFilter, setOffcanFilter] = useState(false)
	const handleOffcanFilter = () => setOffcanFilter(!isOffcanFilter)

	// 
	const [isOffcanAdvanceFilter, setOffcanAdvanceFilter] = useState(false)
	const handleOffcanAdvanceFilter = () => setOffcanAdvanceFilter(!isOffcanAdvanceFilter)

	// 
	const [isOffcanMobile, setOffcanMobile] = useState(false)
	const handleOffcanMobile = () => setOffcanMobile(!isOffcanMobile)



	useEffect(() => {
		const WOW = require('wowjs')
		window.wow = new WOW.WOW({
			live: false
		})
		window.wow.init()

		document.addEventListener("scroll", () => {
			const scrollCheck = window.scrollY > 100
			if (scrollCheck !== scroll) {
				setScroll(scrollCheck)
			}
		})
	}, [])
	return (
		<><div id="top" />
			<AddClassBody />
			<div id="wrapper">
				<div id="pagee" className="clearfix">
					{headerStyle == 1 ? <Header1
						scroll={scroll}
						isMobileMenu={isMobileMenu}
						handleMobileMenu={handleMobileMenu}
						isLogin={isLogin}
						handleLogin={handleLogin}
						isRegister={isRegister}
						handleRegister={handleRegister}
						hcls={hcls}
					/> : null}
					{headerStyle == 2 ? <Header2
						scroll={scroll}
						isMobileMenu={isMobileMenu}
						handleMobileMenu={handleMobileMenu}
						isLogin={isLogin}
						handleLogin={handleLogin}
						isRegister={isRegister}
						handleRegister={handleRegister}
						isOffcanMenu={isOffcanMenu}
						handleOffcanMenu={handleOffcanMenu}
						isOffcanFilter={isOffcanFilter}
						handleOffcanFilter={handleOffcanFilter}
						isOffcanMobile={isOffcanMobile}
						handleOffcanMobile={handleOffcanMobile}
					/> : null}

					<main className="main">
						{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

						{children}
					</main>


					{/* {footerStyle == 1 ? < Footer1 /> : null}
					{footerStyle == 2 ? < Footer2 /> : null} */}
				</div>
			</div>
			<BackToTop target="#top" />
			<ModalLogin isLogin={isLogin} handleLogin={handleLogin} isRegister={isRegister} handleRegister={handleRegister} />
			<ModalRegister isRegister={isRegister} handleRegister={handleRegister} isLogin={isLogin} handleLogin={handleLogin} />
			<OffcanvasMenu
				isOffcanMenu={isOffcanMenu}
				handleOffcanMenu={handleOffcanMenu}
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
			/>
			<OffcanvasFilter
				isOffcanFilter={isOffcanFilter}
				handleOffcanFilter={handleOffcanFilter}
				isLogin={isLogin}
				handleLogin={handleLogin}
				isRegister={isRegister}
				handleRegister={handleRegister}
				isOffcanMenu={isOffcanMenu}
				handleOffcanMenu={handleOffcanMenu}
			/>
			<OffcanvasMobileFilter />
		</>
	)
}
