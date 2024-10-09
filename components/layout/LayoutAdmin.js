
'use client'
import { useEffect, useState } from "react"
import AddClassBody from "../elements/AddClassBody"
import BackToTop from '../elements/BackToTop'
import Sidebar from "./Sidebar"
import Footer2 from './footer/Footer2'
import Header3 from "./header/Header3"

export default function LayoutAdmin({ headerStyle, footerStyle, fixedfooter, children }) {
	const [scroll, setScroll] = useState(0)
	const [isMobileMenu, setMobileMenu] = useState(false)
	const handleMobileMenu = () => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-visible") : document.body.classList.remove("mobile-menu-visible");
	}

	const [isSidebar, setSidebar] = useState(false)
	const handleSidebar = () => setSidebar(!isSidebar)

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
				<div id="page" className="clearfix">
					<div className={`layout-wrap ${isSidebar ? "full-width" : ""}`}>
						<Header3 scroll={scroll} isSidebar={isSidebar} handleSidebar={handleSidebar} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu}/>
						<Sidebar isSidebar={isSidebar} handleSidebar={handleSidebar} />

						<div className="main-content">
							<div className="main-content-inner">
								<div className="button-show-hide show-mb" onClick={handleSidebar}>
									<span className="body-1">Show Dashboard</span>
								</div>
								{children}
							</div>
							< Footer2 fixedfooter={fixedfooter}/>
						</div>
						<div className="overlay-dashboard" onClick={handleSidebar} />
					</div>
				</div>
			</div>
			<BackToTop target="#top" />
		</>
	)
}
