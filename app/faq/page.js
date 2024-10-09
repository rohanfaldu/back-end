'use client'
import { useState } from 'react';
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function FAQ() {
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<section className="flat-section">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-8">
								<div className="tf-faq">
									<h5>Overview</h5>
									<ul className="box-faq" id="wrapper-faq">
										<li className="faq-item"onClick={() => handleAccordion (1)}>
											<a className={`${isAccordion == 1 ? "faq-header":"faq-header collapsed"}`} >
												Why should I use your services?
											</a>
											<div id="accordion-faq-one" className={`${isAccordion == 1 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (2)}>
											<a className={`${isAccordion == 2 ? "faq-header":"faq-header collapsed"}`} >
												How do I get started with your services?
											</a>
											<div id="accordion-faq-two" className={`${isAccordion == 2 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (3)}>
											<a className={`${isAccordion == 3 ? "faq-header":"faq-header collapsed"}`} >
												How secure are your services?
											</a>
											<div id="accordion-faq-three" className={`${isAccordion == 3 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (4)}>
											<a className={`${isAccordion == 4 ? "faq-header":"faq-header collapsed"}`} >
												Is there customer support available?
											</a>
											<div id="accordion-faq-four" className={`${isAccordion == 4 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (5)}>
											<a className={`${isAccordion == 5 ? "faq-header":"faq-header collapsed"}`} >
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
								<div className="tf-faq">
									<h5>Costs and Payments</h5>
									<ul className="box-faq" id="wrapper-faq-two">
										<li className="faq-item"onClick={() => handleAccordion (6)}>
											<a className={`${isAccordion == 6 ? "faq-header":"faq-header collapsed"}`} >
												How do you calculate fees?
											</a>
											<div id="accordion2-faq-one" className={`${isAccordion == 6 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (7)}>
											<a className={`${isAccordion == 7 ? "faq-header":"faq-header collapsed"}`} >
												How do I pay my invoices?
											</a>
											<div id="accordion2-faq-two" className={`${isAccordion == 7 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (8)}>
											<a className={`${isAccordion == 8 ? "faq-header":"faq-header collapsed"}`} >
												Are there opportunities for discounts or promotions?
											</a>
											<div id="accordio2-faq-three" className={`${isAccordion == 8 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (9)}>
											<a className={`${isAccordion == 9 ? "faq-header":"faq-header collapsed"}`} >
												Are there any hidden fees not displayed in the pricing table?
											</a>
											<div id="accordion2-faq-four" className={`${isAccordion == 9 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (10)}>
											<a className={`${isAccordion == 10 ? "faq-header":"faq-header collapsed"}`} >
												What is the refund procedure?
											</a>
											<div id="accordion2-faq-five" className={`${isAccordion == 10 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (11)}>
											<a className={`${isAccordion == 11 ? "faq-header":"faq-header collapsed"}`} >
												Is there financial or accounting support?
											</a>
											<div id="accordion2-faq-six" className={`${isAccordion == 11 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-two">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
									</ul>
								</div>
								<div className="tf-faq">
									<h5>Safety and Security</h5>
									<ul className="box-faq" id="wrapper-faq-three">
										<li className="faq-item"onClick={() => handleAccordion (12)}>
											<a className={`${isAccordion == 12 ? "faq-header":"faq-header collapsed"}`} >
												What languages does your service support?
											</a>
											<div id="accordion3-faq-one" className={`${isAccordion == 12 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (13)}>
											<a className={`${isAccordion == 13 ? "faq-header":"faq-header collapsed"}`} >
												How do I integrate your service into my system?
											</a>
											<div id="accordion3-faq-two" className={`${isAccordion == 13 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (14)}>
											<a className={`${isAccordion == 14 ? "faq-header":"faq-header collapsed"}`} >
												What are the safety features of your system?
											</a>
											<div id="accordio3-faq-three" className={`${isAccordion == 14 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (15)}>
											<a className={`${isAccordion == 15 ? "faq-header":"faq-header collapsed"}`} >
												How can I request new features?
											</a>
											<div id="accordion3-faq-four" className={`${isAccordion == 15 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (16)}>
											<a className={`${isAccordion == 16 ? "faq-header":"faq-header collapsed"}`} >
												Is my data protected?
											</a>
											<div id="accordion3-faq-five" className={`${isAccordion == 16 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
												<p className="faq-body">
													Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
												</p>
											</div>
										</li>
										<li className="faq-item"onClick={() => handleAccordion (17)}>
											<a className={`${isAccordion == 17 ? "faq-header":"faq-header collapsed"}`} >
												How do I report a technical issue?
											</a>
											<div id="accordion3-faq-six" className={`${isAccordion == 17 ? "collapse show":"collapse"}`} data-bs-parent="#wrapper-faq-three">
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

			</Layout>
		</>
	)
}