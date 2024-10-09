
import Link from "next/link"

export default function Property2() {
	return (
		<>

			<section className="flat-section flat-property-v2 bg-surface">
				<div className="container">
					<div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-left">
							<div className="text-subtitle text-primary">Top Properties</div>
							<h4 className="mt-4">Best Property Value</h4>
						</div>
						<Link href="#" className="tf-btn primary size-1">View All</Link>
					</div>
					<div className="grid-2 gap-30 wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="homeya-box list-style-1">
							<Link href="/property-details-v1" className="images-group">
								<div className="images-style">
									<img src="/images/home/house-sm-3.jpg" alt="img" />
								</div>
								<div className="top">
									<ul className="d-flex gap-4 flex-column">
										<li className="flag-tag success">Featured</li>
										<li className="flag-tag style-1">For Sale</li>
									</ul>
									<ul className="d-flex gap-4">
										<li className="box-icon w-28">
											<span className="icon icon-arrLeftRight" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-heart" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-eye" />
										</li>
									</ul>
								</div>
								<div className="bottom">
									<span className="flag-tag style-2">Studio</span>
								</div>
							</Link>
							<div className="content">
								<div className="archive-top">
									<div className="h7 text-capitalize fw-7"><Link href="#" className="link">Casa Lomas de Machalí
										Machas</Link></div>
									<div className="desc"><i className="icon icon-mapPin" />
										<p>145 Brooklyn Ave, Califonia, New York</p>
									</div>
									<ul className="meta-list">
										<li className="item">
											<i className="icon icon-bed" />
											<span>4</span>
										</li>
										<li className="item">
											<i className="icon icon-bathtub" />
											<span>2</span>
										</li>
										<li className="item">
											<i className="icon icon-ruler" />
											<span>600 SqFT</span>
										</li>
									</ul>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-8.jpg" alt="avt" />
										</div>
										<span>Jacob Jones</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$5050,00</div>
										<span className="text-variant-1">/SqFT</span>
									</div>
								</div>
							</div>
						</div>
						<div className="homeya-box list-style-1">
							<Link href="/property-details-v1" className="images-group">
								<div className="images-style">
									<img src="/images/home/house-sm-4.jpg" alt="img" />
								</div>
								<div className="top">
									<ul className="d-flex">
										<li className="flag-tag style-1">For Sale</li>
									</ul>
									<ul className="d-flex gap-4">
										<li className="box-icon w-28">
											<span className="icon icon-arrLeftRight" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-heart" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-eye" />
										</li>
									</ul>
								</div>
								<div className="bottom">
									<span className="flag-tag style-2">Villa</span>
								</div>
							</Link>
							<div className="content">
								<div className="archive-top">
									<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe </Link></div>
									<div className="desc"><i className="icon icon-mapPin" />
										<p>145 Brooklyn Ave, Califonia, New York</p>
									</div>
									<ul className="meta-list">
										<li className="item">
											<i className="icon icon-bed" />
											<span>4</span>
										</li>
										<li className="item">
											<i className="icon icon-bathtub" />
											<span>2</span>
										</li>
										<li className="item">
											<i className="icon icon-ruler" />
											<span>600 SqFT</span>
										</li>
									</ul>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-10.jpg" alt="avt" />
										</div>
										<span>Floyd Miles</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$250,00</div>
										<span className="text-variant-1">/month</span>
									</div>
								</div>
							</div>
						</div>
						<div className="homeya-box list-style-1">
							<Link href="/property-details-v2" className="images-group">
								<div className="images-style">
									<img src="/images/home/house-sm-1.jpg" alt="img" />
								</div>
								<div className="top">
									<ul className="d-flex">
										<li className="flag-tag style-1">For Sale</li>
									</ul>
									<ul className="d-flex gap-4">
										<li className="box-icon w-28">
											<span className="icon icon-arrLeftRight" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-heart" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-eye" />
										</li>
									</ul>
								</div>
								<div className="bottom">
									<span className="flag-tag style-2">House</span>
								</div>
							</Link>
							<div className="content">
								<div className="archive-top">
									<div className="h7 text-capitalize fw-7"><Link href="/property-details-v2" className="link">Sunset Heights Estate, Beverly Hills</Link></div>
									<div className="desc"><i className="icon icon-mapPin" />
										<p>145 Brooklyn Ave, Califonia, New York</p>
									</div>
									<ul className="meta-list">
										<li className="item">
											<i className="icon icon-bed" />
											<span>4</span>
										</li>
										<li className="item">
											<i className="icon icon-bathtub" />
											<span>2</span>
										</li>
										<li className="item">
											<i className="icon icon-ruler" />
											<span>600 SqFT</span>
										</li>
									</ul>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-5.jpg" alt="avt" />
										</div>
										<span>Ralph Edwards</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$5050,00</div>
										<span className="text-variant-1">/SqFT</span>
									</div>
								</div>
							</div>
						</div>
						<div className="homeya-box list-style-1">
							<Link href="/property-details-v3" className="images-group">
								<div className="images-style">
									<img src="/images/home/house-sm-2.jpg" alt="img" />
								</div>
								<div className="top">
									<ul className="d-flex">
										<li className="flag-tag style-1">For Sale</li>
									</ul>
									<ul className="d-flex gap-4">
										<li className="box-icon w-28">
											<span className="icon icon-arrLeftRight" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-heart" />
										</li>
										<li className="box-icon w-28">
											<span className="icon icon-eye" />
										</li>
									</ul>
								</div>
								<div className="bottom">
									<span className="flag-tag style-2">Office</span>
								</div>
							</Link>
							<div className="content">
								<div className="archive-top">
									<div className="h7 text-capitalize fw-7"><Link href="/property-details-v4" className="link">Lakeview Haven, Lake Tahoe</Link></div>
									<div className="desc"><i className="icon icon-mapPin" />
										<p>145 Brooklyn Ave, Califonia, New York</p>
									</div>
									<ul className="meta-list">
										<li className="item">
											<i className="icon icon-bed" />
											<span>4</span>
										</li>
										<li className="item">
											<i className="icon icon-bathtub" />
											<span>2</span>
										</li>
										<li className="item">
											<i className="icon icon-ruler" />
											<span>600 SqFT</span>
										</li>
									</ul>
								</div>
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-11.jpg" alt="avt" />
										</div>
										<span>Annette Black</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$250,00</div>
										<span className="text-variant-1">/month</span>
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
