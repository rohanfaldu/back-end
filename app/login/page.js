
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Login() {

	return (
		<>
			<section className="flat-section admin-login">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<div className="flat-account bg-surface">
								{/* <h3 className="title text-center">Log In</h3> */}
								<div className="logo-box">
									<div className="logo">
										<Link href="/">
											<img src="/images/logo/logo.svg" alt="logo" width={174} height={44} />
										</Link>
									</div>
								</div>
								<form action="#">
									<fieldset className="box-fieldset">
										<label htmlFor="name">Your Names<span>*</span>:</label>
										<input type="text" className="form-contact style-1" defaultValue="themesflat@gmail.com|" />
									</fieldset>
									<fieldset className="box-fieldset">
										<label htmlFor="pass">Password<span>*</span>:</label>
										<div className="box-password">
											<input type="password" className="form-contact style-1 password-field" placeholder="Password" />
											<span className="show-pass">
												<i className="icon-pass icon-eye" />
												<i className="icon-pass icon-eye-off" />
											</span>
										</div>
									</fieldset>
									<div className="d-flex justify-content-between flex-wrap gap-12">
										<fieldset className="d-flex align-items-center gap-6">
											<input type="checkbox" className="tf-checkbox style-2" id="cb1" />
											<label htmlFor="cb1" className="caption-1 text-variant-1">Remember me</label>
										</fieldset>
										<Link href="#" className="caption-1 text-primary">Forgot password?</Link>
									</div>
									{/* <div className="text-variant-1 auth-line">or sign up with</div> */}
									{/* <div className="login-social">
										<Link href="#" className="btn-login-social">
											<img src="/images/logo/fb.jpg" alt="img" />
											Continue with Facebook
										</Link>
										<Link href="#" className="btn-login-social">
											<img src="/images/logo/google.jpg" alt="img" />
											Continue with Google
										</Link>
										<Link href="#" className="btn-login-social">
											<img src="/images/logo/tw.jpg" alt="img" />
											Continue with Twitter
										</Link>
									</div> */}
									<button type="submit" className="tf-btn primary w-100">Login</button>
									{/* <div className="mt-12 text-variant-1 text-center noti">Not registered yet?<Link href="/register" className="text-black fw-5">Sign Up</Link> </div> */}
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}