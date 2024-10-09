
import Link from "next/link"
import CountetNumber from "../elements/CountetNumber"

export default function Service1() {
	return (
		<>

			<section className="flat-section">
				<div className="container">
					<div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-left">
							<div className="text-subtitle text-primary">Our Services</div>
							<h4 className="mt-4">What We Do?</h4>
						</div>
						<Link href="#" className="btn-view"><span className="text">View All Services</span> <span className="icon icon-arrow-right2" /> </Link>
					</div>
					<div className="flat-service wrap-service wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box-service hover-btn-view">
							<div className="icon-box">
								<span className="icon icon-buy-home" />
							</div>
							<div className="content">
								<h6 className="title">Buy A New Home</h6>
								<p className="description">Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
								<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-service hover-btn-view">
							<div className="icon-box">
								<span className="icon icon-rent-home" />
							</div>
							<div className="content">
								<h6 className="title">Rent a home</h6>
								<p className="description">Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
								<Link href="#" className="btn-view style-1"><span className="text">Learn More</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-service hover-btn-view">
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
					<div className="flat-counter tf-counter wrap-counter wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="counter-box">
							<div className="count-number">
								<div className="number" data-speed={2000} data-to={85} data-inviewport="yes"><CountetNumber count={85} /></div>
							</div>
							<div className="title-count">Satisfied Clients</div>
						</div>
						<div className="counter-box">
							<div className="count-number">
								<div className="number" data-speed={2000} data-to={112} data-inviewport="yes"><CountetNumber count={112} /></div>
							</div>
							<div className="title-count">Awards Received</div>
						</div>
						<div className="counter-box">
							<div className="count-number">
								<div className="number" data-speed={2000} data-to={32} data-inviewport="yes"><CountetNumber count={32} /></div>
							</div>
							<div className="title-count">Successful Transactions</div>
						</div>
						<div className="counter-box">
							<div className="count-number">
								<div className="number" data-speed={2000} data-to={66} data-inviewport="yes"><CountetNumber count={66} /></div>
							</div>
							<div className="title-count">Monthly Traffic</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
