'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Sidebar() {
	const pathname = usePathname()
	const [currentMenuItem, setCurrentMenuItem] = useState("")

	useEffect(() => {
		setCurrentMenuItem(pathname)
	}, [pathname])
	console.log(pathname);
	
	const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current" : ""
	const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current" : ""
	
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	const router = useRouter();
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('isLoggedIn');
		router.push('/');
	}
	return (
		<>
		
			<div className="sidebar-menu-dashboard admin-sidebar">
				<ul className="box-menu-dashboard">
					<li className={`nav-menu-item ${pathname === '/dashboard' ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/dashboard"><span className="icon icon-dashboard" /> Dashboards</Link>
					</li>
					<li className={`nav-menu-item dropdown2 ${(pathname === '/create-agency')||(pathname === '/agency-listing')||(pathname === '/edit-agency')  ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/add-property">
							<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z" fill="#A3ABB0" />
							</svg>
							Agency</Link>
							<ul style={{ display: `${isAccordion  == 3 ? "block" : "none"}` }}>
								<li className={`${checkCurrentMenuItem("/create-agency")}`}>
									<Link href="/create-agency">Create Agnecy</Link>
									
								</li>
								<li className={`${checkCurrentMenuItem("/agency-listing")}`}>
									<Link href="/agency-listing">Agnecy List</Link>
								</li>
								<li className={`${checkCurrentMenuItem("/my-property")}`}>
									<Link href="/my-property">Sub Agnecy</Link>
								</li>
							</ul>
							<div className="dropdown2-btn" onClick={() => handleAccordion (3)}/>
					</li>
					<li className={`nav-menu-item dropdown2 ${(pathname === '/create-developer')||(pathname === '/developer-listing')||(pathname === '/edit-developer') ? 'active' : ''}`}>
							<Link className="nav-menu-link" href="/my-property"><span className="icon icon-list-dashes" />Developers </Link>
							<ul style={{ display: `${isAccordion  == 5 ? "block" : "none"}` }}>
								<li className={`${checkCurrentMenuItem("/add-property")}`}>
									<Link href="/create-developer">Create Developers</Link>
								</li>
								<li className={`${checkCurrentMenuItem("/my-property")}`}>
									<Link href="/developer-listing">Developers List</Link>
								</li>
								<li className={`${checkCurrentMenuItem("/my-property")}`}>
									<Link href="/my-property">sub Developers</Link>
								</li>
							</ul>
							<div className="dropdown2-btn" onClick={() => handleAccordion (5)}/>
					</li>
					{/*<li className={`nav-menu-item dropdown2 ${pathname === '/my-property' ? 'active' : ''} ${isAccordion  == 4 ? "open" : ""} `}>
						<Link className="nav-menu-link" href="/add-property">
							<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z" fill="#A3ABB0" />
							</svg>
							Properties</Link>
							<ul style={{ display: `${isAccordion  == 4 ? "block" : "none"}` }}>
								<li className={`${checkCurrentMenuItem("/my-property")}`}>
									<Link href="/my-property">Properties Ads</Link>
								</li>
								<li className={`${checkCurrentMenuItem("/my-property")}`}>
									<Link href="/my-property">Projects Properties</Link>
								</li>
							</ul>
							<div className="dropdown2-btn" onClick={() => handleAccordion (4)}/>
					</li>
					
					<li className={`nav-menu-item ${pathname === '/reviews' ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/reviews">
						<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" fill="#A3ABB0"/>
						</svg>
							Translate</Link>
					</li>
					<li className={`nav-menu-item ${pathname === '/reviews' ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/reviews"><span className="icon icon-review" /> setting</Link>
					</li>
					<li className={`nav-menu-item ${pathname === '/my-profile' ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/my-profile"><span className="icon icon-profile" /> My Profile</Link>
					</li>*/}
					<li className={`nav-menu-item ${pathname === '/' ? 'active' : ''}`}>
						<Link className="nav-menu-link" href="/" onClick={handleLogout}><span className="icon icon-sign-out" /> Logout</Link>
					</li>
				</ul>
			</div>

		</>
	)
}
