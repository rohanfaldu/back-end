'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function OffcanvasMenu({ isOffcanMenu, handleOffcanMenu, isLogin, handleLogin, isRegister, handleRegister }) {

	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className={`offcanvas offcanvas-start canvas-menu ${isOffcanMenu ? "show" : ""}`} id="sidebarMenu">
				<div className="offcanvas-header">
					<nav className="nav-logo">
						<Link href="/"><img src="images/logo/logo.svg" alt="logo" width={174} height={44} /></Link>
					</nav>
					<span className="icon-close2 icon-close-popup" onClick={handleOffcanMenu} />
				</div>
				<div className="off-canvas-body">
					<div className="login-box">
						<a onClick={handleLogin}>Login</a>
						<span>/</span>
						<a onClick={handleRegister}>Register</a>
					</div>
					<ul className="menu-outer" id="wrapper-menu-navigation">
						<li className="nav-menu-item">
							<a
								className={`collapsed nav-link ${isAccordion === 1 ? "current" : ""}`}
							>
								Home
								<span className="icon icon-arr-down" onClick={() => handleAccordion(1)} />
							</a>
							<div id="dropdown-menu-one" className={`collapse ${isAccordion === 1 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/" className="sub-nav-link">Homepage 1</Link></li>
									<li><Link href="/home-02" className="sub-nav-link">Homepage 2</Link></li>
									<li><Link href="/home-03" className="sub-nav-link">Homepage 3</Link></li>
									<li><Link href="/home-04" className="sub-nav-link">Homepage 4</Link></li>
									<li><Link href="/home-05" className="sub-nav-link">Homepage 5</Link></li>
									<li><Link href="/home-06" className="sub-nav-link current">Homepage 6</Link></li>
								</ul>
							</div>
						</li>
						<li className="nav-menu-item">
							<a className={`collapsed nav-link ${isAccordion === 2 ? "current" : ""}`}>
								Listing
								<span className="icon icon-arr-down" onClick={() => handleAccordion(2)} />
							</a>
							<div id="dropdown-menu-two" className={`collapse ${isAccordion === 2 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/property-halfmap-grid" className="sub-nav-link">Property Half Map Grid</Link>
									</li>
									<li><Link href="/property-halfmap-list" className="sub-nav-link">Property Half Map List</Link>
									</li>
									<li><Link href="/topmap-grid" className="sub-nav-link">Find Topmap Grid</Link></li>
									<li><Link href="/topmap-list" className="sub-nav-link">Find Topmap List</Link></li>
									<li><Link href="/sidebar-grid" className="sub-nav-link">Find Sidebar Grid</Link></li>
									<li><Link href="/sidebar-list" className="sub-nav-link">Find Sidebar List</Link></li>
								</ul>
							</div>
						</li>
						<li className="nav-menu-item">
							<a className={`collapsed nav-link ${isAccordion === 3 ? "current" : ""}`}>
								Properties
								<span className="icon icon-arr-down" onClick={() => handleAccordion(3)} />
							</a>
							<div id="dropdown-menu-three" className={`collapse ${isAccordion === 3 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/property-details-v1" className="sub-nav-link">Property Details 1</Link></li>
									<li><Link href="/property-details-v2" className="sub-nav-link">Property Details 2</Link></li>
									<li><Link href="/property-details-v3" className="sub-nav-link">Property Details 3</Link></li>
									<li><Link href="/property-details-v4" className="sub-nav-link">Property Details 4</Link></li>
								</ul>
							</div>
						</li>
						<li className="nav-menu-item">
							<a className={`collapsed nav-link ${isAccordion === 4 ? "current" : ""}`}>
								Pages
								<span className="icon icon-arr-down" onClick={() => handleAccordion(4)} />
							</a>
							<div id="dropdown-menu-four" className={`collapse ${isAccordion === 4 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/about-us" className="sub-nav-link">About Us</Link></li>
									<li><Link href="/our-service" className="sub-nav-link">Our Services</Link></li>
									<li><Link href="/pricing" className="sub-nav-link">Pricing</Link></li>
									<li><Link href="/contact-us" className="sub-nav-link">Contact Us</Link></li>
									<li><Link href="/faq" className="sub-nav-link">FAQs</Link></li>
									<li><Link href="/privacy-policy" className="sub-nav-link">Privacy Policy</Link></li>
								</ul>
							</div>
						</li>
						<li className="nav-menu-item">
							<a className={`collapsed nav-link ${isAccordion === 5 ? "current" : ""}`}>
								Blog
								<span className="icon icon-arr-down" onClick={() => handleAccordion(5)} />
							</a>
							<div id="dropdown-menu-five" className={`collapse ${isAccordion === 5 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/blog" className="sub-nav-link">Blog Default</Link></li>
									<li><Link href="/blog-grid" className="sub-nav-link">Blog Grid</Link></li>
									<li><Link href="/blog-detail" className="sub-nav-link">Blog Post Details</Link></li>
								</ul>
							</div>
						</li>
						<li className="nav-menu-item">
							<a className={`collapsed nav-link ${isAccordion === 6 ? "current" : ""}`}>
								Dashboard
								<span className="icon icon-arr-down" onClick={() => handleAccordion(6)} />
							</a>
							<div id="dropdown-menu-six" className={`collapse ${isAccordion === 6 ? "show" : ""}`}>
								<ul className="sub-nav-menu">
									<li><Link href="/dashboard" className="sub-nav-link">Dashboard</Link></li>
									{/* <li><Link href="/my-favorites" className="sub-nav-link">My Properties</Link></li>
									<li><Link href="/my-invoices" className="sub-nav-link">My Invoices</Link></li>
									<li><Link href="/my-favorites" className="sub-nav-link">My Favorites</Link></li>
									<li><Link href="/reviews" className="sub-nav-link">Reviews</Link></li>
									<li><Link href="/my-profile" className="sub-nav-link">My Profile</Link></li>
									<li><Link href="/add-property" className="sub-nav-link">Add Property</Link></li> */}
								</ul>
							</div>
						</li>
					</ul>
					<div className="box-btn">
						<Link className="tf-btn primary" href="#">Submit Property</Link>
					</div>
					<div className="menu-icon-box">
						<div className="box d-flex align-items-center">
							<span className="icon icon-phone2" />
							<div>1-333-345-6868</div>
						</div>
						<div className="box d-flex align-items-center">
							<span className="icon icon-mail" />
							<div>themesflat@gmail.com</div>
						</div>
					</div>
				</div>
			</div>

			{isOffcanMenu && <div className="offcanvas-backdrop fade show" onClick={handleOffcanMenu} />}
		</>
	)
}
