'use client'
import Link from "next/link"
import { useState } from 'react'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Slider4() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	// Swiper options for the main slider
	const mainSwiperOptions = {
		thumbs: { swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null },
		modules: [FreeMode, Navigation, Thumbs],
		spaceBetween: 0,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 500,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
	}

	// Swiper options for the thumbnail slider
	const thumbnailSwiperOptions = {
		modules: [FreeMode, Navigation, Thumbs],
		spaceBetween: 0,
		slidesPerView: 4,
		freeMode: true,
		direction: "vertical",
		watchSlidesProgress: true,
	}
	return (
		<>

			<section className="flat-slider home-5">
				<div className="wrap-slider-swiper">
					<div className="swiper-container thumbs-swiper-column">
						<Swiper {...mainSwiperOptions} className="swiper-wrapper">
							<SwiperSlide>
								<div className="box-img">
									<img src="/images/slider/slider-5.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="box-img">
									<img src="/images/slider/slider-5-1.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="box-img">
									<img src="/images/slider/slider-5-2.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="box-img">
									<img src="/images/slider/slider-5-3.jpg" alt="images" />
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="swiper-container thumbs-swiper-column1 swiper-pagination5">
						<Swiper {...thumbnailSwiperOptions} onSwiper={setThumbsSwiper} className="swiper-wrapper">
							<SwiperSlide>
								<div className="image-detail">
									<img src="/images/slider/slider-pagi.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="image-detail">
									<img src="/images/slider/slider-pagi2.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="image-detail">
									<img src="/images/slider/slider-pagi3.jpg" alt="images" />
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="image-detail">
									<img src="/images/slider/slider-pagi4.jpg" alt="images" />
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<div className="info-box">
								<div className="box-top">
									<div className="d-flex gap-8">
										<Link href="#" className="flag-tag success">Featured</Link>
										<Link href="#" className="flag-tag">For Sale</Link>
									</div>
									<h6 className="title"><Link href="#">Rancho Vista Verde, Santa Barbara</Link></h6>
									<div className="desc"><i className="fs-16 icon icon-mapPin" /><p>33 Maple Street, San Francisco, California</p> </div>
									<ul className="meta-list">
										<li className="item">
											<i className="icon icon-bed" />
											<span>4 Bed</span>
										</li>
										<li className="item">
											<i className="icon icon-bathtub" />
											<span>2 bath</span>
										</li>
										<li className="item">
											<i className="icon icon-ruler" />
											<span>6000 SqFT</span>
										</li>
									</ul>
								</div>
								<div className="box-bottom">
									<div className="d-flex gap-8 align-items-center">
										<div className="avatar avt-40 round">
											<img src="/images/avatar/avt-5.jpg" alt="avt" />
										</div>
										<span>Ralph Edwards</span>
									</div>
									<div className="d-flex align-center">
										<h6>$5050,00</h6>
										<span className="text-variant-1">/SqFT</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
