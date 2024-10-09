
import Link from "next/link"
import CountetNumber from "../elements/CountetNumber"

export default function Service4() {
	return (
		<>

			<section className="flat-section flat-service-v4">
				<div className="container">
					<div className="wrap-service-v4 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="inner-service-left">
							<div className="img-service">
								<img src="/images/home/house-service.jpg" alt="img-service" />
								<div className="box-graphic box-avatar">
									<div className="avatar avt-56">
										<img src="/images/avatar/avt-13.jpg" alt="avt" />
										<span className="status" />
									</div>
									<div className="content">
										<div className="tf-counter">
											<h6 className="text-primary d-flex">
												+<span className="number" data-speed={2000} data-to={480} data-inviewport="yes"><CountetNumber count={480} /></span>k
											</h6>
										</div>
										<span className="title">Partner</span>
									</div>
								</div>
								<div className="box-graphic box-trader">
									<div className="content">
										<div className="tf-counter">
											<h4 className="text-primary d-flex justify-content-center">
												<span className="number" data-speed={2000} data-to="2.5" data-dec={1} data-inviewport="yes"><CountetNumber count={2.5} /></span>k+
											</h4>
										</div>
										<span className="title">Property Available</span>
									</div>
								</div>
							</div>
						</div>
						<div className="inner-service-right">
							<div className="box-title">
								<div className="text-subtitle text-primary">What We Do</div>
								<h4 className="mt-4">Discover What Sets Our</h4>
								<p className="desc">At Homeya, our unwavering commitment lies in crafting unparalleled real estate journeys.</p>
							</div>
							<ul className="list-service">
								<li className="box-service hover-btn-view style-4">
									<div className="icon-box">
										<span className="icon icon-buy-home" />
									</div>
									<div className="content">
										<h6 className="title">Buy A New Home</h6>
										<p className="description">Explore diverse properties and expert guidance for a seamless buying experience.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</li>
								<li className="box-service hover-btn-view style-4">
									<div className="icon-box">
										<span className="icon icon-rent-home" />
									</div>
									<div className="content">
										<h6 className="title">Rent a homee</h6>
										<p className="description">Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</li>
								<li className="box-service hover-btn-view style-4">
									<div className="icon-box">
										<span className="icon icon-sale-home" />
									</div>
									<div className="content">
										<h6 className="title">Buy A New Home</h6>
										<p className="description">Showcasing your property's best features for a successful sale.</p>
										<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
