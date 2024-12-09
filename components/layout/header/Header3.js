'use client'
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"
import { capitalizeFirstChar, getRandomInt } from "../../../components/common/functions"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Preloader from "@/components/elements/Preloader";
export default function Header3({ scroll, isSidebar, handleSidebar, isMobileMenu, handleMobileMenu }) {
	const [isToggled, setToggled] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const handleToggle = () => setToggled(!isToggled)
	const [userName, setUserName] = useState('');
	const [userImage, setUserImage] = useState('');
	const router = useRouter();

	useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/"); // Redirect to home page
			return false;
        }
		const userDetail = JSON.parse(localStorage.getItem('user'));
	  	
		if(userDetail !== null){
			setLoading(false);
	  		setUserImage(userDetail.image);
	  		setUserName(capitalizeFirstChar(userDetail.user_name));
		}

    }, [router]);

	// useEffect(() => {
	//   	const userDetail = JSON.parse(localStorage.getItem('user'));
	// 	console.log(userDetail);
	//   	if(userDetail === null){
	// 		router.push('/');
	// 		setLoading(true);
	// 		return false;
	//   	} 
		
	// 	if(userDetail !== null){
	// 		setLoading(false);
	//   		setUserImage(userDetail.image);
	//   		setUserName(capitalizeFirstChar(userDetail.user_name));
	// 	}
	// }, []);
	const pathname = usePathname();

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('isLoggedIn');
		router.push('/');
	}


	return (
		<>
			{isLoading 
				? 
					<Preloader /> 
				: 
					<header className="main-header fixed-header header-dashboard">
					{/* Header Lower */}
					<div className="header-lower">
						<div className="row">
							<div className="col-lg-12">
								<div className="inner-container d-flex justify-content-between align-items-center">
									{/* Logo Box */}
									<div className="logo-box d-flex">
										<div className="logo"><Link href="/"><img src="/images/logo/logo.svg" alt="logo" width={174} height={44} /></Link></div>
										<div className="button-show-hide" onClick={handleSidebar}>
											<span className="icon icon-categories" />
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
									<div className="header-account">
										<a onClick={handleToggle} className={`box-avatar dropdown-toggle ${isToggled ? "show" : ""}`}>
											<div className="avatar avt-40 round">
												{userImage? <img src={userImage} alt="avt" /> : <div class="user-charcter">{userName.charAt(0)}</div>}
											</div>
											<p className="name">{userName??""}<span className="icon icon-arr-down" /></p>
										</a>
										<div className={`dropdown-menu  ${isToggled ? "show" : ""}`} >
											{/* <Link className="dropdown-item" href="/my-favorites">My Properties</Link>
											<Link className="dropdown-item" href="/my-invoices">My Invoices</Link>
											<Link className="dropdown-item" href="/my-favorites">My Favorites</Link>
											<Link className="dropdown-item" href="/reviews">Reviews</Link>
											<Link className="dropdown-item" href="/my-profile">My Profile</Link>
											<Link className="dropdown-item" href="/add-property">Add Property</Link> */}
											<Link className="dropdown-item" href="/" onClick={handleLogout}>Logout</Link>
										</div>

										{/* <div className="flat-bt-top">
											<Link className="tf-btn primary" href="/add-property">Submit Property</Link>
										</div> */}
									</div>
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
								<div className="menu-outer">
									<div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
										<ul className="navigation clearfix">
											{/* <li><Link href="/my-property">My Properties</Link></li>
											<li><Link href="/my-invoices">My Invoices</Link></li>
											<li><Link href="/my-favorites">My Favorite</Link></li>
											<li><Link href="/reviews">Reviews</Link></li>
											<li><Link href="/add-property">Add Property</Link></li> */}
											<li><Link href="/">Logout</Link></li>
										</ul>
									</div>
								</div>
			
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
			}
		</>
	)
}



