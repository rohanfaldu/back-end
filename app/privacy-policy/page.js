'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function PrivacyPolicy() {
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

			<Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Privacy Policy">
				<section className="flat-section">
					<div className="container">
						<div className="row">
							<div className="col-lg-5">
								<ul className="nav-tab-privacy" role="tablist">
									<li className="nav-tab-item" onClick={() => handleTab(1)}>
										<a className={isTab == 1 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">1. Terms </a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(2)}>
										<a className={isTab == 2 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">2. Limitations</a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(3)}>
										<a className={isTab == 3 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">3. Revisions and errata</a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(4)}>
										<a className={isTab == 4 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">4. Site terms of use modifications</a>
									</li>
									<li className="nav-tab-item" onClick={() => handleTab(5)}>
										<a className={isTab == 5 ? "nav-link-item active" : "nav-link-item"} data-bs-toggle="tab">5. Risks</a>
									</li>
								</ul>
							</div>
							<div className="col-lg-7">
								<h5 className="text-capitalize title">Terms of use</h5>
								<div className="tab-content content-box-privacy">
									<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="terms" role="tabpanel">
										<h6>1. Terms </h6>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
										<p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</p>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie</p>
									</div>
									<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="limitations" role="tabpanel">
										<h6>2. Limitations</h6>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</p>
										<ul className="box-list">
											<li>Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</li>
											<li>Etiam eleifend metus at nunc ultricies facilisis.</li>
											<li>Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</li>
										</ul>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie</p>
									</div>
									<div className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="revisions" role="tabpanel">
										<h6>3. Revisions and errata</h6>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
										<p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis</p>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</p>
									</div>
									<div className={isTab == 4 ? "tab-pane fade show active" : "tab-pane fade"} id="modifications" role="tabpanel">
										<h6>4. Site terms of use modifications</h6>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
										<ul className="box-list">
											<li>Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</li>
											<li>Etiam eleifend metus at nunc ultricies facilisis.</li>
											<li>Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie a, finibus nec ex.</li>
										</ul>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
									</div>
									<div className={isTab == 5 ? "tab-pane fade show active" : "tab-pane fade"} id="risks" role="tabpanel">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed euismod justo, sit amet efficitur dui. Aliquam sodales vestibulum velit, eget sollicitudin quam. Donec non aliquam eros. Etiam sit amet lectus vel justo dignissim condimentum.</p>
										<p>In malesuada neque quis libero laoreet posuere. In consequat vitae ligula quis rutrum. Morbi dolor orci, maximus a pulvinar sed, bibendum ac lacus. Suspendisse in consectetur lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum, est sed interdum cursus, felis ex pharetra nisi, ut elementum tortor urna eu nulla. Donec rhoncus in purus quis blandit.</p>
										<p>Etiam eleifend metus at nunc ultricies facilisis. Morbi finibus tristique interdum. Nullam vel eleifend est, eu posuere risus. Vestibulum ligula ex, ullamcorper sit amet molestie </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

			</Layout>
		</>
	)
}