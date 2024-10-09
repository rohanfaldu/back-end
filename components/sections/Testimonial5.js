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

export default function Testimonial5() {
	return (
		<>

			<section className="flat-section-v3 bg-surface flat-testimonial">
				<div className="cus-layout-1">
					<div className="row align-items-center">
						<div className="col-lg-3">
							<div className="box-title">
								<div className="text-subtitle text-primary">Top Properties</div>
								<h4 className="mt-4">What’s people say’s</h4>
							</div>
							<p className="text-variant-1">Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
							<div className="box-navigation">
								<div className="navigation swiper-nav-next nav-next-testimonial"><span className="icon icon-arr-l" /></div>
								<div className="navigation swiper-nav-prev nav-prev-testimonial"><span className="icon icon-arr-r" /></div>
							</div>
						</div>
						<div className="col-lg-9">
							<div className="swiper tf-sw-testimonial">
								<Swiper {...swiperOptions} className="swiper-wrapper">
									<SwiperSlide>
										<div className="box-tes-item wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
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
										<div className="box-tes-item wow fadeIn" data-wow-delay=".4s" data-wow-duration="2000ms">
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
										<div className="box-tes-item wow fadeIn" data-wow-delay=".6s" data-wow-duration="2000ms">
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
										<div className="box-tes-item wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
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
		</>
	)
}
