
import Link from "next/link"

export default function Service2() {
	return (
		<>

			<section className="flat-section-v3 flat-service-v2 bg-surface">
				<div className="container">
					<div className="row wrap-service-v2">
						<div className="col-lg-6">
							<div className="box-left wow fadeInLeftSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
								<div className="box-title">
									<div className="text-subtitle text-primary">Why Choose Us</div>
									<h4 className="mt-4">Discover What Sets Our Real Estate Expertise Apart</h4>
								</div>
								<p>At Homeya, our unwavering commitment lies in crafting unparalleled real estate
									journeys. Our seasoned professionals, armed with extensive market knowledge, walk
									alongside you through every phase of your property endeavor. We prioritize
									understanding your unique aspirations, tailoring our expertise to match your vision.
								</p>
								<ul className="list-view">
									<li>
										<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z" fill="#198754" />
											<path d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z" fill="white" />
										</svg>
										Transparent Partnerships
									</li>
									<li>
										<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z" fill="#198754" />
											<path d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z" fill="white" />
										</svg>
										Proven Expertise
									</li>
									<li>
										<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z" fill="#198754" />
											<path d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z" fill="white" />
										</svg>
										Customized Solutions
									</li>
									<li>
										<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z" fill="#198754" />
											<path d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z" fill="white" />
										</svg>
										Local Area Knowledge
									</li>
								</ul>
								<Link href="/contact" className="btn-view"><span className="text">Contact Us</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="box-right wow fadeInRightSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
								<div className="box-service style-1 hover-btn-view">
									<div className="icon-box">
										<span className="icon icon-buy-home" />
									</div>
									<div className="content">
										<h6 className="title">Buy A New Home</h6>
										<p className="description">Explore diverse properties and expert guidance for a
											seamless buying experience.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</div>
								<div className="box-service style-1 hover-btn-view">
									<div className="icon-box">
										<span className="icon icon-rent-home" />
									</div>
									<div className="content">
										<h6 className="title">Rent a home</h6>
										<p className="description">Explore a diverse variety of listings tailored precisely
											to suit your unique lifestyle needs.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</div>
								<div className="box-service style-1 hover-btn-view">
									<div className="icon-box">
										<span className="icon icon-sale-home" />
									</div>
									<div className="content">
										<h6 className="title">Sell a home</h6>
										<p className="description">Showcasing your property's best features for a successful
											sale.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
