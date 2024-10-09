
import Link from "next/link"

export default function Banner() {
	return (
		<>

			<section className="flat-section pt-0 flat-banner wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
				<div className="container">
					<div className="wrap-banner bg-surface">
						<div className="box-left">
							<div className="box-title">
								<div className="text-subtitle text-primary">Become Partners</div>
								<h4 className="mt-4">List your Properties on Homeya, join Us Now!</h4>
							</div>
							<Link href="#" className="tf-btn primary size-1">Become A Hosting</Link>
						</div>
						<div className="box-right">
							<img src="/images/banner/banner.png" alt="image" />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
