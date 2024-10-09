
import Link from "next/link"

export default function Service5() {
	return (
		<>

			<section className="flat-section-v5 flat-service-v5 bg-surface">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Our Services</div>
						<h4 className="mt-4">Welcome the Homeya</h4>
					</div>
					<div className="row wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box col-lg-4 col-md-6">
							<div className="box-service hover-btn-view style-3">
								<div className="icon-box">
									<span className="icon icon-buy-home" />
								</div>
								<div className="content">
									<h6 className="title">Buy A New Home</h6>
									<p className="description">Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
									<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
								</div>
							</div>
						</div>
						<div className="box col-lg-4 col-md-6">
							<div className="box-service hover-btn-view style-3 active">
								<div className="icon-box">
									<span className="icon icon-rent-home" />
								</div>
								<div className="content">
									<h6 className="title">Rent a home</h6>
									<p className="description">Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
									<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
								</div>
							</div>
						</div>
						<div className="box col-lg-4 col-md-6">
							<div className="box-service hover-btn-view style-3">
								<div className="icon-box">
									<span className="icon icon-sale-home" />
								</div>
								<div className="content">
									<h6 className="title">Sell a home</h6>
									<p className="description">Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.</p>
									<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
