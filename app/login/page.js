'use client'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Login() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
 	const [user, setUser] = useState(null);
 	const [errorMessage, setErrorMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [sucessMessage, setSucessMessage] = useState(false);
	const router = useRouter();
    const validationSchema = Yup.object({
        email_address: Yup.string()
			.email("Please enter a valid email address format")
          	.required("Email address is required"),
        password: Yup.string()
          .required("Password is required"),
    });
	const handleSubmit =async (values) => {
		//try {
			console.log(values);
			let data = JSON.stringify(values);
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/get/user`, data, {
			  headers: {
				"Content-Type": "application/json",
			  },
			});

			if(response.data.status === true) {
				if(response.data.data.userProfile.roles.name === 'admin') {
					setSucessMessage(true);	
					localStorage.setItem('token', response.data.data.token);
					localStorage.setItem('user', JSON.stringify(response.data.data.userProfile));

					// Set the token to expire in 1 hour (3600 seconds)
					const expirationTime = Date.now() + 3600000; // 1 hour from now
					localStorage.setItem('tokenExpiration', expirationTime);
					localStorage.setItem('isLoggedIn', 'true');
					router.push('/dashboard');
				} else {
					setErrorMessage('This account is not an admin account.');
				}
			} else {
				setErrorMessage(response.data.message);
			}
		//   } catch (error) {
		// 	setErrorMessage('Server Error. Please try again later.');
		// }
    };
	const messageClass = (sucessMessage) ? "message success" : "message error";
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
								{errorMessage && <div className={messageClass}>{errorMessage}</div>}
								{/* <form action="#">
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
									
								</form> */}
								<Formik
									initialValues={{ email_address: "", password: "" }}
									validationSchema={validationSchema}
									onSubmit={handleSubmit}
									>
									{({ errors, touched, handleChange, handleBlur }) => (
										<Form>
											<fieldset className="box-fieldset">
												<label htmlFor="name">Email Address<span>*</span>:</label>
												<Field type="text" id="email_address" name="email_address" className="form-control style-1" />
												<ErrorMessage name="email_address" component="div" className="error" />
											</fieldset>
											<fieldset className="box-fieldset admin-login-password">
												<label htmlFor="pass">Password<span>*</span>:</label>
												<Field 
													type={showPassword ? "text" : "password"}
													id="password" 
													name="password"
													onChange={handleChange}
													onBlur={handleBlur} 
													style={{ width: "100%", paddingRight: "2.5rem" }}
												/>
												<span
													onClick={() => setShowPassword((prev) => !prev)}
													className="show-password"
													>
													{showPassword ? <img src="/images/favicon/password-show.png" /> : <img src="/images/favicon/password-hide.png" /> }
												</span>
												<ErrorMessage name="password" component="div" className="error" />
											</fieldset>
											<div className="d-flex justify-content-between flex-wrap gap-12">
												<fieldset className="d-flex align-items-center gap-6">
													<Field
														type="checkbox"
														id="remeber_me" 
														name="remeber_me"
														className="tf-checkbox style-2"
													/>
													<label htmlFor="cb1" className="caption-1 text-variant-1">Remember me</label>
												</fieldset>
												{/* <Link href="#modalForgotPassword" className="caption-1 text-primary" onClick={handleForgotPassword}>Forgot password?</Link> */}
												<button type="submit" className="tf-btn primary w-100">Login</button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}