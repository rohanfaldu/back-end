'use client'
import { useState } from "react"

export default function SidebarFilter() {
	const [isToggled, setToggled] = useState(false)
	const handleToggle = () => setToggled(!isToggled)
	return (
		<>
			<div className="form-style btn-show-advanced" onClick={handleToggle} style={{ display: `${isToggled ? "none" : "block"}` }}>
				<a className="filter-advanced pull-right">
					<span className="icon icon-faders" />
					<span className="text-advanced">Show Advanced</span>
				</a>
			</div>
			<div className="form-style wd-amenities" style={{ display: `${isToggled ? "block" : "none"}` }}>
				<div className="group-checkbox">
					<div className="text-1">Amenities:</div>
					<div className="group-amenities">
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb1" defaultChecked />
							<label htmlFor="cb1" className="text-cb-amenities">Air Condition</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb2" />
							<label htmlFor="cb2" className="text-cb-amenities">Disabled Access</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb3" />
							<label htmlFor="cb3" className="text-cb-amenities">Ceiling Height</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb4" defaultChecked />
							<label htmlFor="cb4" className="text-cb-amenities">Floor</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb5" />
							<label htmlFor="cb5" className="text-cb-amenities">Heating</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb6" />
							<label htmlFor="cb6" className="text-cb-amenities">Renovation</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb7" />
							<label htmlFor="cb7" className="text-cb-amenities">Window Type</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb8" />
							<label htmlFor="cb8" className="text-cb-amenities">Cable TV</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb9" defaultChecked />
							<label htmlFor="cb9" className="text-cb-amenities">Elevator</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb10" />
							<label htmlFor="cb10" className="text-cb-amenities">Furnishing</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb11" />
							<label htmlFor="cb11" className="text-cb-amenities">Intercom</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb12" />
							<label htmlFor="cb12" className="text-cb-amenities">Security</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb13" />
							<label htmlFor="cb13" className="text-cb-amenities">Search property</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb14" />
							<label htmlFor="cb14" className="text-cb-amenities">Ceiling Height</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb15" />
							<label htmlFor="cb15" className="text-cb-amenities">Fence</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb16" />
							<label htmlFor="cb16" className="text-cb-amenities">Fence</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb17" defaultChecked />
							<label htmlFor="cb17" className="text-cb-amenities">Garage</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb18" />
							<label htmlFor="cb18" className="text-cb-amenities">Parking</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb19" />
							<label htmlFor="cb19" className="text-cb-amenities">Swimming Pool</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb20" />
							<label htmlFor="cb20" className="text-cb-amenities">Construction Year</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb21" />
							<label htmlFor="cb21" className="text-cb-amenities">Fireplace</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb22" />
							<label htmlFor="cb22" className="text-cb-amenities">Garden</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb23" />
							<label htmlFor="cb23" className="text-cb-amenities">Pet Friendly</label>
						</fieldset>
						<fieldset className="amenities-item">
							<input type="checkbox" className="tf-checkbox style-1" id="cb24" />
							<label htmlFor="cb24" className="text-cb-amenities">WiFi</label>
						</fieldset>
					</div>
				</div>
			</div>
			<div className="form-style btn-hide-advanced" onClick={handleToggle} style={{ display: `${isToggled ? "block" : "none"}` }}>
				<a className="filter-advanced pull-right">
					<span className="icon icon-faders" />
					<span className="text-advanced">Hide Advanced</span>
				</a>
			</div>
		</>
	)
}
