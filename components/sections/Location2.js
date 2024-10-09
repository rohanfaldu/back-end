
import Link from "next/link"

export default function Location2() {
	return (
		<>

			<section className="flat-section flat-location-v2">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Explore Cities</div>
						<h4 className="mt-4">Our Location For You</h4>
					</div>
					<div className="grid-location wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="item-1 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-6.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
						<div className="item-2 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-7.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
						<div className="item-3 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-8.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
						<div className="item-4 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-9.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
						<div className="item-5 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-10.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
						<div className="item-6 box-location-v2 hover-img">
							<div className="box-img img-style">
								<img src="/images/location/location-11.jpg" alt="image-location" />
							</div>
							<Link href="#" className="content">
								<h6 className="link">Cape Town, South Africa</h6>
								<p>221 Property</p>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
