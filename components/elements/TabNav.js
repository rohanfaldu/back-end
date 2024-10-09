'use client'
import { useState } from "react"

export default function TabNav() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i) => {
		setIsTab(i)
	}
	return (
		<>
			<li className="nav-tab-item" onClick={() => handleTab(1)}>
				<a className={isTab == 1 ? "nav-link-item active" : "nav-link-item"}>For Rent</a>
			</li>
			<li className="nav-tab-item" onClick={() => handleTab(2)}>
				<a className={isTab == 2 ? "nav-link-item active" : "nav-link-item"}>For Sale</a>
			</li>
		</>
	)
}
