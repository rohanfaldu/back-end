'use client'
import { useState } from "react"
import PropertyMap from "@/components/elements/PropertyMap"
import RangeSlider from "@/components/elements/RangeSlider"
import SidebarFilter from "@/components/elements/SidebarFilter"
import TabNav from "@/components/elements/TabNav"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import VideoPopup from "@/components/elements/VideoPopup"
export default function PropertyDetailsV2() {
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<section className="banner-property-2">
						<img src="/images/banner/banner-property-4.jpg" alt="image-banner" />
					</section>
					<section className="flat-categories-single bg-white fixed-cate-single">
						<div className="container">
							<ul className="cate-single-tab">
								<li className="active">
									<Link className="cate-single-item" href="#description">
										Description
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#video">
										Videos
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#amentities">
										Amentities
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#location">
										Location
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#floor">
										Floor
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#file">
										File
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#explore">
										Explore
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#nearby">
										Nearby
									</Link>
								</li>
								<li>
									<Link className="cate-single-item" href="#reviews">
										Reviews
									</Link>
								</li>
							</ul>
						</div>
					</section>
					<section className="flat-section-v6 flat-property-detail-v2">
						<div className="container">
							<div className="row">
								<div className="col-lg-8">
									<div className="wrapper-onepage" id="description">
										<div className="widget-box-header-single">
											<div className="header-property-detail">
												<div className="content-top d-flex justify-content-between align-items-center">
													<div className="box-name">
														<Link href="#" className="flag-tag primary">For Rent</Link>
														<h4 className="title link">Lakeview Haven, Lake Tahoe</h4>
													</div>
													<div className="box-price d-flex align-items-center">
														<h4>$250,00</h4>
														<span className="body-1 text-variant-1">/month</span>
													</div>
												</div>
												<div className="content-bottom">
													<div className="info-box">
														<div className="label">FEATUREs:</div>
														<ul className="meta">
															<li className="meta-item"><span className="icon icon-bed" /> 2 Bedroom</li>
															<li className="meta-item"><span className="icon icon-bathtub" /> 2 Bathroom</li>
															<li className="meta-item"><span className="icon icon-ruler" /> 6,000 SqFT</li>
														</ul>
													</div>
													<ul className="icon-box">
														<li><Link href="#" className="item"><span className="icon icon-arrLeftRight" /> </Link></li>
														<li><Link href="#" className="item"><span className="icon icon-share" /></Link></li>
														<li><Link href="#" className="item"><span className="icon icon-heart" /></Link></li>
													</ul>
												</div>
											</div>
											<div className="single-property-desc">
												<div className="h7 title fw-7">Description</div>
												<p className="body-2 text-variant-1">Located around an hour away from Paris, between the Perche and the Iton valley, in a beautiful wooded park bordered by a charming stream, this country property immediately seduces with its bucolic and soothing environment.</p>
												<p className="mt-8 body-2 text-variant-1">An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (11m x 5m), tennis court, gym and sauna.</p>
												<Link href="#" className="btn-view"><span className="text">View More</span> </Link>
											</div>
											<div className="single-property-overview">
												<div className="h7 title fw-7">Overview</div>
												<ul className="info-box">
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-house-line" /></Link>
														<div className="content">
															<span className="label">ID:</span>
															<span>2297</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-arrLeftRight" /></Link>
														<div className="content">
															<span className="label">Type:</span>
															<span>House</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-bed" /></Link>
														<div className="content">
															<span className="label">Bedrooms:</span>
															<span>2 Rooms</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-bathtub" /></Link>
														<div className="content">
															<span className="label">Bathrooms:</span>
															<span>2 Rooms</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-garage" /></Link>
														<div className="content">
															<span className="label">Garages:</span>
															<span>2 Rooms</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-ruler" /></Link>
														<div className="content">
															<span className="label">Size:</span>
															<span>900 SqFt</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-crop" /></Link>
														<div className="content">
															<span className="label">Land Size:</span>
															<span>2,000 SqFt</span>
														</div>
													</li>
													<li className="item">
														<Link href="#" className="box-icon w-52"><i className="icon icon-hammer" /></Link>
														<div className="content">
															<span className="label">Year Built:</span>
															<span>2024</span>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="video">
										<div className="widget-box-single single-property-video">
											<div className="h7 title fw-7">Video</div>
											<div className="img-video">
												<img src="/images/banner/img-video.jpg" alt="img-video" />
												<VideoPopup />
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="amentities">
										<div className="widget-box-single single-property-info">
											<div className="h7 title fw-7">Property Details</div>
											<div className="row">
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Property ID:</span>
														<div className="content fw-7">AVT1020</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Bedrooms:</span>
														<div className="content fw-7">4</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Price:</span>
														<div className="content fw-7">$250,00<span className="caption-1 fw-4 text-variant-1">/month</span></div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Bedrooms:</span>
														<div className="content fw-7">1</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Property Size:</span>
														<div className="content fw-7">1200 SqFt</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Bathsrooms:</span>
														<div className="content fw-7">1</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Year built:</span>
														<div className="content fw-7">2023 - 12 - 11</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Bathsrooms:</span>
														<div className="content fw-7">3</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Property Type:</span>
														<div className="content fw-7">House, Apartment</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Garage:</span>
														<div className="content fw-7">1</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Property Status:</span>
														<div className="content fw-7">For Rent</div>
													</div>
												</div>
												<div className="col-md-6">
													<div className="inner-box">
														<span className="label">Garage Size:</span>
														<div className="content fw-7">1200 SqFt</div>
													</div>
												</div>
											</div>
										</div>
										<div className="widget-box-single single-property-feature">
											<div className="h7 title fw-7">Amenities and features</div>
											<div className="wrap-feature">
												<div className="box-feature">
													<div className="fw-7">Home safety:</div>
													<ul>
														<li className="feature-item">
															<span className="icon icon-smoke-alarm" />
															Smoke alarm
														</li>
														<li className="feature-item">
															<span className="icon icon-carbon" />
															Carbon monoxide alarm
														</li>
														<li className="feature-item">
															<span className="icon icon-kit" />
															First aid kit
														</li>
														<li className="feature-item">
															<span className="icon icon-lockbox" />
															Self check-in with lockbox
														</li>
														<li className="feature-item">
															<span className="icon icon-security" />
															Security cameras
														</li>
													</ul>
												</div>
												<div className="box-feature">
													<div className="fw-7">Bedroom:</div>
													<ul>
														<li className="feature-item">
															<span className="icon icon-hanger" />
															Hangers
														</li>
														<li className="feature-item">
															<span className="icon icon-bed-line" />
															Bed linens
														</li>
														<li className="feature-item">
															<span className="icon icon-pillows" />
															Extra pillows &amp; blankets
														</li>
														<li className="feature-item">
															<span className="icon icon-iron" />
															Iron
														</li>
														<li className="feature-item">
															<span className="icon icon-tv" />
															TV with standard cable
														</li>
													</ul>
												</div>
												<div className="box-feature">
													<div className="fw-7">Kitchen:</div>
													<ul>
														<li className="feature-item">
															<span className="icon icon-refrigerator" />
															Refrigerator
														</li>
														<li className="feature-item">
															<span className="icon icon-microwave" />
															Microwave
														</li>
														<li className="feature-item">
															<span className="icon icon-microwave" />
															Dishwasher
														</li>
														<li className="feature-item">
															<span className="icon icon-coffee" />
															Coffee maker
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="location">
										<div className="widget-box-single single-property-map">
											<div className="h7 title fw-7">Map</div>
											<PropertyMap singleMap />
											<ul className="info-map">
												<li>
													<div className="fw-7">Address</div>
													<span className="mt-4 text-variant-1">8 Broadway, Brooklyn, New York</span>
												</li>
												<li>
													<div className="fw-7">Downtown</div>
													<span className="mt-4 text-variant-1">5 min</span>
												</li>
												<li>
													<div className="fw-7">FLL</div>
													<span className="mt-4 text-variant-1">15 min</span>
												</li>
											</ul>
										</div>
									</div>
									<div className="wrapper-onepage" id="floor">
										<div className="widget-box-single single-property-floor">
											<div className="h7 title fw-7">Floor plans</div>
											<ul className="box-floor" id="parent-floor">
											<li className="floor-item" onClick={() => handleAccordion(1)}>
												<div className={`${isAccordion == 1 ? "floor-header" : "floor-header collapsed"}`}>
													<div className="inner-left">
														<i className="icon icon-arr-r" />
														<span className="fw-7">First Floor</span>
													</div>
													<ul className="inner-right">
														<li className="d-flex align-items-center gap-8">
															<i className="icon icon-bed" />
															2 Bedroom
														</li>
														<li className="d-flex align-items-center gap-8">
															<i className="icon icon-bathtub" />
															2 Bathroom
														</li>
													</ul>
												</div>
												<div id="floor-one" className={`${isAccordion == 1 ? "collapse show" : "collapse"}`} data-bs-parent="#parent-floor">
													<div className="faq-body">
														<div className="box-img">
															<img src="/images/banner/floor.png" alt="img-floor" />
														</div>
													</div>
												</div>
											</li>
											<li className="floor-item" onClick={() => handleAccordion(2)}>
												<div className={`${isAccordion == 2 ? "floor-header" : "floor-header collapsed"}`}>
													<div className="inner-left">
														<i className="icon icon-arr-r" />
														<span className="fw-7">Second Floor</span>
													</div>
													<ul className="inner-right">
														<li className="d-flex align-items-center gap-8">
															<i className="icon icon-bed" />
															2 Bedroom
														</li>
														<li className="d-flex align-items-center gap-8">
															<i className="icon icon-bathtub" />
															2 Bathroom
														</li>
													</ul>
												</div>
												<div id="floor-two" className={`${isAccordion == 2 ? "collapse show" : "collapse"}`} data-bs-parent="#parent-floor">
													<div className="faq-body">
														<div className="box-img">
															<img src="/images/banner/floor.png" alt="img-floor" />
														</div>
													</div>
												</div>
											</li>
										</ul>
										</div>
									</div>
									<div className="wrapper-onepage" id="file">
										<div className="widget-box-single single-property-attachments">
											<div className="h7 title fw-7">File Attachments</div>
											<div className="row">
												<div className="col-sm-6">
													<Link href="#" target="_blank" className="attachments-item">
														<div className="box-icon w-60">
															<img src="/images/home/file-1.png" alt="file" />
														</div>
														<span>Villa-Document.pdf</span>
														<i className="icon icon-download" />
													</Link>
												</div>
												<div className="col-sm-6">
													<Link href="#" target="_blank" className="attachments-item">
														<div className="box-icon w-60">
															<img src="/images/home/file-2.png" alt="file" />
														</div>
														<span>Villa-Document.pdf</span>
														<i className="icon icon-download" />
													</Link>
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="explore">
										<div className="widget-box-single single-property-explore">
											<div className="h7 title fw-7">Explore Property</div>
											<div className="box-img">
												<img src="/images/banner/img-explore.jpg" alt="img" />
												<div className="box-icon w-80">
													<span className="icon icon-360" />
												</div>
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="nearby">
										<div className="widget-box-single single-property-nearby">
											<div className="h7 title fw-7">What’s nearby?</div>
											<p className="body-2">Explore nearby amenities to precisely locate your property and identify surrounding conveniences, providing a comprehensive overview of the living environment and the property's convenience.</p>
											<div className="grid-2 box-nearby">
												<ul className="box-left">
													<li className="item-nearby">
														<span className="label">School:</span>
														<span className="fw-7">0.7 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">University:</span>
														<span className="fw-7">1.3 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">Grocery center:</span>
														<span className="fw-7">0.6 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">Market:</span>
														<span className="fw-7">1.1 km</span>
													</li>
												</ul>
												<ul className="box-right">
													<li className="item-nearby">
														<span className="label">Hospital:</span>
														<span className="fw-7">0.4 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">Metro station:</span>
														<span className="fw-7">1.8 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">Gym, wellness:</span>
														<span className="fw-7">1.3 km</span>
													</li>
													<li className="item-nearby">
														<span className="label">River:</span>
														<span className="fw-7">2.1 km</span>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="wrapper-onepage" id="reviews">
										<div className="widget-box-single single-wrapper-review">
											<div className="box-title-review d-flex justify-content-between align-items-center flex-wrap gap-20">
												<div className="h7 fw-7">Guest Reviews</div>
												<Link href="#" className="tf-btn">View All Reviews</Link>
											</div>
											<div className="wrap-review">
												<ul className="box-review">
													<li className="list-review-item">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-2.jpg" alt="avatar" />
														</div>
														<div className="content">
															<div className="name h7 fw-7 text-black">Viola Lucas
																<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z" fill="#198754" />
																</svg>
															</div>
															<span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
																2023</span>
															<ul className="mt-8 list-star">
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
															</ul>
															<p className="mt-12 body-2 text-black">It's really easy to use and it is
																exactly what I am looking for. A lot of good looking templates &amp;
																it's highly customizable. Live support is helpful, solved my issue
																in no time.</p>
															<ul className="box-img-review">
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review1.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review2.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review3.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review4.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<span className="fw-7">+12</span>
																	</Link>
																</li>
															</ul>
														</div>
													</li>
													<li className="list-review-item">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-3.jpg" alt="avatar" />
														</div>
														<div className="content">
															<div className="name h7 fw-7 text-black">Viola Lucas
																<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z" fill="#198754" />
																</svg>
															</div>
															<span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
																2023</span>
															<ul className="mt-8 list-star">
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
															</ul>
															<p className="mt-12 body-2 text-black">It's really easy to use and it is
																exactly what I am looking for. A lot of good looking templates &amp;
																it's highly customizable. Live support is helpful, solved my issue
																in no time.</p>
														</div>
													</li>
													<li className="list-review-item">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-4.jpg" alt="avatar" />
														</div>
														<div className="content">
															<div className="name h7 fw-7 text-black">Darlene Robertson
																<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z" fill="#198754" />
																</svg>
															</div>
															<span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13, 2023</span>
															<ul className="mt-8 list-star">
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
															</ul>
															<p className="mt-12 body-2 text-black">It's really easy to use and it is
																exactly what I am looking for. A lot of good looking templates &amp;
																it's highly customizable. Live support is helpful, solved my issue
																in no time.</p>
														</div>
													</li>
													<li className="list-review-item">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-2.jpg" alt="avatar" />
														</div>
														<div className="content">
															<div className="name h7 fw-7 text-black">Viola Lucas
																<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path fillRule="evenodd" clipRule="evenodd" d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z" fill="#198754" />
																</svg>
															</div>
															<span className="mt-4 d-inline-block  date body-3 text-variant-2">August 13,
																2023</span>
															<ul className="mt-8 list-star">
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
																<li className="icon-star" />
															</ul>
															<p className="mt-12 body-2 text-black">It's really easy to use and it is
																exactly what I am looking for. A lot of good looking templates &amp;
																it's highly customizable. Live support is helpful, solved my issue
																in no time.</p>
															<ul className="box-img-review">
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review1.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review2.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review3.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<img src="/images/blog/review4.jpg" alt="img-review" />
																	</Link>
																</li>
																<li>
																	<Link href="#" className="img-review">
																		<span className="fw-7">+12</span>
																	</Link>
																</li>
															</ul>
															<Link href="#" className="view-question">See more answered questions (719)</Link>
														</div>
													</li>
												</ul>
											</div>
											<div className="wrap-form-comment">
												<h6>Leave A comment</h6>
												<div id="comments" className="comments">
													<div className="respond-comment">
														<form method="post" id="contactform" className="comment-form form-submit" action="./contact/contact-process.php" acceptCharset="utf-8" noValidate="novalidate">
															<div className="form-wg group-ip">
																<fieldset>
																	<label className="sub-ip">Name</label>
																	<input type="text" className="form-control" name="text" placeholder="Your name" required />
																</fieldset>
																<fieldset>
																	<label className="sub-ip">Email</label>
																	<input type="email" className="form-control" name="email" placeholder="Your email" required />
																</fieldset>
															</div>
															<fieldset className="form-wg d-flex align-items-center gap-8">
																<input type="checkbox" className="tf-checkbox" id="cb-ip" />
																<label htmlFor="cb-ip" className="text-black text-checkbox">Save your name, email for the next time review </label>
															</fieldset>
															<fieldset className="form-wg">
																<label className="sub-ip">Review</label>
																<textarea id="comment-message" name="message" rows={4} tabIndex={4} placeholder="Write comment " aria-required="true" defaultValue={""} />
															</fieldset>
															<button className="form-wg tf-btn primary" name="submit" type="submit">
																<span>Post Comment</span>
															</button>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="widget-sidebar wrapper-sidebar-right fixed-sidebar-2">
										<div className="widget-box single-property-contact bg-white">
											<div className="h7 title fw-7">Contact Sellers</div>
											<div className="box-avatar">
												<div className="avatar avt-100 round">
													<img src="/images/avatar/avt-12.jpg" alt="avatar" />
												</div>
												<div className="info">
													<div className="text-1 name">Shara Conner</div>
													<span>1-333-345-6868 themesflat@gmail.com</span>
												</div>
											</div>
											<form action="#" className="contact-form">
												<div className="ip-group">
													<label htmlFor="fullname">Full Name:</label>
													<input type="text" placeholder="Jony Dane" className="form-control" />
												</div>
												<div className="ip-group">
													<label htmlFor="phone">Phone Number:</label>
													<input type="text" placeholder="ex 0123456789" className="form-control" />
												</div>
												<div className="ip-group">
													<label htmlFor="email">Email Address:</label>
													<input type="text" placeholder="themesflat@gmail.com" className="form-control" />
												</div>
												<div className="ip-group">
													<label htmlFor="message">Your Message:</label>
													<textarea id="comment-message" name="message" rows={4} tabIndex={4} placeholder="Message" aria-required="true" defaultValue={""} />
												</div>
												<button className="tf-btn primary w-100">Send Message</button>
											</form>
										</div>
										<div className="flat-tab flat-tab-form widget-filter-search widget-box bg-white">
											<div className="h7 title fw-7">Search</div>
											<ul className="nav-tab-form" role="tablist">
											<TabNav />
											</ul>
											<div className="tab-content">
												<div className="tab-pane fade active show" role="tabpanel">
													<div className="form-sl">
														<form method="post">
															<div className="wd-filter-select">
																<div className="inner-group inner-filter">
																	<div className="form-style">
																		<label className="title-select">Keyword</label>
																		<input type="text" className="form-control" placeholder="Search Keyword." name="s" title="Search for" required />
																	</div>
																	<div className="form-style">
																		<label className="title-select">Location</label>
																		<div className="group-ip ip-icon">
																			<input type="text" className="form-control" placeholder="Search Location" name="s" title="Search for" required />
																			<Link href="#" className="icon-right icon-location" />
																		</div>
																	</div>
																	<div className="form-style">
																		<label className="title-select">Type</label>
																		<div className="group-select">
																			<select className="nice-select">

																				<option data-value className="option selected">All</option>
																				<option data-value="villa" className="option">Villa</option>
																				<option data-value="studio" className="option">Studio</option>
																				<option data-value="office" className="option">Office</option>

																			</select>
																		</div>
																	</div>
																	<div className="form-style box-select">
																		<label className="title-select">Rooms</label>
																		<select className="nice-select">

																			<option data-value={2} className="option">1</option>
																			<option data-value={2} className="option selected">2</option>
																			<option data-value={3} className="option">3</option>
																			<option data-value={4} className="option">4</option>
																			<option data-value={5} className="option">5</option>
																			<option data-value={6} className="option">6</option>
																			<option data-value={7} className="option">7</option>
																			<option data-value={8} className="option">8</option>
																			<option data-value={9} className="option">9</option>
																			<option data-value={10} className="option">10</option>
																		</select>
																	</div>
																	<div className="form-style box-select">
																		<label className="title-select">Bathrooms</label>
																		<select className="nice-select">

																			<option data-value="all" className="option">All</option>
																			<option data-value={1} className="option">1</option>
																			<option data-value={2} className="option">2</option>
																			<option data-value={3} className="option">3</option>
																			<option data-value={4} className="option selected">4</option>
																			<option data-value={5} className="option">5</option>
																			<option data-value={6} className="option">6</option>
																			<option data-value={7} className="option">7</option>
																			<option data-value={8} className="option">8</option>
																			<option data-value={9} className="option">9</option>
																			<option data-value={10} className="option">10</option>
																		</select>
																	</div>
																	<div className="form-style box-select">
																		<label className="title-select">Bedrooms</label>
																		<select className="nice-select">

																			<option data-value={1} className="option">All</option>
																			<option data-value={1} className="option">1</option>
																			<option data-value={2} className="option">2</option>
																			<option data-value={3} className="option">3</option>
																			<option data-value={4} className="option selected">4</option>
																			<option data-value={5} className="option">5</option>
																			<option data-value={6} className="option">6</option>
																			<option data-value={7} className="option">7</option>
																			<option data-value={8} className="option">8</option>
																			<option data-value={9} className="option">9</option>
																			<option data-value={10} className="option">10</option>
																		</select>
																	</div>
																	<div className="form-style widget-price">
																		<RangeSlider />
																	</div>
																	<div className="form-style widget-price wd-price-2">
																		<RangeSlider />
																	</div>
																	<SidebarFilter />
																	<div className="form-style">
																		<button type="submit" className="tf-btn primary" href="#">Find Properties</button>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
										<div className="widget-box single-property-loan-v2 bg-white">
											<div className="h7 title fw-7">Loan Calculator</div>
											<form action="#" className="box-loan-calc">
												<div className="box-top">
													<div className="item-calc">
														<label htmlFor="loan1" className="label">Total Amount:</label>
														<input type="number" id="loan1" placeholder="10,000" className="form-control" />
													</div>
													<div className="item-calc">
														<label htmlFor="loan1" className="label">Down Payment:</label>
														<input type="number" id="loan1" placeholder={3000} className="form-control" />
													</div>
													<div className="item-calc">
														<label htmlFor="loan1" className="label">Amortization Period (months):</label>
														<input type="number" id="loan1" placeholder={12} className="form-control" />
													</div>
													<div className="item-calc">
														<label htmlFor="loan1" className="label">Interest rate (%):</label>
														<input type="number" id="loan1" placeholder={5} className="form-control" />
													</div>
												</div>
												<div className="box-bottom">
													<button className="tf-btn primary">Calculator</button>
													<div className="d-flex gap-4 justify-content-between">
														<span className="h7 fw-7">Monthly Payment:</span>
														<span className="result h7 fw-7">$599.25</span>
													</div>
												</div>
											</form>
										</div>
										<div className="widget-box bg-surface box-latest-property bg-white">
											<div className="h7 fw-7 title">Latest Propeties</div>
											<ul>
												<li className="latest-property-item">
													<Link href="/property-details-v1" className="images-style">
														<img src="/images/home/house-sm-3.jpg" alt="img" />
													</Link>
													<div className="content">
														<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Casa Lomas de Mach...</Link></div>
														<ul className="meta-list">
															<li className="item">
																<span>Bed:</span>
																<span className="fw-7">4</span>
															</li>
															<li className="item">
																<span>Bath:</span>
																<span className="fw-7">2</span>
															</li>
															<li className="item">
																<span className="fw-7">600 SqFT</span>
															</li>
														</ul>
														<div className="d-flex align-items-center">
															<div className="h7 fw-7">$5050,00</div>
															<span className="text-variant-1">/SqFT</span>
														</div>
													</div>
												</li>
												<li className="latest-property-item">
													<Link href="/property-details-v1" className="images-style">
														<img src="/images/home/house-sm-9.jpg" alt="img" />
													</Link>
													<div className="content">
														<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Lakeview Haven...</Link></div>
														<ul className="meta-list">
															<li className="item">
																<span>Bed:</span>
																<span className="fw-7">4</span>
															</li>
															<li className="item">
																<span>Bath:</span>
																<span className="fw-7">2</span>
															</li>
															<li className="item">
																<span className="fw-7">600 SqFT</span>
															</li>
														</ul>
														<div className="d-flex align-items-center">
															<div className="h7 fw-7">$5050,00</div>
															<span className="text-variant-1">/SqFT</span>
														</div>
													</div>
												</li>
												<li className="latest-property-item">
													<Link href="/property-details-v1" className="images-style">
														<img src="/images/home/house-sm-1.jpg" alt="img" />
													</Link>
													<div className="content">
														<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">Sunset Heights Estate</Link></div>
														<ul className="meta-list">
															<li className="item">
																<span>Bed:</span>
																<span className="fw-7">4</span>
															</li>
															<li className="item">
																<span>Bath:</span>
																<span className="fw-7">2</span>
															</li>
															<li className="item">
																<span className="fw-7">600 SqFT</span>
															</li>
														</ul>
														<div className="d-flex align-items-center">
															<div className="h7 fw-7">$5050,00</div>
															<span className="text-variant-1">/SqFT</span>
														</div>
													</div>
												</li>
												<li className="latest-property-item">
													<Link href="/property-details-v1" className="images-style">
														<img src="/images/home/house-sm-4.jpg" alt="img" />
													</Link>
													<div className="content">
														<div className="h7 text-capitalize fw-7"><Link href="/property-details-v1" className="link">de Machalí Machas...</Link></div>
														<ul className="meta-list">
															<li className="item">
																<span>Bed:</span>
																<span className="fw-7">4</span>
															</li>
															<li className="item">
																<span>Bath:</span>
																<span className="fw-7">2</span>
															</li>
															<li className="item">
																<span className="fw-7">600 SqFT</span>
															</li>
														</ul>
														<div className="d-flex align-items-center">
															<div className="h7 fw-7">$5050,00</div>
															<span className="text-variant-1">/SqFT</span>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div className="widget-box single-property-whychoose bg-white">
											<div className="h7 title fw-7">Why Choose Us?</div>
											<ul className="box-whychoose">
												<li className="item-why">
													<i className="icon icon-secure" />
													Secure Booking
												</li>
												<li className="item-why">
													<i className="icon icon-guarantee" />
													Best Price Guarantee
												</li>
												<li className="item-why">
													<i className="icon icon-booking" />
													Easy Booking Process
												</li>
												<li className="item-why">
													<i className="icon icon-support" />
													Available Support 24/7
												</li>
											</ul>
										</div>
									</div>
								</div >
							</div >
						</div >
					</section >
				</div >

			</Layout >
		</>
	)
}