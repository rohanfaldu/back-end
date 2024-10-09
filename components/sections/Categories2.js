'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 2,
		spaceBetween: 30,
		navigation: {
			clickable: true,
			nextEl: ".nav-prev-category",
			prevEl: ".nav-next-category",
		},
		pagination: {
			el: ".sw-pagination-category",
			clickable: true,
		},
		breakpoints: {
			600: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			800: {
				slidesPerView: 4,
				spaceBetween: 30,
			},

			1300: {
				slidesPerView: 5,
				spaceBetween: 40,
			},
		},
}
import Link from "next/link"

export default function Categories2() {
	return (
		<>

			<section className="flat-section-v3 flat-categories-v2">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-white">Property Type</div>
						<h4 className="mt-4 text-white">Try Searching For</h4>
					</div>
					<div className="swiper tf-sw-categories wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms" data-preview-lg={5} data-preview-md={4} data-preview-sm={3} data-space={40}>
						<Swiper {...swiperOptions} className="swiper-wrapper">
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<span className="icon icon-apartment" />
									</div>
									<div className="content text-center">
										<h6>Apartment</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<span className="icon icon-villa" />
									</div>
									<div className="content text-center">
										<h6>Villa</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories active style-1">
									<div className="box-icon w-80 round">
										<span className="icon icon-studio" />
									</div>
									<div className="content text-center">
										<h6>Studio</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<p className="icon icon-office" />
									</div>
									<div className="content text-center">
										<h6>Office</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<p className="icon icon-townhouse" />
									</div>
									<div className="content text-center">
										<h6>Townhouse</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<span className="icon icon-commercial" />
									</div>
									<div className="content text-center">
										<h6>Commercial</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories style-1">
									<div className="box-icon w-80 round">
										<span className="icon icon-apartment" />
									</div>
									<div className="content text-center">
										<h6>Apartment</h6>
										<p className="mt-4 text-variant-1">234 Property</p>
									</div>
								</Link>
							</SwiperSlide>
							
						</Swiper>
						<div className="sw-pagination sw-pagination-category" />
					</div>
				</div>
			</section>
		</>
	)
}
