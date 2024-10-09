import Link from "next/link"

export default function Header2({
	handleLogin,
	handleRegister,
	handleOffcanMenu,
	handleOffcanFilter,
	handleOffcanMobile,
}) {
	return (
		<>

			<header className="main-header header-style-3 header-search fixed-header">
				{/* Header Lower */}
				<div className="header-lower">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-container d-flex justify-content-between align-items-center">
								{/* Logo Box */}
								<div className="logo-box flex">
									<div className="logo"><Link href="/"><img src="/images/logo/logo.svg" alt="logo" width={174} height={44} /></Link></div>
								</div>
								<div className="nav-outer flex align-center">
									<div className="outer-search">
										<div className="form-box box-1">
											<input type="text" placeholder="Enter Keyword" />
										</div>
										<div className="form-box box-2">
											<input type="text" placeholder="Search Location" />
										</div>
										<div className="form-box box-3">
											<input type="text" placeholder="Choose Type" />
										</div>
										<a className="btn-search filter-search-canvas" onClick={handleOffcanFilter}><span className="icon icon-search" /></a>
									</div>
									<a className="btn-search btn-search-mb" onClick={handleOffcanMobile}><span className="icon icon-search" /></a>
								</div>
								<div className="header-account">
									<div className="register">
										<ul className="d-flex">
											<li><a onClick={handleLogin}>Login</a></li>
											<li>/</li>
											<li><a onClick={handleRegister}>Register</a></li>
										</ul>
									</div>
									<div className="flat-bt-top">
										<Link className="tf-btn primary" href="/add-property">Submit Property</Link>
									</div>
									<a className="btn-menu-nav" onClick={handleOffcanMenu}><span className="icon icon-categories" /></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* End Header Lower */}
			</header>

		</>
	)
}
