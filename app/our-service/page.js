'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
	spaceBetween: 30,
	navigation: {
		clickable: true,
		nextEl: ".nav-prev-testimonial",
		prevEl: ".nav-next-testimonial",
	},
	pagination: {
		el: ".sw-pagination-testimonial",
		clickable: true,
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		991: {
			slidesPerView: 2,
			spaceBetween: 20,
		},

		1550: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	},
}
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function OurService() {
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Services">
				<div>
					<section className="flat-section flat-service-v3">
						<div className="container">
							<div className="box-title text-center">
								<div className="text-subtitle text-primary">Our Services</div>
								<h4 className="mt-4">What We Do?</h4>
							</div>
							<div className="row">
								<div className="box col-lg-4 col-md-6">
									<div className="box-service style-2">
										<div className="icon-box">
											<span className="icon icon-buy-home" />
										</div>
										<div className="content">
											<h6 className="title">Buy A New Home</h6>
											<p className="description">Explore diverse properties and expert guidance for a seamless buying experience.</p>
											<Link href="#" className="tf-btn size-1">Find A Home</Link>
										</div>
									</div>
								</div>
								<div className="box col-lg-4 col-md-6">
									<div className="box-service style-2 active">
										<div className="icon-box">
											<span className="icon icon-rent-home" />
										</div>
										<div className="content">
											<h6 className="title">Rent a home</h6>
											<p className="description">Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
											<Link href="#" className="tf-btn size-1">Find A Rental</Link>
										</div>
									</div>
								</div>
								<div className="box col-lg-4 col-md-6">
									<div className="box-service style-2">
										<div className="icon-box">
											<span className="icon icon-sale-home" />
										</div>
										<div className="content">
											<h6 className="title">Sell a home</h6>
											<p className="description">Showcasing your property's best features for a successful sale.</p>
											<Link href="#" className="tf-btn size-1">Submit Property</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* End Service */}
					{/* Testimonial */}
					<section className="flat-section-v3 bg-surface flat-testimonial">
						<div className="cus-layout-1">
							<div className="row align-items-center">
								<div className="col-lg-3">
									<div className="box-title">
										<div className="text-subtitle text-primary">Top Properties</div>
										<h4 className="mt-4">What’s people say’s</h4>
									</div>
									<p className="text-variant-1 p-16">Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
									<div className="box-navigation">
										<div className="navigation swiper-nav-next nav-next-testimonial"><span className="icon icon-arr-l" /></div>
										<div className="navigation swiper-nav-prev nav-prev-testimonial"><span className="icon icon-arr-r" /></div>
									</div>
								</div>
								<div className="col-lg-9">
									<div className="swiper tf-sw-testimonial">
										<Swiper {...swiperOptions} className="swiper-wrapper">
											<SwiperSlide>
												<div className="box-tes-item">
													<ul className="list-star">
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
													</ul>
													<p className="note body-1">
														"I truly appreciate the professionalism and in-depth knowledge of the brokerage team. They not only helped me find the perfect home but also assisted with legal and financial aspects, making me feel confident and secure in my decision."
													</p>
													<div className="box-avt d-flex align-items-center gap-12">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-7.jpg" alt="avatar" />
														</div>
														<div className="info">
															<div className="h7 fw-7">Liam Anderson</div>
															<p className="text-variant-1 mt-4">CEO Digital</p>
														</div>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="box-tes-item">
													<ul className="list-star">
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
													</ul>
													<p className="note body-1">
														"My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."
													</p>
													<div className="box-avt d-flex align-items-center gap-12">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-5.jpg" alt="avatar" />
														</div>
														<div className="info">
															<div className="h7 fw-7">Adam Will</div>
															<p className="text-variant-1 mt-4">CEO Agency</p>
														</div>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="box-tes-item">
													<ul className="list-star">
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
													</ul>
													<p className="note body-1">
														"My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively."
													</p>
													<div className="box-avt d-flex align-items-center gap-12">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-5.jpg" alt="avatar" />
														</div>
														<div className="info">
															<div className="h7 fw-7">Adam Will</div>
															<p className="text-variant-1 mt-4">CEO Agency</p>
														</div>
													</div>
												</div>
											</SwiperSlide>
											<SwiperSlide>
												<div className="box-tes-item">
													<ul className="list-star">
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
														<li className="icon icon-star" />
													</ul>
													<p className="note body-1">
														"I truly appreciate the professionalism and in-depth knowledge of the brokerage team. They not only helped me find the perfect home but also assisted with legal and financial aspects, making me feel confident and secure in my decision."
													</p>
													<div className="box-avt d-flex align-items-center gap-12">
														<div className="avatar avt-60 round">
															<img src="/images/avatar/avt-7.jpg" alt="avatar" />
														</div>
														<div className="info">
															<div className="h7 fw-7">Liam Anderson</div>
															<p className="text-variant-1 mt-4">CEO Digital</p>
														</div>
													</div>
												</div>
											</SwiperSlide>
										</Swiper>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* End Testimonial */}
					{/* faq */}
					<section className="flat-section">
						<div className="container">
							<div className="box-title text-center">
								<div className="text-subtitle text-primary">Faqs</div>
								<h4 className="mt-4">Quick answers to questions</h4>
							</div>
							<div className="row justify-content-center">
								<div className="col-lg-8">
									<div className="tf-faq">
										<ul className="box-faq" id="wrapper-faq">
											<li className="faq-item"onClick={() => handleAccordion (1)}>
												<a className={`${isAccordion == 1 ? "faq-header":"faq-header collapsed"}`}>
													Why should I use your services?
												</a>
												<div id="accordion-faq-one" className={`${isAccordion == 1 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item"onClick={() => handleAccordion (2)}>
												<a className={`${isAccordion == 2 ? "faq-header":"faq-header collapsed"}`}>
													How do I get started with your services?
												</a>
												<div id="accordion-faq-two" className={`${isAccordion == 2 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item"onClick={() => handleAccordion (3)}>
												<a className={`${isAccordion == 3 ? "faq-header":"faq-header collapsed"}`}>
													How secure are your services?
												</a>
												<div id="accordion-faq-three" className={`${isAccordion == 3 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item"onClick={() => handleAccordion (4)}>
												<a className={`${isAccordion == 4 ? "faq-header":"faq-header collapsed"}`}>
													Is there customer support available?
												</a>
												<div id="accordion-faq-four" className={`${isAccordion == 4 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item"onClick={() => handleAccordion (5)}>
												<a className={`${isAccordion == 5 ? "faq-header":"faq-header collapsed"}`}>
													How can I update my account information?
												</a>
												<div id="accordion-faq-five" className={`${isAccordion == 5 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* faq */}
					{/* banner */}
					<section className="flat-section pt-0 flat-banner">
						<div className="container">
							<div className="wrap-banner bg-surface">
								<div className="box-left">
									<div className="box-title">
										<div className="text-subtitle text-primary">Become Partners</div>
										<h4 className="mt-4">List your Properties on Homeya, join Us Now!</h4>
									</div>
									<Link href="#" className="tf-btn primary size-1">Become A Hosting</Link>
								</div>
								<div className="box-right">
									<img src="/images/banner/banner.png" alt="image" />
								</div>
							</div>
						</div>
					</section>
				</div>

			</Layout>
		</>
	)
}