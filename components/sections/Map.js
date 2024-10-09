
import Link from "next/link"
import AdvancedFilter from "../elements/AdvancedFilter"
import PropertyMap from "../elements/PropertyMap"
import TabNav from "../elements/TabNav"

export default function Map() {
	return (
		<>

			<section className="flat-map">
				<PropertyMap topmap />
				<div className="container">
					<div className="wrap-filter-search">
						<div className="flat-tab flat-tab-form">
							<ul className="nav-tab-form style-3 justify-content-center" role="tablist">
							<TabNav />
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade active show" role="tabpanel">
									<div className="form-sl">
										<form method="post">
											<AdvancedFilter sidecls="shadow-st" />
										</form>
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
