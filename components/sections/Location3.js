
import Link from "next/link"

export default function Location3() {
	return (
		<>

			<section className="flat-section flat-location-v3">
				<div className="container">
					<div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-left">
							<div className="text-subtitle text-primary">Explore Cities</div>
							<h4 className="mt-4">Properties By Cities</h4>
						</div>
						<Link href="#" className="btn-view"><span className="text">View All Properties</span> <span className="icon icon-arrow-right2" /> </Link>
					</div>
					<div className="grid-location-v2 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-1.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Dallas</Link></h6>
								<p>263 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view active">
							<div className="img-style">
								<img src="/images/location/lo-sm-2.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Atlanta</Link></h6>
								<p>275 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-3.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Orlando</Link></h6>
								<p>256 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-4.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Miami</Link></h6>
								<p>312 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-5.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Houston</Link></h6>
								<p>237 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-6.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Phoenix</Link></h6>
								<p>221 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-7.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Seattle</Link></h6>
								<p>188 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-8.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Denver</Link></h6>
								<p>193 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
						<div className="box-location-v3 hover-img hover-btn-view">
							<div className="img-style">
								<img src="/images/location/lo-sm-9.jpg" alt="image-location" />
							</div>
							<div className="content">
								<h6><Link href="#" className="link">Austin</Link></h6>
								<p>309 properties</p>
								<Link href="#" className="btn-view style-1"><span className="text">Explore Now</span> <span className="icon icon-arrow-right2" /> </Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
