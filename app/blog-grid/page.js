
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function BlogGrid() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog">
				<section className="flat-section">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-6">
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
							<div className="col-lg-4 col-md-6">
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
							<div className="col-lg-4 col-md-6">
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
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-4.jpg" alt="img-blog" />
										<span className="date-post">February 01, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Shane</span>
											<span>Property</span>
										</div>
										<h6 className="title">Expert Tips for Profitable Real Estate Investments.</h6>
										<p className="description">Explore strategies and insider tips to make informed decisions when investing in real estate for maximum...</p>
									</div>
								</Link>
							</div>
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-5.jpg" alt="img-blog" />
										<span className="date-post">February 06, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Eduardo</span>
											<span>Realtor</span>
										</div>
										<h6 className="title">The Art of Staging: How to Sell Your Home Quickly at a High Price.</h6>
										<p className="description">Delve into the art of home staging as an effective strategy to attract buyers and sell your home...</p>
									</div>
								</Link>
							</div>
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-6.jpg" alt="img-blog" />
										<span className="date-post">February 09, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Dianne</span>
											<span>HomeBuying</span>
										</div>
										<h6 className="title">Key Real Estate Trends to Watch in 2024</h6>
										<p className="description">Take a comprehensive look at noteworthy and exciting trends in the real estate industry that you should...</p>
									</div>
								</Link>
							</div>
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-7.jpg" alt="img-blog" />
										<span className="date-post">February 16, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Philip</span>
											<span>Furniture</span>
										</div>
										<h6 className="title">10 Steps to Prepare for a Successful Real Estate Purchase.</h6>
										<p className="description">A detailed guide on the essential steps to meticulously prepare for a real estate purchase, ensuring...</p>
									</div>
								</Link>
							</div>
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-8.jpg" alt="img-blog" />
										<span className="date-post">February 18, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Soham</span>
											<span>Interior</span>
										</div>
										<h6 className="title">Transforming an Old House into a Modern Home.</h6>
										<p className="description">Highlighting modern architectural trends and how to update your old house to reflect a contemporary...</p>
									</div>
								</Link>
							</div>
							<div className="col-lg-4 col-md-6">
								<Link href="/blog-detail" className="flat-blog-item hover-img">
									<div className="img-style">
										<img src="/images/blog/blog-9.jpg" alt="img-blog" />
										<span className="date-post">February 22, 2024</span>
									</div>
									<div className="content-box">
										<div className="post-author">
											<span className="fw-7">Gladys</span>
											<span>DreamHome</span>
										</div>
										<h6 className="title">Choosing a Reliable Real Estate Agent. What You Need to Know</h6>
										<p className="description">In-depth analysis of critical factors to consider when selecting a reliable and experienced real estate...</p>
									</div>
								</Link>
							</div>
							<div className="col-12 text-center">
								<Link href="#" className="tf-btn size-1 primary">Load More</Link>
							</div>
						</div>
					</div>
				</section>

			</Layout>
		</>
	)
}