'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function MobileMenu() {
	const pathname = usePathname()
	const [currentMenuItem, setCurrentMenuItem] = useState("")

	useEffect(() => {
		setCurrentMenuItem(pathname)
	}, [pathname])

	const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current" : ""
	const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current" : ""

	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className="menu-outer">
				<div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
				<ul className="navigation clearfix">
					<li><Link href="/">Home</Link></li>
					<li><Link href="/about-us">About Us</Link></li>
					<li><Link href="/property-halfmap-list">Property</Link></li>
					<li><Link href="/blog">Blog</Link></li>
				</ul>

				</div>
			</div>
		</>
	)
}
