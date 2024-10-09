
import Link from "next/link"

export default function LatestNew3() {
	return (
		<>

			<section className="flat-section flat-latest-new-v2">
				<div className="container">
					<div className="box-title wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Latest New</div>
						<h4 className="mt-4">The Most Recent Estate</h4>
					</div>
					<div className="row wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box col-lg-3 col-sm-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img style-1">
								<div className="img-style">
									<img src="/images/blog/blog-10.jpg" alt="img-blog" />
								</div>
								<div className="content-box">
									<span className="date-post">January 28, 2024</span>
									<div className="title h7 fw-7 link">Building gains into housing stocks...</div>
									<div className="post-author">
										<span className="fw-5">Jerome Bell</span>
										<span>Furniture</span>
									</div>
								</div>
							</Link>
						</div>
						<div className="box col-lg-3 col-sm-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img style-1">
								<div className="img-style">
									<img src="/images/blog/blog-11.jpg" alt="img-blog" />
								</div>
								<div className="content-box">
									<span className="date-post">January 28, 2024</span>
									<div className="title h7 fw-7 link">92% of millennial home buyers say inflation...</div>
									<div className="post-author">
										<span className="fw-5">Jerome Bell</span>
										<span>Furniture</span>
									</div>
								</div>
							</Link>
						</div>
						<div className="box col-lg-3 col-sm-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img style-1">
								<div className="img-style">
									<img src="/images/blog/blog-12.jpg" alt="img-blog" />
								</div>
								<div className="content-box">
									<span className="date-post">January 28, 2024</span>
									<div className="title h7 fw-7 link">We are hiring moderately, says Compass CEO...</div>
									<div className="post-author">
										<span className="fw-5">Jerome Bell</span>
										<span>Furniture</span>
									</div>
								</div>
							</Link>
						</div>
						<div className="box col-lg-3 col-sm-6">
							<Link href="/blog-detail" className="flat-blog-item hover-img style-1">
								<div className="img-style">
									<img src="/images/blog/blog-13.jpg" alt="img-blog" />
								</div>
								<div className="content-box">
									<span className="date-post">January 28, 2024</span>
									<div className="title h7 fw-7 link">Building gains into housing stocks and how...</div>
									<div className="post-author">
										<span className="fw-5">Jerome Bell</span>
										<span>Furniture</span>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
