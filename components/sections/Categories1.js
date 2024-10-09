'use client'
import Link from "next/link"
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
			slidesPerView: 6,
			spaceBetween: 30,
		},
	},
}

export default function Categories1() {
	return (
		<>

			<section className="flat-section flat-categories">
				<div className="container">
					<div className="box-title style-1 wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="box-left">
							<div className="text-subtitle text-primary">Property Type</div>
							<h4 className="mt-4">Try Searching For</h4>
						</div>
						<Link href="#" className="btn-view"><span className="text">View All Services</span> <span className="icon icon-arrow-right2" /> </Link>
					</div>
					<div className="wrap-categories  wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="swiper tf-sw-categories" data-preview-lg={6} data-preview-md={4} data-preview-sm={3} data-space={30}>
							<Swiper {...swiperOptions} className="swiper-wrapper">
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-apartment" />
										</div>
										<div className="content text-center">
											<h6>Apartment</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-villa" />
										</div>
										<div className="content text-center">
											<h6>Villa</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories active">
										<div className="icon-box">
											<span className="icon icon-studio" />
										</div>
										<div className="content text-center">
											<h6>Studio</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<p className="icon icon-office" />
										</div>
										<div className="content text-center">
											<h6>Office</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<p className="icon icon-townhouse" />
										</div>
										<div className="content text-center">
											<h6>Townhouse</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-commercial" />
										</div>
										<div className="content text-center">
											<h6>Commercial</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-apartment" />
										</div>
										<div className="content text-center">
											<h6>Apartment</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<p className="icon icon-townhouse" />
										</div>
										<div className="content text-center">
											<h6>Townhouse</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-commercial" />
										</div>
										<div className="content text-center">
											<h6>Commercial</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
								<SwiperSlide>
									<Link href="#" className="homeya-categories">
										<div className="icon-box">
											<span className="icon icon-apartment" />
										</div>
										<div className="content text-center">
											<h6>Apartment</h6>
											<p className="mt-4 text-variant-1">234 Property</p>
										</div>
									</Link>
								</SwiperSlide>
							</Swiper>
						</div>
						<div className="box-navigation">
							<div className="navigation style-1 swiper-nav-next nav-next-category"><span className="icon icon-arr-l" /></div>
							<div className="navigation style-1 swiper-nav-prev nav-prev-category"><span className="icon icon-arr-r" /></div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
