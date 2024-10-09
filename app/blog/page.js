
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Blog() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog">
				<section className="flat-section">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<div className="flat-blog-list">
									<div className="flat-blog-item">
										<div className="img-style">
											<img src="/images/blog/blog-lg-1.jpg" alt="img-blog" />
											<span className="date-post">January 28, 2024</span>
										</div>
										<div className="content-box">
											<div className="post-author">
												<span className="text-black fw-7">Esther</span>
												<span>Furniture</span>
											</div>
											<h5 className="title">Building gains into housing stocks and how to trade the sector</h5>
											<p className="description body-1">The average contract interest rate for 30-year fixed-rate mortgages with conforming loan balances...</p>
											<Link href="/blog-detail" className="btn-read-more">Read More</Link>
										</div>
									</div>
									<div className="flat-blog-item">
										<div className="img-style">
											<img src="/images/blog/blog-lg-2.jpg" alt="img-blog" />
											<span className="date-post">January 28, 2024</span>
										</div>
										<div className="content-box">
											<div className="post-author">
												<span className="text-black fw-7">Angel</span>
												<span>Interior</span>
											</div>
											<h5 className="title">92% of millennial homebuyers say inflation has impacted their plans</h5>
											<p className="description body-1">Delve into the art of home staging as an effective strategy to attract buyers and sell your home...</p>
											<Link href="/blog-detail" className="btn-read-more">Read More</Link>
										</div>
									</div>
									<div className="flat-blog-item">
										<div className="img-style">
											<img src="/images/blog/blog-lg-3.jpg" alt="img-blog" />
											<span className="date-post">January 28, 2024</span>
										</div>
										<div className="content-box">
											<div className="post-author">
												<span className="text-black fw-7">Eduardo</span>
												<span>Realtor</span>
											</div>
											<h5 className="title">The Art of Staging: How to Sell Your Home Quickly at a High Price.</h5>
											<p className="description body-1">Delve into the art of home staging as an effective strategy to attract buyers and sell your home...</p>
											<Link href="/blog-detail" className="btn-read-more">Read More</Link>
										</div>
									</div>
									<ul className="flat-pagination">
										<li><Link href="#" className="page-numbers current">1</Link></li>
										<li><Link href="#" className="page-numbers">2</Link></li>
										<li><Link href="#" className="page-numbers">3</Link></li>
										<li><Link href="#" className="page-numbers"><i className="icon icon-arr-r" /></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-4">
								<aside className="sidebar-blog fixed-sidebar">
									<div className="widget-search">
										<div className="h7 fw-7 text-black">Search</div>
										<div className="search-box">
											<input className="search-field" type="text" placeholder="Search" />
											<Link href="#" className="right-icon icon-search" />
										</div>
									</div>
									<div className="widget-box bg-surface recent">
										<div className="h7 fw-7 text-black">Recent Posts</div>
										<ul>
											<li>
												<Link href="/blog-detail" className="recent-post-item hover-img">
													<div className="img-style">
														<img src="/images/blog/post-recent-1.jpg" alt="post-recent" />
													</div>
													<div className="content">
														<span className="subtitle">February 16, 2024</span>
														<div className="title">Key Real Estate Trends to Watch in 2024</div>
													</div>
												</Link>
											</li>
											<li>
												<Link href="/blog-detail" className="recent-post-item hover-img">
													<div className="img-style">
														<img src="/images/blog/post-recent-2.jpg" alt="post-recent" />
													</div>
													<div className="content">
														<span className="subtitle">February 16, 2024</span>
														<div className="title">Expert Tips for Profitable Real Estate Investments.</div>
													</div>
												</Link>
											</li>
											<li>
												<Link href="/blog-detail" className="recent-post-item hover-img">
													<div className="img-style">
														<img src="/images/blog/post-recent-3.jpg" alt="post-recent" />
													</div>
													<div className="content">
														<span className="subtitle">February 16, 2024</span>
														<div className="title">10 Steps to Prepare for a Successful Real Estate...</div>
													</div>
												</Link>
											</li>
										</ul>
									</div>
									<div className="widget-box bg-surface categories">
										<div className="h7 fw-7 text-black">By Categories</div>
										<ul>
											<li><Link href="#" className="categories-item"><span>Market Updates</span><span>(112)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Buying Tips</span><span>(13)</span></Link></li>
											<li><Link href="#" className="categories-item current"><span>Interior Inspiration</span><span>(42)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Investment Insights</span><span>(32)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Legal Guidance</span><span>(54)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Home Construction</span><span>(93)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Community Spotlight</span><span>(52)</span></Link></li>
											<li><Link href="#" className="categories-item"><span>Trend Watch</span><span>(14)</span></Link></li>
										</ul>
									</div>
									<div className="widget-box bg-surface tag">
										<div className="h7 fw-7 text-black">Popular Tag</div>
										<ul>
											<li><Link href="#" className="tag-item">Property</Link></li>
											<li><Link href="#" className="tag-item current">Realty</Link></li>
											<li><Link href="#" className="tag-item">Finance</Link></li>
											<li><Link href="#" className="tag-item">Design</Link></li>
											<li><Link href="#" className="tag-item">Invest</Link></li>
											<li><Link href="#" className="tag-item">Legal</Link></li>
											<li><Link href="#" className="tag-item">Renovate</Link></li>
											<li><Link href="#" className="tag-item">Neighborhood</Link></li>
											<li><Link href="#" className="tag-item">Market</Link></li>
										</ul>
									</div>
								</aside>
							</div>
						</div>
					</div>
				</section>

			</Layout>
		</>
	)
}