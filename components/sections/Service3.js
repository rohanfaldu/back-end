
import Link from "next/link"

export default function Service3() {
	return (
		<>

			<section className="flat-section flat-service-v3">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Our Services</div>
						<h4 className="mt-4">What We Do?</h4>
					</div>
					<div className="row wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box col-lg-4 col-md-6">
							<div className="box-service style-2">
								<div className="icon-box">
									<span className="icon icon-buy-home" />
								</div>
								<div className="content">
									<h6 className="title">Buy A New Home</h6>
									<p className="description">Explore diverse properties and expert guidance for a seamless
										buying experience.</p>
									<Link href="#" className="tf-btn size-1">Find A Home</Link>
								</div>
							</div>
						</div>
						<div className="box col-lg-4 col-md-6">
							<div className="box-service style-2 active">
								<div className="icon-box">
									<span className="icon icon-rent-home" />
								</div>
								<div className="content">
									<h6 className="title">Rent a home</h6>
									<p className="description">Explore a diverse variety of listings tailored precisely to
										suit your unique lifestyle needs.</p>
									<Link href="#" className="tf-btn size-1">Find A Rental</Link>
								</div>
							</div>
						</div>
						<div className="box col-lg-4 col-md-6">
							<div className="box-service style-2">
								<div className="icon-box">
									<span className="icon icon-sale-home" />
								</div>
								<div className="content">
									<h6 className="title">Sell a home</h6>
									<p className="description">Showcasing your property's best features for a successful
										sale.</p>
									<Link href="#" className="tf-btn size-1">Submit Property</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
