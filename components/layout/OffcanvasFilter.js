import AdvancedFilter from "../elements/AdvancedFilter"

export default function OffcanvasFilter({
	isOffcanFilter,
	handleOffcanFilter,
	isOffcanAdvanceFilter,
	handleOffcanAdvanceFilter,
	isLogin,
	handleLogin,
	isRegister,
	handleRegister,
	isOffcanMenu,
	handleOffcanMenu,
}) {
	return (
		<>
			<div className={`offcanvas offcanvas-top canvas-filter ${isOffcanFilter ? "show" : ""}`} id="filterSearch">
				<header className="main-header header-style-3">
					<div className="header-lower">
						<div className="row">
							<div className="col-lg-12">
								<div className="inner-container d-flex justify-content-between align-items-center">
									<div className="logo-box">
										<div className="logo"><a href="index.html"><img src="images/logo/logo.svg" alt="logo" width={174} height={44} /></a></div>
									</div>
									<div className="nav-outer-tab">
										<div className="flat-tab flat-tab-form">
											<ul className="nav-tab-form style-4 justify-content-center" role="tablist">
												<li className="nav-tab-item" role="presentation">
													<a href="#forRent" className="nav-link-item active" data-bs-toggle="tab">For
														Rent</a>
												</li>
												<li className="nav-tab-item" role="presentation">
													<a href="#forSale" className="nav-link-item" data-bs-toggle="tab">For Sale</a>
												</li>
											</ul>
										</div>
									</div>
									<div className="header-account">
										<div className="register">
											<ul className="d-flex">
												<li><a onClick={handleLogin} data-bs-toggle="modal">Login</a></li>
												<li>/</li>
												<li><a onClick={handleRegister} data-bs-toggle="modal">Register</a></li>
											</ul>
										</div>
										<div className="flat-bt-top">
											<a className="tf-btn primary" href="add-property.html">Submit Property</a>
										</div>
										<a onClick={() => { handleOffcanMenu(); handleOffcanFilter() }} className="btn-menu-nav" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"><span className="icon icon-categories" /></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<section>
					<div className="container">
						<div className="tab-content">
							<div className="tab-pane fade active show" role="tabpanel">
								<div className="form-sl">
									<form method="post">
										<AdvancedFilter sidecls="style-3" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
			{isOffcanFilter && <div className="offcanvas-backdrop fade show" onClick={handleOffcanFilter} />}
		</>
	)
}
