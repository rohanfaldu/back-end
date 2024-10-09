
export default function OffcanvasMobileFilter() {
	return (
		<>
			<div className="offcanvas offcanvas-start canvas-filter-mb" id="filterSearchMb">
				<div className="flat-tab flat-tab-form">
					<ul className="nav-tab-form style-4 justify-content-center" role="tablist">
						<li className="nav-tab-item" role="presentation">
							<a href="#forRent" className="nav-link-item active" data-bs-toggle="tab">For Rent</a>
						</li>
						<li className="nav-tab-item" role="presentation">
							<a href="#forSale" className="nav-link-item" data-bs-toggle="tab">For Sale</a>
						</li>
					</ul>
					<div className="canvas-content">
						<div className="tab-content">
							<div className="tab-pane fade active show" role="tabpanel">
								<div className="form-sl">
									<form method="post">
										<div className="wd-find-select style-3">
											<div className="inner-group inner-filter">
												<div className="form-style">
													<label className="title-select">Keyword</label>
													<input type="text" className="form-control" placeholder="Search Keyword." defaultValue name="s" title="Search for" required />
												</div>
												<div className="form-style">
													<label className="title-select">Location</label>
													<div className="group-ip ip-icon">
														<input type="text" className="form-control" placeholder="Search Location" defaultValue name="s" title="Search for" required />
														<a href="#" className="icon-right icon-location" />
													</div>
												</div>
												<div className="form-style">
													<label className="title-select">Type</label>
													<div className="group-select">
														<div className="nice-select" tabIndex={0}><span className="current">All</span>
															<ul className="list">
																<li data-value className="option selected">All</li>
																<li data-value="villa" className="option">Villa</li>
																<li data-value="studio" className="option">Studio</li>
																<li data-value="office" className="option">Office</li>
															</ul>
														</div>
													</div>
												</div>
												<div className="form-style btn-show-advanced-mb">
													<span className="icon icon-faders" />
													<span className="text-advanced">Advanced</span>
												</div>
												<div className="form-style wd-amenities wd-show-filter-mb">
													<div className="form-style box-select">
														<label className="title-select">Rooms</label>
														<div className="nice-select" tabIndex={0}><span className="current">2</span>
															<ul className="list">
																<li data-value={2} className="option">1</li>
																<li data-value={2} className="option selected">2</li>
																<li data-value={3} className="option">3</li>
																<li data-value={4} className="option">4</li>
																<li data-value={5} className="option">5</li>
																<li data-value={6} className="option">6</li>
																<li data-value={7} className="option">7</li>
																<li data-value={8} className="option">8</li>
																<li data-value={9} className="option">9</li>
																<li data-value={10} className="option">10</li>
															</ul>
														</div>
													</div>
													<div className="form-style box-select">
														<label className="title-select">Bathrooms</label>
														<div className="nice-select" tabIndex={0}><span className="current">4</span>
															<ul className="list">
																<li data-value="all" className="option">All</li>
																<li data-value={1} className="option">1</li>
																<li data-value={2} className="option">2</li>
																<li data-value={3} className="option">3</li>
																<li data-value={4} className="option selected">4</li>
																<li data-value={5} className="option">5</li>
																<li data-value={6} className="option">6</li>
																<li data-value={7} className="option">7</li>
																<li data-value={8} className="option">8</li>
																<li data-value={9} className="option">9</li>
																<li data-value={10} className="option">10</li>
															</ul>
														</div>
													</div>
													<div className="form-style box-select">
														<label className="title-select">Bedrooms</label>
														<div className="nice-select" tabIndex={0}><span className="current">4</span>
															<ul className="list">
																<li data-value={1} className="option">All</li>
																<li data-value={1} className="option">1</li>
																<li data-value={2} className="option">2</li>
																<li data-value={3} className="option">3</li>
																<li data-value={4} className="option selected">4</li>
																<li data-value={5} className="option">5</li>
																<li data-value={6} className="option">6</li>
																<li data-value={7} className="option">7</li>
																<li data-value={8} className="option">8</li>
																<li data-value={9} className="option">9</li>
																<li data-value={10} className="option">10</li>
															</ul>
														</div>
													</div>
													<div className="form-style widget-price">
														<div className="box-title-price">
															<span className="title-price">Price Range</span>
															<div className="caption-price">
																<span>from</span>
																<span id="slider-range-value3" className="fw-7" />
																<span>to</span>
																<span id="slider-range-value4" className="fw-7" />
															</div>
														</div>
														<div id="slider-range3" />
														<div className="slider-labels">
															<input type="hidden" name="min-value3" defaultValue />
															<input type="hidden" name="max-value3" defaultValue />
														</div>
													</div>
													<div className="form-style widget-price wd-price-2">
														<div className="box-title-price">
															<span className="title-price">Size Range</span>
															<div className="caption-price">
																<span>from</span>
																<span id="slider-range-value03" className="fw-7" />
																<span>to</span>
																<span id="slider-range-value04" className="fw-7" />
															</div>
														</div>
														<div id="slider-range4" />
														<div className="slider-labels">
															<input type="hidden" name="min-value4" defaultValue />
															<input type="hidden" name="max-value4" defaultValue />
														</div>
													</div>
													<div className="form-style group-checkbox">
														<div className="text-1">Amenities:</div>
														<div className="group-amenities">
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs1" defaultChecked />
																<label htmlFor="cbs1" className="text-cb-amenities">Air
																	Condition</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs2" />
																<label htmlFor="cbs2" className="text-cb-amenities">Disabled
																	Access</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs3" />
																<label htmlFor="cbs3" className="text-cb-amenities">Ceiling
																	Height</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs4" defaultChecked />
																<label htmlFor="cbs4" className="text-cb-amenities">Floor</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs5" />
																<label htmlFor="cbs5" className="text-cb-amenities">Heating</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs6" />
																<label htmlFor="cbs6" className="text-cb-amenities">Renovation</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs7" />
																<label htmlFor="cbs7" className="text-cb-amenities">Window Type</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs8" />
																<label htmlFor="cbs8" className="text-cb-amenities">Cable TV</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs9" defaultChecked />
																<label htmlFor="cbs9" className="text-cb-amenities">Elevator</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs10" />
																<label htmlFor="cbs10" className="text-cb-amenities">Furnishing</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs11" />
																<label htmlFor="cbs11" className="text-cb-amenities">Intercom</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs12" />
																<label htmlFor="cbs12" className="text-cb-amenities">Security</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs13" />
																<label htmlFor="cbs13" className="text-cb-amenities">Search
																	property</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs14" />
																<label htmlFor="cbs14" className="text-cb-amenities">Ceiling
																	Height</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs15" />
																<label htmlFor="cbs15" className="text-cb-amenities">Fence</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs16" />
																<label htmlFor="cbs16" className="text-cb-amenities">Fence</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs17" defaultChecked />
																<label htmlFor="cbs17" className="text-cb-amenities">Garage</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs18" />
																<label htmlFor="cbs18" className="text-cb-amenities">Parking</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs19" />
																<label htmlFor="cbs19" className="text-cb-amenities">Swimming
																	Pool</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs20" />
																<label htmlFor="cbs20" className="text-cb-amenities">Construction
																	Year</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs21" />
																<label htmlFor="cbs21" className="text-cb-amenities">Fireplace</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs22" />
																<label htmlFor="cbs22" className="text-cb-amenities">Garden</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs23" />
																<label htmlFor="cbs23" className="text-cb-amenities">Pet
																	Friendly</label>
															</fieldset>
															<fieldset className="amenities-item">
																<input type="checkbox" className="tf-checkbox style-1" id="cbs24" />
																<label htmlFor="cbs24" className="text-cb-amenities">WiFi</label>
															</fieldset>
														</div>
													</div>
												</div>
												<div className="form-style">
													<button type="submit" className="tf-btn primary" href="#">Search</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
