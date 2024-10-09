import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
	return (
		<>

			<section className="flat-title-page style-2">
				<div className="container">
					<ul className="breadcrumb">
						<li><Link href="/">Home</Link></li>
						<li>/ Pages</li>
						<li>/ {breadcrumbTitle}</li>
					</ul>
					<h2 className="text-center">{breadcrumbTitle}</h2>
				</div>
			</section>

		</>
	)
}
