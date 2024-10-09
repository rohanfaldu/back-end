
export default function ModalRegister({ isRegister, handleRegister, handleLogin }) {
	return (
		<>
			<div className={`modal fade ${isRegister ? "show d-block" : ""}`} id="modalRegister">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="flat-account bg-surface">
							<h3 className="title text-center">Register</h3>
							<span className="close-modal icon-close2" onClick={handleRegister} />
							<form action="#">
								<fieldset className="box-fieldset">
									<label htmlFor="name">Username or email address<span>*</span>:</label>
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
								<fieldset className="box-fieldset">
									<label htmlFor="confirm">Confirm Password<span>*</span>:</label>
									<div className="box-password">
										<input type="password" className="form-contact style-1 password-field2" placeholder="Password" />
										<span className="show-pass2">
											<i className="icon-pass icon-eye" />
											<i className="icon-pass icon-eye-off" />
										</span>
									</div>
								</fieldset>
								<fieldset className="d-flex align-items-center gap-6">
									<input type="checkbox" className="tf-checkbox style-2" id="cb1" />
									<label htmlFor="cb1" className="caption-1 text-variant-1">I agree to the <span className="fw-5 text-black">Terms of User</span></label>
								</fieldset>
								<button type="submit" className="tf-btn primary w-100">Register</button>
								<div className="mt-12 text-variant-1 text-center noti">Already have an account?
									<a onClick={() => { handleLogin(); handleRegister() }} className="text-black fw-5">Login Here</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{isRegister &&
				<div className={`modal-backdrop fade show`} onClick={handleRegister} />
			}
		</>
	)
}
