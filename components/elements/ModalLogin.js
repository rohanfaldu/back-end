import Link from "next/link"

export default function ModalLogin({ isLogin, handleLogin, isRegister, handleRegister }) {
	return (
		<>
			<div className={`modal fade ${isLogin ? "show d-block" : ""}`} id="modalLogin">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="flat-account bg-surface">
							<h3 className="title text-center">Log In</h3>
							<span className="close-modal icon-close2" onClick={handleLogin} />
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
								<div className="text-variant-1 auth-line">or sign up with</div>
								<div className="login-social">
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
								</div>
								<button type="submit" className="tf-btn primary w-100">Login</button>
								<div className="mt-12 text-variant-1 text-center noti">Not registered yet?
									<a onClick={() => { handleLogin(); handleRegister() }} className="text-black fw-5">Sign Up</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{isLogin &&
				<div className={`modal-backdrop fade show`} onClick={handleLogin} />
			}

		</>
	)
}
