
import Link from "next/link"

export default function LatestNew4() {
	return (
		<>

			<section className="flat-section flat-latest-new">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Latest New</div>
						<h4 className="mt-4">Helpful Homeya Guides</h4>
					</div>
					<div className="row wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box col-lg-4 col-md-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img">
								<div className="img-style">
									<img src="/images/blog/blog-1.jpg" alt="img-blog" />
									<span className="date-post">January 28, 2024</span>
								</div>
								<div className="content-box">
									<div className="post-author">
										<span className="fw-7">Esther</span>
										<span>Furniture</span>
									</div>
									<h6 className="title">Building gains into housing stocks and how to trade the sector</h6>
									<p className="description">The average contract interest rate for 30-year fixed-rate mortgages with conforming loan balances...</p>
								</div>
							</Link>
						</div>
						<div className="box col-lg-4 col-md-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img">
								<div className="img-style">
									<img src="/images/blog/blog-2.jpg" alt="img-blog" />
									<span className="date-post">January 31, 2024</span>
								</div>
								<div className="content-box">
									<div className="post-author">
										<span className="fw-7">Angel</span>
										<span>Interior</span>
									</div>
									<h6 className="title">92% of millennial homebuyers say inflation has impacted their plans</h6>
									<p className="description">Mortgage applications to purchase a home, however, dropped 4% last week compared...</p>
								</div>
							</Link>
						</div>
						<div className="box col-lg-4 col-md-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img">
								<div className="img-style">
									<img src="/images/blog/blog-3.jpg" alt="img-blog" />
									<span className="date-post">January 28, 2024</span>
								</div>
								<div className="content-box">
									<div className="post-author">
										<span className="fw-7">Colleen</span>
										<span>Architecture</span>
									</div>
									<h6 className="title">We are hiring ‘moderately,’ says Compass CEO</h6>
									<p className="description">New listings were down 20% year over year in March, according to Realtor.com, and total inventory...</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
