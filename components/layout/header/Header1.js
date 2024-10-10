import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isLogin, handleLogin, hcls, handleRegister }) {
	return (
		<>

			<header className={`main-header fixed-header ${hcls ? "header-style-2" : ""} ${scroll ? "fixed-header is-fixed" : ""}`}>
				{/* Header Lower */}
				<div className="header-lower">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-container d-flex justify-content-between align-items-center">
								{/* Logo Box */}
								<div className="logo-box">
									<div className="logo">
										<Link href="/">
											{hcls ?
												<img src="/images/logo/ogo.svg" alt="logo" width={174} height={44} />
												:
												<img src="/images/logo/logo.svg" alt="logo" width={174} height={44} />
											}
										</Link>
									</div>
								</div>
								<div className="nav-outer">
									{/* Main Menu */}
									<nav className="main-menu show navbar-expand-md">
										<div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
											<Menu />
										</div>
									</nav>
									{/* Main Menu End*/}
								</div>
								{/* <div className="header-account">
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
								</div> */}
								<div className="mobile-nav-toggler mobile-button" onClick={handleMobileMenu}><span /></div>
							</div>
						</div>
					</div>
				</div>
				{/* End Header Lower */}
				{/* Mobile Menu  */}
				<div className="close-btn" onClick={handleMobileMenu}><span className="icon flaticon-cancel-1" /></div>
				<div className="mobile-menu">
					<div className="menu-backdrop" onClick={handleMobileMenu} />
					<nav className="menu-box">
						<div className="nav-logo"><Link href="/"><img src="/images/logo/logo.svg" alt="nav-logo" width={174} height={44} /></Link></div>
						<div className="bottom-canvas">
							{/* <div className="login-box flex align-items-center">
								<Link href="#modalLogin" data-bs-toggle="modal">Login</Link>
								<span>/</span>
								<Link href="#modalRegister" data-bs-toggle="modal">Register</Link>
							</div> */}
							<MobileMenu />
							{/* <div className="button-mobi-sell">
								<Link className="tf-btn primary" href="/add-property">Submit Property</Link>
							</div> */}
							<div className="mobi-icon-box">
								<div className="box d-flex align-items-center">
									<span className="icon icon-phone2" />
									<div>1-333-345-6868</div>
								</div>
								<div className="box d-flex align-items-center">
									<span className="icon icon-mail" />
									<div>themesflat@gmail.com</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
				{/* End Mobile Menu */}
			</header>

		</>
	)
}
