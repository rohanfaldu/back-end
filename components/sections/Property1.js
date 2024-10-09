
import Link from "next/link"

export default function Property1() {
	return (
		<>

			<section className="flat-section flat-property">
				<div className="container">
					<div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-left">
							<div className="text-subtitle text-primary">Top Properties</div>
							<h4 className="mt-4">Best Property Value</h4>
						</div>
						<Link href="#" className="tf-btn primary size-1">View All</Link>
					</div>
					<div className="wrap-property">
						<div className="box-left  wow fadeInLeftSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
							<div className="homeya-box lg">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-7.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8">
												<li className="flag-tag success style-3">Featured</li>
												<li className="flag-tag style-1 style-3">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-40">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-40">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-40">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">VILLA</span>
										</div>
									</Link>
									<div className="content">
										<h5 className="text-capitalize"><Link href="/property-details-v1" className="link"> Rancho Vista Verde, Santa Barbara</Link></h5>
										<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
										<p className="note">"I truly appreciate the professionalism and in-depth...</p>
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
								</div>
								<div className="archive-bottom d-flex justify-content-between align-items-center">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-11.jpg" alt="avt" />
										</div>
										<span className="body-2">Floyd Miles</span>
									</div>
									<div className="d-flex align-items-center">
										<h6>$250,00</h6>
										<span className="text-variant-1">/month</span>
									</div>
								</div>
							</div>
						</div>
						<div className="box-right wow fadeInRightSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
							<div className="homeya-box list-style-1">
								<Link href="/property-details-v1" className="images-group">
									<div className="images-style">
										<img src="/images/home/house-sm-1.jpg" alt="img" />
									</div>
									<div className="top">
										<ul className="d-flex gap-4 flex-wrap flex-column">
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
										<span className="flag-tag style-2">House</span>
									</div>
								</Link>
								<div className="content">
									<div className="archive-top">
										<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
										<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
								<Link href="/property-details-v1" className="images-group">
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
										<span className="flag-tag style-2">Villa</span>
									</div>
								</Link>
								<div className="content">
									<div className="archive-top">
										<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Casa Lomas de Machalí Machas</Link></div>
										<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
												<img src="/images/avatar/avt-7.jpg" alt="avt" />
											</div>
											<span>Annette Black</span>
										</div>
										<div className="d-flex align-items-center">
											<div className="h7 fw-7">$250,00</div>
											<span className="text-variant-1">/SqFT</span>
										</div>
									</div>
								</div>
							</div>
							<div className="homeya-box list-style-1">
								<Link href="/property-details-v1" className="images-group">
									<div className="images-style">
										<img src="/images/home/house-sm-3.jpg" alt="img" />
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
										<span className="flag-tag style-2">Studio</span>
									</div>
								</Link>
								<div className="content">
									<div className="archive-top">
										<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Coastal Serenity Cottage</Link></div>
										<div className="desc"><i className="icon icon-mapPin" /><p>145 Brooklyn Ave, Califonia, New York</p> </div>
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
											<span>Tony Nguyen</span>
										</div>
										<div className="d-flex align-items-center">
											<div className="h7 fw-7">$5050,00</div>
											<span className="text-variant-1">/SqFT</span>
										</div>
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
