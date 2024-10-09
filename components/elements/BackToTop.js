'use client'
import { useEffect, useState } from "react"

export default function BackToTop({ target }) {
	const [hasScrolled, setHasScrolled] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setHasScrolled(window.scrollY > 100)
		}

		window.addEventListener("scroll", onScroll)
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const handleClick = () => {
		window.scrollTo({
			top: document.querySelector(target).offsetTop,
			behavior: 'smooth'
		})
	}

	return (
		<>
			{hasScrolled && (
				<div className="progress-wrap active-progress" onClick={handleClick}>
					<svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
						<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: 0 }} />
					</svg>
				</div>
			)}
		</>
	)
}
