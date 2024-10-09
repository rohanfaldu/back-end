'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	autoplay: {
		delay: 1500,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	speed: 2000,
	slidesPerView: "auto",
	spaceBetween: 0,
	loop: true,
	navigation: {
		clickable: true,
		nextEl: ".nav-prev-category",
		prevEl: ".nav-next-category",
	},
}
import Link from "next/link"

export default function Categories3() {
	return (
		<>

			<section className="flat-categories-v3">
				<div className="wrap-categories-v3">
					<div className="swiper tf-sw-auto sw-auto" data-loop="true">
						<Swiper {...swiperOptions} className="swiper-wrapper">
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-apartment" />
									</div>
									<p className="content text-center text-1">
										Apartment
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-villa" />
									</div>
									<p className="content text-center text-1">
										Villa
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2 active">
									<div className="icon-box">
										<span className="icon icon-studio" />
									</div>
									<p className="content text-center text-1">
										Studio
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-office" />
									</div>
									<p className="content text-center text-1">
										Townhouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-commercial2" />
									</div>
									<p className="content text-center text-1">
										Commercial
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-townhouse" />
									</div>
									<p className="content text-center text-1">
										Family Home
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-apartment" />
									</div>
									<p className="content text-center text-1">
										Penthouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<svg width={41} height={40} viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_7352_49236)">
												<mask id="mask0_7352_49236" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={41} height={40}>
													<path d="M40.5 0H0.5V40H40.5V0Z" fill="white" />
												</mask>
												<g mask="url(#mask0_7352_49236)">
													<path d="M35.5021 19.403V25.6999C35.5021 25.7828 35.4692 25.8623 35.4106 25.9209C35.352 25.9795 35.2725 26.0124 35.1896 26.0124H17.7607C17.6779 26.0124 17.5984 25.9795 17.5398 25.9209C17.4812 25.8623 17.4482 25.7828 17.4482 25.6999V17.5952C17.4482 17.5123 17.4812 17.4328 17.5398 17.3742C17.5984 17.3156 17.6779 17.2827 17.7607 17.2827H35.1896C35.2725 17.2827 35.352 17.3156 35.4106 17.3742C35.4692 17.4328 35.5021 17.5123 35.5021 17.5952V19.403Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M25.4385 31.875V26.0156H28.251V31.3672" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M38.7422 39.4141H2.25781C1.94701 39.4141 1.64894 39.2906 1.42917 39.0708C1.2094 38.8511 1.08594 38.553 1.08594 38.2422C1.08594 37.9314 1.2094 37.6333 1.42917 37.4135C1.64894 37.1938 1.94701 37.0703 2.25781 37.0703H38.7422C39.053 37.0703 39.3511 37.1938 39.5708 37.4135C39.7906 37.6333 39.9141 37.9314 39.9141 38.2422C39.9141 38.553 39.7906 38.8511 39.5708 39.0708C39.3511 39.2906 39.053 39.4141 38.7422 39.4141Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M5.5 35C5.5 35 9 32.4116 12.9452 32.4116C16.8904 32.4116 17.9108 33.2257 20.0351 34.1733" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M3.25879 37.0422C4.14743 36.0608 5.1638 35.2031 6.28066 34.4922" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M37.7656 37.0703H15.8438C15.8438 37.0703 22.8484 31.4453 28.6641 31.4453C34.4797 31.4453 37.7656 37.0703 37.7656 37.0703Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M23.7559 23.4929L25.141 19.8546C25.147 19.8388 25.1577 19.8252 25.1717 19.8155C25.1856 19.8059 25.2022 19.8008 25.2191 19.8008C25.2361 19.8008 25.2526 19.8059 25.2666 19.8155C25.2805 19.8252 25.2912 19.8388 25.2973 19.8546L26.6707 23.4929" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.1885 22.5867H26.2424" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M28.4072 19.8047V23.4914C28.4479 23.4984 29.6994 23.4914 29.6994 23.4914" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M32.8922 19.8367H31.3516V23.4929H32.8922" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M32.7781 21.6641H31.3516" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M22.0418 20.182C22.0418 20.182 21.3801 19.6258 20.5996 19.8609C19.8824 20.0766 19.7816 20.9031 20.3004 21.2414C20.3004 21.2414 20.8098 21.4688 21.3738 21.6766C22.7332 22.1781 22.148 23.493 21.0535 23.493C20.8131 23.4954 20.5747 23.448 20.3534 23.3539C20.1321 23.2598 19.9327 23.121 19.7676 22.9461" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M18.0334 6.95619C17.9692 6.71295 17.9366 6.46245 17.9365 6.21088C17.9367 5.69212 18.0764 5.18297 18.3411 4.73681C18.6058 4.29066 18.9856 3.92396 19.4408 3.67517C19.896 3.42638 20.4098 3.30467 20.9282 3.32281C21.4467 3.34096 21.9507 3.49828 22.3874 3.77829C22.8241 4.05829 23.1774 4.45065 23.4102 4.91422C23.6431 5.37778 23.7469 5.89546 23.7108 6.41296C23.6746 6.93046 23.4999 7.4287 23.2049 7.85542C22.9099 8.28214 22.5055 8.62161 22.0342 8.83822" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M20.8271 0.585938V1.36719" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.8043 2.23364L24.252 2.78599" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M26.4521 6.21094H25.6709" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.8043 10.1883L24.252 9.63599" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M17.402 2.78599L16.8496 2.23364" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M11.7969 3.56179C12.094 3.48535 12.3995 3.44598 12.7063 3.4446C13.1684 3.44305 13.6263 3.53293 14.0535 3.70906C14.4807 3.88519 14.8689 4.14409 15.1957 4.47085C15.5224 4.79762 15.7813 5.18579 15.9575 5.61302C16.1336 6.04026 16.2235 6.49811 16.2219 6.96022C16.2219 7.10384 16.2133 7.24733 16.1961 7.38991C16.5382 7.16229 16.9299 7.02013 17.3383 6.97537C17.7468 6.93061 18.16 6.98457 18.5432 7.1327C18.9264 7.28084 19.2685 7.51882 19.5406 7.82664C19.8128 8.13446 20.007 8.50313 20.1071 8.90163C20.3885 8.77271 20.6944 8.70634 21.0039 8.7071C21.5181 8.70695 22.0155 8.88979 22.4071 9.22288C22.7988 9.55597 23.0591 10.0176 23.1414 10.5251C23.1467 10.5587 23.1445 10.5931 23.1351 10.6258C23.1257 10.6586 23.1092 10.6888 23.0869 10.7146C23.0646 10.7403 23.037 10.7608 23.0059 10.7748C22.9749 10.7888 22.9411 10.7958 22.9071 10.7954H3.21957C3.18552 10.7958 3.15179 10.7888 3.12073 10.7748C3.08967 10.7608 3.06202 10.7403 3.03972 10.7146C3.01741 10.6888 3.00097 10.6586 2.99156 10.6258C2.98214 10.5931 2.97997 10.5587 2.9852 10.5251C3.03039 10.2433 3.13096 9.97334 3.28109 9.73069C3.43121 9.48804 3.62793 9.27754 3.85986 9.11134C4.0918 8.94514 4.35437 8.82654 4.6324 8.76239C4.91043 8.69823 5.19842 8.6898 5.47973 8.73757C5.54742 8.32722 5.7032 7.93641 5.93634 7.59201C6.16948 7.24761 6.47446 6.95779 6.83029 6.7425C7.18612 6.52721 7.58436 6.39154 7.99762 6.34484C8.41088 6.29813 8.82935 6.34149 9.22426 6.47194C9.28379 6.01748 9.75988 4.08585 11.7969 3.56179Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
												</g>
											</g>
											<defs>
												<clipPath id="clip0_7352_49236">
													<rect width={40} height={40} fill="white" transform="translate(0.5)" />
												</clipPath>
											</defs>
										</svg>
									</div>
									<p className="content text-center text-1">
										Land/Plot
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-ware" />
									</div>
									<p className="content text-center text-1">
										Warehouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-farm" />
									</div>
									<p className="content text-center text-1">
										Farm/Ranch
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-villa5" />
									</div>
									<p className="content text-center text-1">
										Villa
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-commercial" />
									</div>
									<p className="content text-center text-1">
										Office
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-apartment" />
									</div>
									<p className="content text-center text-1">
										Apartment
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-villa" />
									</div>
									<p className="content text-center text-1">
										Villa
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2 active">
									<div className="icon-box">
										<span className="icon icon-studio" />
									</div>
									<p className="content text-center text-1">
										Studio
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-office" />
									</div>
									<p className="content text-center text-1">
										Townhouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-commercial2" />
									</div>
									<p className="content text-center text-1">
										Commercial
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-townhouse" />
									</div>
									<p className="content text-center text-1">
										Family Home
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-apartment" />
									</div>
									<p className="content text-center text-1">
										Penthouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<svg width={41} height={40} viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_7352_49236)">
												<mask id="mask0_7352_49236" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={41} height={40}>
													<path d="M40.5 0H0.5V40H40.5V0Z" fill="white" />
												</mask>
												<g mask="url(#mask0_7352_49236)">
													<path d="M35.5021 19.403V25.6999C35.5021 25.7828 35.4692 25.8623 35.4106 25.9209C35.352 25.9795 35.2725 26.0124 35.1896 26.0124H17.7607C17.6779 26.0124 17.5984 25.9795 17.5398 25.9209C17.4812 25.8623 17.4482 25.7828 17.4482 25.6999V17.5952C17.4482 17.5123 17.4812 17.4328 17.5398 17.3742C17.5984 17.3156 17.6779 17.2827 17.7607 17.2827H35.1896C35.2725 17.2827 35.352 17.3156 35.4106 17.3742C35.4692 17.4328 35.5021 17.5123 35.5021 17.5952V19.403Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M25.4385 31.875V26.0156H28.251V31.3672" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M38.7422 39.4141H2.25781C1.94701 39.4141 1.64894 39.2906 1.42917 39.0708C1.2094 38.8511 1.08594 38.553 1.08594 38.2422C1.08594 37.9314 1.2094 37.6333 1.42917 37.4135C1.64894 37.1938 1.94701 37.0703 2.25781 37.0703H38.7422C39.053 37.0703 39.3511 37.1938 39.5708 37.4135C39.7906 37.6333 39.9141 37.9314 39.9141 38.2422C39.9141 38.553 39.7906 38.8511 39.5708 39.0708C39.3511 39.2906 39.053 39.4141 38.7422 39.4141Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M5.5 35C5.5 35 9 32.4116 12.9452 32.4116C16.8904 32.4116 17.9108 33.2257 20.0351 34.1733" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M3.25879 37.0422C4.14743 36.0608 5.1638 35.2031 6.28066 34.4922" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M37.7656 37.0703H15.8438C15.8438 37.0703 22.8484 31.4453 28.6641 31.4453C34.4797 31.4453 37.7656 37.0703 37.7656 37.0703Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M23.7559 23.4929L25.141 19.8546C25.147 19.8388 25.1577 19.8252 25.1717 19.8155C25.1856 19.8059 25.2022 19.8008 25.2191 19.8008C25.2361 19.8008 25.2526 19.8059 25.2666 19.8155C25.2805 19.8252 25.2912 19.8388 25.2973 19.8546L26.6707 23.4929" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.1885 22.5867H26.2424" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M28.4072 19.8047V23.4914C28.4479 23.4984 29.6994 23.4914 29.6994 23.4914" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M32.8922 19.8367H31.3516V23.4929H32.8922" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M32.7781 21.6641H31.3516" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M22.0418 20.182C22.0418 20.182 21.3801 19.6258 20.5996 19.8609C19.8824 20.0766 19.7816 20.9031 20.3004 21.2414C20.3004 21.2414 20.8098 21.4688 21.3738 21.6766C22.7332 22.1781 22.148 23.493 21.0535 23.493C20.8131 23.4954 20.5747 23.448 20.3534 23.3539C20.1321 23.2598 19.9327 23.121 19.7676 22.9461" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M18.0334 6.95619C17.9692 6.71295 17.9366 6.46245 17.9365 6.21088C17.9367 5.69212 18.0764 5.18297 18.3411 4.73681C18.6058 4.29066 18.9856 3.92396 19.4408 3.67517C19.896 3.42638 20.4098 3.30467 20.9282 3.32281C21.4467 3.34096 21.9507 3.49828 22.3874 3.77829C22.8241 4.05829 23.1774 4.45065 23.4102 4.91422C23.6431 5.37778 23.7469 5.89546 23.7108 6.41296C23.6746 6.93046 23.4999 7.4287 23.2049 7.85542C22.9099 8.28214 22.5055 8.62161 22.0342 8.83822" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M20.8271 0.585938V1.36719" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.8043 2.23364L24.252 2.78599" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M26.4521 6.21094H25.6709" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M24.8043 10.1883L24.252 9.63599" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M17.402 2.78599L16.8496 2.23364" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M11.7969 3.56179C12.094 3.48535 12.3995 3.44598 12.7063 3.4446C13.1684 3.44305 13.6263 3.53293 14.0535 3.70906C14.4807 3.88519 14.8689 4.14409 15.1957 4.47085C15.5224 4.79762 15.7813 5.18579 15.9575 5.61302C16.1336 6.04026 16.2235 6.49811 16.2219 6.96022C16.2219 7.10384 16.2133 7.24733 16.1961 7.38991C16.5382 7.16229 16.9299 7.02013 17.3383 6.97537C17.7468 6.93061 18.16 6.98457 18.5432 7.1327C18.9264 7.28084 19.2685 7.51882 19.5406 7.82664C19.8128 8.13446 20.007 8.50313 20.1071 8.90163C20.3885 8.77271 20.6944 8.70634 21.0039 8.7071C21.5181 8.70695 22.0155 8.88979 22.4071 9.22288C22.7988 9.55597 23.0591 10.0176 23.1414 10.5251C23.1467 10.5587 23.1445 10.5931 23.1351 10.6258C23.1257 10.6586 23.1092 10.6888 23.0869 10.7146C23.0646 10.7403 23.037 10.7608 23.0059 10.7748C22.9749 10.7888 22.9411 10.7958 22.9071 10.7954H3.21957C3.18552 10.7958 3.15179 10.7888 3.12073 10.7748C3.08967 10.7608 3.06202 10.7403 3.03972 10.7146C3.01741 10.6888 3.00097 10.6586 2.99156 10.6258C2.98214 10.5931 2.97997 10.5587 2.9852 10.5251C3.03039 10.2433 3.13096 9.97334 3.28109 9.73069C3.43121 9.48804 3.62793 9.27754 3.85986 9.11134C4.0918 8.94514 4.35437 8.82654 4.6324 8.76239C4.91043 8.69823 5.19842 8.6898 5.47973 8.73757C5.54742 8.32722 5.7032 7.93641 5.93634 7.59201C6.16948 7.24761 6.47446 6.95779 6.83029 6.7425C7.18612 6.52721 7.58436 6.39154 7.99762 6.34484C8.41088 6.29813 8.82935 6.34149 9.22426 6.47194C9.28379 6.01748 9.75988 4.08585 11.7969 3.56179Z" stroke="#5C6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
												</g>
											</g>
											<defs>
												<clipPath id="clip0_7352_49236">
													<rect width={40} height={40} fill="white" transform="translate(0.5)" />
												</clipPath>
											</defs>
										</svg>
									</div>
									<p className="content text-center text-1">
										Land/Plot
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-ware" />
									</div>
									<p className="content text-center text-1">
										Warehouse
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-farm" />
									</div>
									<p className="content text-center text-1">
										Farm/Ranch
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-villa5" />
									</div>
									<p className="content text-center text-1">
										Villa
									</p>
								</Link>
							</SwiperSlide>
							<SwiperSlide>
								<Link href="#" className="homeya-categories-v2">
									<div className="icon-box">
										<span className="icon icon-commercial" />
									</div>
									<p className="content text-center text-1">
										Office
									</p>
								</Link>
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="box-navigation">
						<div className="navigation swiper-nav-next nav-next-category"><span className="icon icon-arr-l" />
						</div>
						<div className="navigation swiper-nav-prev nav-prev-category"><span className="icon icon-arr-r" />
						</div>
					</div>
				</div>
			</section>

		</>
	)
}
