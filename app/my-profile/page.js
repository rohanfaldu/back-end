
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
export default function MyProfile() {

	return (
		<>

			<LayoutAdmin>
				<div className="widget-box-2 wrap-dashboard-content-2">
					<div className="box">
						<h6 className="title">Account Settings</h6>
						<div className="box-agent-account">
							<h6>Agent Account</h6>
							<p className="note">Your current account type is set to agent, if you want to remove your agent account, and return to normal account, you must click the button below</p>
							<Link href="#" className="tf-btn primary">Remove Agent Account</Link>
						</div>
					</div>
					<div className="box">
						<h6 className="title">Avatar</h6>
						<div className="box-agent-avt">
							<div className="avatar">
								<img src="/images/avatar/account.jpg" alt="avatar" loading="lazy" width={128} height={128} />
							</div>
							<div className="content uploadfile">
								<p>Upload a new avatar</p>
								<div className="box-ip">
									<input type="file" className="ip-file" />
								</div>
								<p>JPEG 100x100</p>
							</div>
						</div>
					</div>
					<div className="box">
						<h6 className="title">Agent Poster</h6>
						<div className="box-agent-avt">
							<div className="img-poster">
								<img src="/images/avatar/account-2.jpg" alt="avatar" loading="lazy" />
							</div>
							<div className="content uploadfile">
								<p>Upload a new poster</p>
								<div className="box-ip">
									<input type="file" className="ip-file" />
								</div>
								<span>JPEG 100x100</span>
							</div>
						</div>
					</div>
					<h6 className="title">Information</h6>
					<div className="box box-fieldset">
						<label htmlFor="name">Full name:<span>*</span></label>
						<input type="text" defaultValue="Demo Agent" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="desc">Description:<span>*</span></label>
						<textarea defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."} />
					</div>
					<div className="box grid-4 gap-30">
						<div className="box-fieldset">
							<label htmlFor="company">Your Company:<span>*</span></label>
							<input type="text" defaultValue="Your Company" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="position">Position:<span>*</span></label>
							<input type="text" defaultValue="Your Company" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="num">Office Number:<span>*</span></label>
							<input type="number" defaultValue={1332565894} className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="address">Office Address:<span>*</span></label>
							<input type="text" defaultValue="10 Bringhurst St, Houston, TX" className="form-control style-1" />
						</div>
					</div>
					<div className="box grid-4 gap-30 box-info-2">
						<div className="box-fieldset">
							<label htmlFor="job">Job:<span>*</span></label>
							<input type="text" defaultValue="Realter" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="email">Email address:<span>*</span></label>
							<input type="text" defaultValue="themeflat@gmail.com" className="form-control style-1" />
						</div>
						<div className="box-fieldset">
							<label htmlFor="phone">Your Phone:<span>*</span></label>
							<input type="number" defaultValue={1332565894} className="form-control style-1" />
						</div>
					</div>
					<div className="box box-fieldset">
						<label htmlFor="location">Location:<span>*</span></label>
						<input type="text" defaultValue="634 E 236th St, Bronx, NY 10466" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="fb">Facebook:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="tw">Twitter:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box box-fieldset">
						<label htmlFor="linkedin">Linkedin:<span>*</span></label>
						<input type="text" defaultValue="#" className="form-control style-1" />
					</div>
					<div className="box">
						<Link href="#" className="tf-btn primary">Save &amp; Update</Link>
					</div>
					<h6 className="title">Change password</h6>
					<div className="box grid-3 gap-30">
						<div className="box-fieldset">
							<label htmlFor="old-pass">Old Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field" placeholder="Password" />
								<span className="show-pass">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
						<div className="box-fieldset">
							<label htmlFor="new-pass">New Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field2" placeholder="Password" />
								<span className="show-pass2">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
						<div className="box-fieldset">
							<label htmlFor="confirm-pass">Confirm Password:<span>*</span></label>
							<div className="box-password">
								<input type="password" className="form-contact style-1 password-field3" placeholder="Password" />
								<span className="show-pass3">
									<i className="icon-pass icon-eye" />
									<i className="icon-pass icon-eye-off" />
								</span>
							</div>
						</div>
					</div>
					<div className="box">
						<Link href="#" className="tf-btn primary">Update Password</Link>
					</div>
				</div>

			</LayoutAdmin>
		</>
	)
}