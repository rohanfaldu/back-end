import Link from "next/link"
import PropertyMap from "../elements/PropertyMap"

export default function Recommended6() {
	return (
		<>

			<section className="wrapper-layout">
				<div className="wrap-left">
					<h4 className="title">Discovery Properties Near You</h4>
					<div className="row">
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-1.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">Studio</span>
										</div>
									</Link>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v1" className="link">Casa Lomas de Machalí</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>15 Willow Street, Seattle, WA</p>
										</div>
										<ul className="meta-list">
											<li className="item">
												<i className="icon icon-bed" />
												<span>3</span>
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
									<p>Apród Endre</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$7250,00</div>
										<p className="text-variant-1">/SqFT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<div href="/property-details-v2" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-2.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">Apartment</span>
										</div>
									</div>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v2" className="link">Villa del Mar Retreat</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>22 Pine Avenue, San Francisco, CA</p>
										</div>
										<ul className="meta-list">
											<li className="item">
												<i className="icon icon-bed" />
												<span>3</span>
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
									<p>Rámai Ivette</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$250,00</div>
										<p className="text-variant-1">/SqFT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-3.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">Villa</span>
										</div>
									</Link>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v1" className="link">Rancho Vista Verde</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>5 Magnolia Drive, Miami, FL</p>
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
								</div>
								<div className="archive-bottom d-flex justify-content-between align-items-center">
									<p>Kende Attila</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$5050,00</div>
										<p className="text-variant-1">/SqFT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-4.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">House</span>
										</div>
									</Link>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v1" className="link">Sunset Heights Estate</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>10 Oakwood Lane, Chicago, IL</p>
										</div>
										<ul className="meta-list">
											<li className="item">
												<i className="icon icon-bed" />
												<span>3</span>
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
									<p>Szigmund Kálmán</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$250,00</div>
										<p className="text-variant-1">/month</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-5.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">Office</span>
										</div>
									</Link>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v1" className="link">Coastal Serenity Cottage</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>25 Elm Street, Portland, OR</p>
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
								</div>
								<div className="archive-bottom d-flex justify-content-between align-items-center">
									<p>Orosz Boldizsár</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$2050,00</div>
										<p className="text-variant-1">/SqFT</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<div className="homeya-box md">
								<div className="archive-top">
									<Link href="/property-details-v1" className="images-group">
										<div className="images-style">
											<img src="/images/home/house-6.jpg" alt="img" />
										</div>
										<div className="top">
											<ul className="d-flex gap-8 flex-column">
												<li className="flag-tag success">Featured</li>
												<li className="flag-tag style-1">For Sale</li>
											</ul>
											<ul className="d-flex gap-4">
												<li className="box-icon w-32">
													<span className="icon icon-arrLeftRight" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-heart" />
												</li>
												<li className="box-icon w-32">
													<span className="icon icon-eye" />
												</li>
											</ul>
										</div>
										<div className="bottom">
											<span className="flag-tag style-2">Studio</span>
										</div>
									</Link>
									<div className="content">
										<div className="text-1 text-capitalize"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link></div>
										<div className="desc"><i className="fs-16 icon icon-mapPin" />
											<p>12 Spruce Avenue, Denver, CO</p>
										</div>
										<ul className="meta-list">
											<li className="item">
												<i className="icon icon-bed" />
												<span>2</span>
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
									<p>Fekete Csanád</p>
									<div className="d-flex align-items-center">
										<div className="h7 fw-7">$250,00</div>
										<p className="text-variant-1">/month</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="wrap-right">
					<PropertyMap />
				</div>
			</section>

		</>
	)
}
