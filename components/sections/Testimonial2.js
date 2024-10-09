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
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
}

export default function Testimonial2() {
	return (
		<>

			<section className="flat-section-v2 flat-testimonial-v2  wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
				<div className="container">
					<div className="box-title text-center position-relative">
						<div className="text-subtitle text-white">Our Testimonials</div>
						<h4 className="mt-4 text-white">What’s people say’s</h4>
					</div>
					<Swiper {...swiperOptions} className="swiper tf-sw-testimonial">
						<div className="swiper-wrapper">
							<SwiperSlide>
								<div className="box-tes-item style-1">
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
									<p className="note body-1">
										"I truly appreciate the professionalism and in-depth knowledge of the brokerage
										team. They not only helped me find the perfect home but also assisted with legal
										and financial aspects, making me feel confident and secure in my decision."
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
								<div className="box-tes-item style-1">
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
									<p className="note body-1">
										"My experience with property management services has exceeded expectations. They
										efficiently manage properties with a professional and attentive approach in
										every situation. I feel reassured that any issue will be resolved promptly and
										effectively."
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
								<div className="box-tes-item style-1">
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
									<p className="note body-1">
										"My experience with property management services has exceeded expectations. They
										efficiently manage properties with a professional and attentive approach in
										every situation. I feel reassured that any issue will be resolved promptly and
										effectively."
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
								<div className="box-tes-item style-1">
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
									<p className="note body-1">
										"I truly appreciate the professionalism and in-depth knowledge of the brokerage
										team. They not only helped me find the perfect home but also assisted with legal
										and financial aspects, making me feel confident and secure in my decision."
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
								<div className="box-tes-item style-1">
									<ul className="list-star">
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
										<li className="icon icon-star" />
									</ul>
									<p className="note body-1">
										"I truly appreciate the professionalism and in-depth knowledge of the brokerage
										team. They not only helped me find the perfect home but also assisted with legal
										and financial aspects, making me feel confident and secure in my decision."
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
						</div>
						<div className="sw-pagination sw-pagination-testimonial" />
						{/* <div className="tf-mouse tf-mouse-outer"></div>
                  <div className="tf-mouse tf-mouse-inner"></div> */}
					</Swiper>
				</div>
			</section>
		</>
	)
}
