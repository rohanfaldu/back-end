
'use client'
import Link from "next/link"
import { useState } from "react"
import { TypeAnimation } from "react-type-animation"
import RangeSlider from "../elements/RangeSlider"

export default function Slider3() {
	const [isToggled, setToggled] = useState(false)
	const handleToggle = () => setToggled(!isToggled)
	const [isTab, setIsTab] = useState(1)
	const [isVisible, setIsVisible] = useState(true)
	const handleTab = (i) => {
		setIsTab(i)
		setIsVisible(false)
		setTimeout(() => {
			setIsVisible(true)
		}, 200)
	}
	return (
		<>

			<section className="flat-slider home-3">
				<div className="container relative">
					<div className="row position-relative">
						<div className="col-xl-8 col-lg-7">
							<div className="slider-content">
								<div className="heading">
									<h2 className="title wow fadeIn animationtext clip" data-wow-delay=".2s" data-wow-duration="2000ms">Indulge in Your
										<br />
										<span className="tf-text s1 cd-words-wrapper">
											{/* <span className="item-text is-visible">Sanctuary</span>
											<span className="item-text is-hidden">Safe House</span> */}
											<TypeAnimation
												sequence={[
													// Same substring at the start will only be typed out once, initially
													' Sanctuary',
													1000, // wait 1s before replacing "Mice" with "Hamsters"
													' Safe House',
													1000,
												]}
												wrapper="span"
												speed={50}
												style={{ display: 'inline-block', }}
												repeat={Infinity}
												className="cd-words-wrapper">
											</TypeAnimation>
										</span>
									</h2>

									<p className="subtitle body-1 wow fadeIn" data-wow-delay=".8s" data-wow-duration="2000ms">Discover your private oasis at Homeya, where every
										corner, from the spacious garden to the relaxing pool, is crafted for your
										comfort and enjoyment.</p>
								</div>
								<Link href="#" className="tf-btn primary size-2">Contact Us</Link>
							</div>
						</div>
						<div className="col-xl-4 col-lg-5">
							<div className="flat-tab flat-tab-form">
								<ul className="nav-tab-form style-2" role="tablist">
									<li className="nav-tab-item" onClick={() => handleTab(1)}>
										<a className={isTab == 1 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">For
											Rent</a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(2)}>
										<a className={isTab == 2 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">For Sale</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane fade active show" role="tabpanel">
										<div className="form-sl flat-filter-form">
											<form method="post">
												<div className="wd-filter-select">
													<div className="inner-group">
														<div className="form-group-1 form-style">
															<label>Keyword</label>
															<input type="text" className="form-control" placeholder="Search Keyword." name="s" title="Search for" required />
														</div>
														<div className="form-group-2 form-style">
															<label>Location</label>
															<div className="group-ip ip-icon">
																<input type="text" className="form-control" placeholder="Search Location" name="s" title="Search for" required />
																<Link href="#" className="icon-right icon-location" />
															</div>
														</div>
														<div className="form-group-3 form-style">
															<label>Type</label>
															<div className="group-select">
																<select className="nice-select">

																	<option data-value className="option selected">All</option>
																	<option data-value="villa" className="option">Villa</option>
																	<option data-value="studio" className="option">Studio </option>
																	<option data-value="office" className="option">Office </option>
																</select>
															</div>
														</div>
														<div className="form-group-4 form-style box-filter">
															<a className="filter-advanced pull-right" onClick={handleToggle}>
																<span className="icon icon-faders" />
																<span className="text-advanced fw-7">Advanced</span>
															</a>
														</div>
														<div className="form-style">
															<button type="submit" className="tf-btn primary" href="#">Search</button>
														</div>
													</div>
												</div>
												<div className={`wd-search-form ${isToggled ? "show" : ""}`}>
													<div className="grid-2 group-box group-price">
														<div className="widget-price">
															<RangeSlider />
														</div>
														<div className="widget-price">
															<RangeSlider />
														</div>

													</div>
													<div className="grid-2 group-box">
														<div className="group-select grid-2">
															<div className="box-select">
																<label className="title-select text-variant-1">Rooms</label>
																<select className="nice-select">

																	<option data-value={1} className="option">1</option>
																	<option data-value={2} className="option selected">2 </option>
																	<option data-value={3} className="option">3</option>
																	<option data-value={4} className="option">4</option>
																	<option data-value={5} className="option">5</option>
																	<option data-value={6} className="option">6</option>
																	<option data-value={7} className="option">7</option>
																	<option data-value={8} className="option">8</option>
																	<option data-value={9} className="option">9</option>
																	<option data-value={10} className="option">10</option>
																</select>
															</div>
															<div className="box-select">
																<label className="title-select text-variant-1">Bathrooms</label>
																<select className="nice-select">

																	<option data-value={1} className="option">1</option>
																	<option data-value={2} className="option selected">2 </option>
																	<option data-value={3} className="option">3</option>
																	<option data-value={4} className="option">4</option>
																	<option data-value={5} className="option">5</option>
																	<option data-value={6} className="option">6</option>
																	<option data-value={7} className="option">7</option>
																	<option data-value={8} className="option">8</option>
																	<option data-value={9} className="option">9</option>
																	<option data-value={10} className="option">10</option>
																</select>
															</div>
														</div>
														<div className="group-select grid-2">
															<div className="box-select">
																<label className="title-select text-variant-1">Bedrooms</label>
																<select className="nice-select">

																	<option data-value={1} className="option">1</option>
																	<option data-value={2} className="option selected">2 </option>
																	<option data-value={3} className="option">3</option>
																	<option data-value={4} className="option">4</option>
																	<option data-value={5} className="option">5</option>
																	<option data-value={6} className="option">6</option>
																	<option data-value={7} className="option">7</option>
																	<option data-value={8} className="option">8</option>
																	<option data-value={9} className="option">9</option>
																	<option data-value={10} className="option">10</option>
																</select>
															</div>
															<div className="box-select">
																<label className="title-select fw-5">Type</label>
																<select className="nice-select">

																	<option data-value={1} className="option">1</option>
																	<option data-value={2} className="option selected">2 </option>
																	<option data-value={3} className="option">3</option>
																	<option data-value={4} className="option">4</option>
																	<option data-value={5} className="option">5</option>
																	<option data-value={6} className="option">6</option>
																	<option data-value={7} className="option">7</option>
																	<option data-value={8} className="option">8</option>
																	<option data-value={9} className="option">9</option>
																	<option data-value={10} className="option">10</option>
																</select>
															</div>
														</div>
													</div>
													<div className="group-checkbox">
														<div className="text-1">Amenities:</div>
														<div className="group-amenities mt-8 grid-6">
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb1" defaultChecked />
																	<label htmlFor="cb1" className="text-cb-amenities">Air
																		Condition</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb2" />
																	<label htmlFor="cb2" className="text-cb-amenities">Cable
																		TV</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb3" />
																	<label htmlFor="cb3" className="text-cb-amenities">Ceiling
																		Height</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb4" />
																	<label htmlFor="cb4" className="text-cb-amenities">Fireplace</label>
																</fieldset>
															</div>
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb5" />
																	<label htmlFor="cb5" className="text-cb-amenities">Disabled
																		Access</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb6" defaultChecked />
																	<label htmlFor="cb6" className="text-cb-amenities">Elevator</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb7" />
																	<label htmlFor="cb7" className="text-cb-amenities">Fence</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb8" />
																	<label htmlFor="cb8" className="text-cb-amenities">Garden</label>
																</fieldset>
															</div>
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb9" defaultChecked />
																	<label htmlFor="cb9" className="text-cb-amenities">Floor</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb10" />
																	<label htmlFor="cb10" className="text-cb-amenities">Furnishing</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb11" defaultChecked />
																	<label htmlFor="cb11" className="text-cb-amenities">Garage</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb12" />
																	<label htmlFor="cb12" className="text-cb-amenities">Pet
																		Friendly</label>
																</fieldset>
															</div>
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb13" />
																	<label htmlFor="cb13" className="text-cb-amenities">Heating</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb14" />
																	<label htmlFor="cb14" className="text-cb-amenities">Intercom</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb15" />
																	<label htmlFor="cb15" className="text-cb-amenities">Parking</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb16" />
																	<label htmlFor="cb16" className="text-cb-amenities">WiFi</label>
																</fieldset>
															</div>
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb17" />
																	<label htmlFor="cb17" className="text-cb-amenities">Renovation</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb18" />
																	<label htmlFor="cb18" className="text-cb-amenities">Security</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb19" />
																	<label htmlFor="cb19" className="text-cb-amenities">Swimming
																		Pool</label>
																</fieldset>
															</div>
															<div className="box-amenities">
																<fieldset className="amenities-item">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb20" />
																	<label htmlFor="cb20" className="text-cb-amenities">Window
																		Type</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb21" />
																	<label htmlFor="cb21" className="text-cb-amenities">Search
																		property</label>
																</fieldset>
																<fieldset className="amenities-item mt-12">
																	<input type="checkbox" className="tf-checkbox style-1" id="cb22" />
																	<label htmlFor="cb22" className="text-cb-amenities">Construction
																		Year</label>
																</fieldset>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div >
							</div >
						</div >
					</div >
				</div >
			</section >
		</>
	)
}
