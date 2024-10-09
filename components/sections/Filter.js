
import Link from "next/link"
import AdvancedFilter from "../elements/AdvancedFilter"
import TabNav from "../elements/TabNav"

export default function Filter() {
	return (
		<>

			<section className="flat-filter-search home-5">
				<div className="container">
					<div className="flat-tab flat-tab-form">
						<ul className="nav-tab-form style-3" role="tablist">
						<TabNav />
						</ul>
						<div className="tab-content">
							<div className="tab-pane fade active show" role="tabpanel">
								<div className="form-sl">
									<form method="post">
										<AdvancedFilter sidecls="shadow-st no-left-round" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
