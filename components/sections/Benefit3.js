'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			clickable: true,
			nextEl: ".nav-prev-benefit",
			prevEl: ".nav-next-benefit",
		},
		pagination: {
			el: ".sw-pagination-benefit",
			clickable: true,
		},
}
import Link from "next/link"

export default function Benefit3() {
	return (
		<>

			<section className="flat-benefit-v2">
				<div className="container">
					<div className="row wrap-benefit-v2">
						<div className="col-lg-4 wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
							<div className="box-left">
								<div className="box-title">
									<div className="text-subtitle text-primary">Our Benifit</div>
									<h4 className="mt-4 text-white">Why Choose Homeya</h4>
								</div>
								<p className="description text-white body-3">Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
								<div className="box-navigation">
									<div className="navigation swiper-nav-next nav-next-benefit"><span className="icon icon-arr-l" /></div>
									<div className="navigation swiper-nav-prev nav-prev-benefit"><span className="icon icon-arr-r" /></div>
								</div>
							</div>
						</div>
						<div className="col-lg-8 wow fadeIn" data-wow-delay=".4s" data-wow-duration="2000ms">
							<div className="swiper tf-sw-benefit">
								<Swiper {...swiperOptions} className="swiper-wrapper">
									<SwiperSlide>
										<div className="box-right">
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-proven" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-double-ruler" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="box-right">
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-proven" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-double-ruler" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="box-right">
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-proven" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-double-ruler" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="box-right">
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-proven" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-double-ruler" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
												</div>
											</div>
											<div className="box-benefit style-1">
												<div className="icon-box">
													<span className="icon icon-hand" />
												</div>
												<div className="content">
													<h6 className="title"><Link href="#" className="link">Proven Expertise</Link></h6>
													<p className="description">Our seasoned team excels in real estate with years of successful market navigation.</p>
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
