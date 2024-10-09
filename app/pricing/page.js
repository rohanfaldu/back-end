'use client'
import { useState } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Pricing() {
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Pricing">
				<div>
					<section className="flat-section flat-pricing">
						<div className="container">
							<div className="box-title text-center">
								<div className="text-subtitle text-primary">Pricing</div>
								<h4 className="mt-4">Our Subscription</h4>
							</div>
							<div className="row">
								<div className="box col-lg-3 col-md-6">
									<div className="box-pricing">
										<div className="price d-flex align-items-end">
											<h4>$20</h4>
											<span className="body-2 text-variant-1">/month</span>
										</div>
										<div className="box-title-price">
											<h6 className="title">Intro</h6>
											<p className="desc">Join us every month for a very reasonable price</p>
										</div>
										<ul className="list-price">
											<li className="item">
												<span className="check-icon icon-tick" />
												Transportation for you
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												A hotel or homestay.
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												Free meals and drinks.
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												24/7 Support
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												Unlimited users
											</li>
										</ul>
										<Link href="#" className="tf-btn">Choose The Package</Link>
									</div>
								</div>
								<div className="box col-lg-3 col-md-6">
									<div className="box-pricing">
										<div className="price d-flex align-items-end">
											<h4>$20</h4>
											<span className="body-2 text-variant-1">/month</span>
										</div>
										<div className="box-title-price">
											<h6 className="title">Intro</h6>
											<p className="desc">Join us every month for a very reasonable price</p>
										</div>
										<ul className="list-price">
											<li className="item">
												<span className="check-icon icon-tick" />
												Transportation for you
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												A hotel or homestay.
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												Free meals and drinks.
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												24/7 Support
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												Unlimited users
											</li>
										</ul>
										<Link href="#" className="tf-btn">Choose The Package</Link>
									</div>
								</div>
								<div className="box col-lg-3 col-md-6">
									<div className="box-pricing active">
										<span className="tag">MOST POPULAR</span>
										<div className="price d-flex align-items-end">
											<h4>$20</h4>
											<span className="body-2 text-variant-1">/month</span>
										</div>
										<div className="box-title-price">
											<h6 className="title">Intro</h6>
											<p className="desc">Join us every month for a very reasonable price</p>
										</div>
										<ul className="list-price">
											<li className="item">
												<span className="check-icon icon-tick" />
												Transportation for you
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												A hotel or homestay.
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												Free meals and drinks.
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												24/7 Support
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												Unlimited users
											</li>
										</ul>
										<Link href="#" className="tf-btn">Choose The Package</Link>
									</div>
								</div>
								<div className="box col-lg-3 col-md-6">
									<div className="box-pricing">
										<div className="price d-flex align-items-end">
											<h4>$20</h4>
											<span className="body-2 text-variant-1">/month</span>
										</div>
										<div className="box-title-price">
											<h6 className="title">Intro</h6>
											<p className="desc">Join us every month for a very reasonable price</p>
										</div>
										<ul className="list-price">
											<li className="item">
												<span className="check-icon icon-tick" />
												Transportation for you
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												A hotel or homestay.
											</li>
											<li className="item">
												<span className="check-icon icon-tick" />
												Free meals and drinks.
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												24/7 Support
											</li>
											<li className="item">
												<span className="check-icon icon-tick disable" />
												Unlimited users
											</li>
										</ul>
										<Link href="#" className="tf-btn">Choose The Package</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="flat-section pt-0">
						<div className="container">
							<div className="box-title text-center">
								<div className="text-subtitle text-primary">Faqs</div>
								<h4 className="mt-4">Quick answers to questions</h4>
							</div>
							<div className="row justify-content-center">
								<div className="col-lg-8">
									<div className="tf-faq">
										<ul className="box-faq" id="wrapper-faq">
											<li className="faq-item" onClick={() => handleAccordion(1)}>
												<a className={`${isAccordion == 1 ? "faq-header" : "faq-header collapsed"}`} >
													Why should I use your services?
												</a>
												<div id="accordion-faq-one" className={`${isAccordion == 1 ? "collapse show" : "collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item" onClick={() => handleAccordion(2)}>
												<a className={`${isAccordion == 2 ? "faq-header" : "faq-header collapsed"}`} >
													How do I get started with your services?
												</a>
												<div id="accordion-faq-two" className={`${isAccordion == 2 ? "collapse show" : "collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item" onClick={() => handleAccordion(3)}>
												<a className={`${isAccordion == 3 ? "faq-header" : "faq-header collapsed"}`} >
													How secure are your services?
												</a>
												<div id="accordion-faq-three" className={`${isAccordion == 3 ? "collapse show" : "collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item" onClick={() => handleAccordion(4)}>
												<a className={`${isAccordion == 4 ? "faq-header" : "faq-header collapsed"}`} >
													Is there customer support available?
												</a>
												<div id="accordion-faq-four" className={`${isAccordion == 4 ? "collapse show" : "collapse"}`} data-bs-parent="#wrapper-faq">
													<p className="faq-body">
														Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
													</p>
												</div>
											</li>
											<li className="faq-item" onClick={() => handleAccordion(5)}>
												<a className={`${isAccordion == 5 ? "faq-header" : "faq-header collapsed"}`} >
													How can I update my account information?
												</a>
												<div id="accordion-faq-five" className={`${isAccordion == 5 ? "collapse show" : "collapse"}`} data-bs-parent="#wrapper-faq">
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
				</div>

			</Layout>
		</>
	)
}