
export default function Footer2({ fixedfooter }) {
	return (
		<>

			<div className={`footer-dashboard ${fixedfooter ? "footer-dashboard-2" : ""}`}>
				<p className="text-variant-2">©2024 Immofind. All Rights Reserved.</p>
			</div>
		</>
	)
}
