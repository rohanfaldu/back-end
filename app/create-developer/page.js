'use client'
import PropertyMap from "@/components/elements/PropertyMap"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { userType } from "../../components/common/functions";
import { useState } from "react"
import passwordShow from "../../public/images/favicon/password-show.png"; 
import passwordHide from "../../public/images/favicon/password-hide.png"; 
export default function AddProperty() {
    const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [sucessMessage, setSucessMessage] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string()
          .min(3, "Username must be at least 3 characters")
          .required("Username is required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone Number is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, {resetForm}) => {
        console.log(123)
        const userData = {
			full_name: values.username, 
			user_name: values.username, 
			email_address: values.email, 
			fcm_token: '', 
			image_url: '', 
			type: "developer", 
			user_login_type	: userType("NONE"),
			mobile_number: values.phone, 
			password: values.password
		}
		
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/create-normal/user`, userData, {
			headers: {
			"Content-Type": "application/json",
			},
		});
		if(response.data.status === true) {
			setSucessMessage(true);
			setErrorMessage(response.data.message);
			resetForm();
		} 
		setErrorMessage(response.data.message);
        console.log("Form data:", values);
        // Here, you can make an API call to submit form data
    };
	const [selectedRadio, setSelectedRadio] = useState('radio1')

	const handleRadioChange = (event) => {
		const selectedRadioId = event.target.id
		setSelectedRadio(selectedRadioId)
	}
	return (
		<>

			{/* <DeleteFile /> */}

			<LayoutAdmin>
            <Formik
                initialValues={{ username: "", email: "", password: "", phone: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            {/* <div className="widget-box-2">
                                <h6 className="title">Upload Media</h6>
                                <div className="box-uploadfile text-center">
                                    <label className="uploadfile">
                                        <span className="icon icon-img-2" />
                                        <div className="btn-upload">
                                            <Link href="#" className="tf-btn primary">Choose Image</Link>
                                            <input type="file" className="ip-file" />
                                        </div>
                                        <p className="file-name fw-5">Or drop image here to upload</p>
                                    </label>
                                </div>
                            </div> */}
                            <div className="widget-box-2">
                                <h6 className="title">Developer Information</h6>
                                <div className="box-info-property">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">User Name:<span>*</span></label>
                                        <Field type="text" id="username" name="username" className="form-control style-1" />
                                        <ErrorMessage name="username" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Email:<span>*</span></label>
                                        <Field type="email" id="email" name="email" />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Phone:<span>*</span></label>
                                        <Field type="text" id="phone" name="phone" />
                                        <ErrorMessage name="phone" component="div" className="error" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
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
                                    {/*<div className="box grid-3 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="address">
                                                Full Address:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" placeholder="Enter property full address" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="zip">
                                                Zip Code:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" placeholder="Enter property zip code" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="country">
                                                Country:<span>*</span>
                                            </label>
                                            <select className="nice-select">

                                                <option data-value={1} className="option selected">United States</option>
                                                <option data-value={2} className="option">United Kingdom</option>
                                                <option data-value={3} className="option">Russia</option>

                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="box grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="state">
                                                Province/State:<span>*</span>
                                            </label>
                                            <select className="nice-select">

                                                <option data-value={1} className="option selected">None</option>
                                                <option data-value={2} className="option">Texas</option>
                                                <option data-value={3} className="option">New York</option>
                                            </select>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="neighborhood">
                                                Neighborhood:<span>*</span>
                                            </label>
                                            <select className="nice-select">

                                                <option data-value={1} className="option selected">None</option>
                                                <option data-value={2} className="option">Little Italy</option>
                                                <option data-value={3} className="option"> Bedford Park</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="box box-fieldset">
                                        <label htmlFor="location">Location:<span>*</span></label>
                                        <div className="box-ip">
                                            <input type="text" className="form-control style-1" />
                                            <Link href="#" className="btn-location"><i className="icon icon-location" /></Link>
                                        </div>
                                        <PropertyMap singleMap />
                                    </div> */}
                                </div>
                            </div>
                            {/*<div className="widget-box-2">
                                <h6 className="title">Price</h6>
                                <div className="box-price-property">
                                    <div className="box grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                                Price:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" placeholder="Example value: 12345.67" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="neighborhood">
                                                Unit Price:<span>*</span>
                                            </label>
                                            <select className="nice-select">

                                                <option data-value={1} className="option selected">None</option>
                                                <option data-value={2} className="option">1000</option>
                                                <option data-value={3} className="option">2000</option>

                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                                Before Price Label:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                                After Price Label:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                    </div>
                                    <fieldset className="box-cb d-flex align-items-center gap-6">
                                        <input type="checkbox" className="tf-checkbox" id="cb-ip" />
                                        <label htmlFor="cb-ip">Price to Call</label>
                                    </fieldset>
                                </div>
                            </div >
                            <div className="widget-box-2">
                                <h6 className="title">Addtional Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="type">
                                            Property Type:<span>*</span>
                                        </label>
                                        <select className="nice-select">

                                            <option data-value={1} className="option">Apartment</option>
                                            <option data-value={2} className="option">Villa</option>
                                            <option data-value={3} className="option">Studio</option>
                                            <option data-value={4} className="option">Studio</option>
                                            <option data-value={5} className="option">Office</option>
                                            <option data-value={6} className="option">Townhouse</option>

                                        </select>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="status">
                                            Property Status:<span>*</span>
                                        </label>
                                        <select className="nice-select">

                                            <option data-value={1} className="option">For Rent</option>
                                            <option data-value={2} className="option">For Sale</option>

                                        </select>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="label">
                                            Property Label:<span>*</span>
                                        </label>
                                        <select className="nice-select">

                                            <option data-value={1} className="option">New Listing</option>
                                            <option data-value={2} className="option">Open House</option>

                                        </select>
                                    </fieldset >
                                </div >
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="size">
                                            Size (SqFt):<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="land">
                                            Land Area (SqFt):<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="id">
                                            Property ID:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="rom">
                                            Rooms:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">
                                            Bedrooms:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bathrooms">
                                            Bathrooms:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="garages">
                                            Garages:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="garages-size">
                                            Garages Size (SqFt):<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="year">
                                            Year Built:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                </div>
                            </div >
                            <div className="widget-box-2">
                                <h6 className="title">Amenities<span>*</span></h6>
                                <div className="box-amenities-property">
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Home safety:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb1" defaultChecked />
                                            <label htmlFor="cb1" className="text-cb-amenities">Smoke alarm</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb2" />
                                            <label htmlFor="cb2" className="text-cb-amenities">Carbon monoxide alarm</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb3" defaultChecked />
                                            <label htmlFor="cb3" className="text-cb-amenities">First aid kit</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb4" defaultChecked />
                                            <label htmlFor="cb4" className="text-cb-amenities">Self check-in with lockbox</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb5" />
                                            <label htmlFor="cb5" className="text-cb-amenities">Security cameras</label>
                                        </fieldset>
                                    </div>
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Bedroom:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb6" />
                                            <label htmlFor="cb6" className="text-cb-amenities">Hangers</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb7" defaultChecked />
                                            <label htmlFor="cb7" className="text-cb-amenities">Bed linens</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb8" />
                                            <label htmlFor="cb8" className="text-cb-amenities">Extra pillows &amp; blankets</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb9" />
                                            <label htmlFor="cb9" className="text-cb-amenities">Iron</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb10" defaultChecked />
                                            <label htmlFor="cb10" className="text-cb-amenities">TV with standard cable</label>
                                        </fieldset>
                                    </div>
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Kitchen:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb11" />
                                            <label htmlFor="cb11" className="text-cb-amenities">Refrigerator</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb12" />
                                            <label htmlFor="cb12" className="text-cb-amenities">Microwave</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb13" />
                                            <label htmlFor="cb13" className="text-cb-amenities">Dishwasher</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" className="tf-checkbox style-1 primary" id="cb14" />
                                            <label htmlFor="cb14" className="text-cb-amenities">Coffee maker</label>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">File Attachments</h6>
                                <div className="box-uploadfile text-center">
                                    <label className="uploadfile style-1">
                                        <span className="icon icon-img-2" />
                                        <div className="btn-upload">
                                            <Link href="#" className="tf-btn primary">Choose File</Link>
                                            <input type="file" className="ip-file" />
                                        </div>
                                        <p className="file-name fw-5">Or drop file here to upload</p>
                                    </label>
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Virtual Tour 360</h6>
                                <div className="box-radio-check">
                                    <div className="fw-7">Virtual Tour Type:</div>
                                    <fieldset className="fieldset-radio">
                                        <input
                                            type="radio"
                                            className="tf-radio"
                                            name="radio"
                                            id="radio1"
                                            checked={selectedRadio === 'radio1'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio1" className="text-radio">
                                            Embedded code
                                        </label>
                                    </fieldset>

                                    <fieldset className="fieldset-radio">
                                        <input
                                            type="radio"
                                            className="tf-radio"
                                            name="radio"
                                            id="radio2"
                                            checked={selectedRadio === 'radio2'}
                                            onChange={handleRadioChange}
                                        />
                                        <label htmlFor="radio2" className="text-radio">
                                            Upload image
                                        </label>
                                    </fieldset>
                                </div>
                                <fieldset className="box-fieldset">
                                    <label htmlFor="embedded">Embedded Code Virtual 360</label>
                                    <textarea className="textarea" defaultValue={""} />
                                </fieldset>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Videos</h6>
                                <fieldset className="box-fieldset">
                                    <label htmlFor="video">Video URL:</label>
                                    <input type="text" className="form-control style-1" placeholder="Youtube, vimeo url" />
                                </fieldset>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Floors</h6>
                                <div className="box-radio-check">
                                    <div className="fw-7">Enable Floor Plan:</div>
                                    <fieldset className="fieldset-radio">
                                        <input type="radio" className="tf-radio" name="radio2" id="radio3" defaultChecked />
                                        <label htmlFor="radio3" className="text-radio">Enable</label>
                                    </fieldset>
                                    <fieldset className="fieldset-radio">
                                        <input type="radio" className="tf-radio" name="radio2" id="radio4" />
                                        <label htmlFor="radio4" className="text-radio">Disable</label>
                                    </fieldset>
                                </div>
                                <div className="box-floor-property file-delete">
                                    <div className="top d-flex justify-content-between align-items-center">
                                        <h6>Floor 1:</h6>
                                        <Link href="#" className="remove-file tf-btn primary">Delete Floor 1</Link>
                                    </div>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="name">Floor Name:</label>
                                        <input type="text" className="form-control style-1" />
                                    </fieldset>
                                    <div className="grid-2 box gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="floor-price">Floor Price (Only Digits):</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price-postfix">Price Postfix:</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                    </div>
                                    <div className="grid-2 box gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="floor-size">Floor Size (Only Digits):</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="size-postfix">Size Postfix:</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                    </div>
                                    <div className="grid-2 box gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="bedrooms">Bedrooms:</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="bathrooms">Bathrooms:</label>
                                            <input type="text" className="form-control style-1" />
                                        </fieldset>
                                    </div>
                                    <div className="grid-2 box gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="bedrooms">Floor Image:</label>
                                            <div className="box-floor-img uploadfile">
                                                <div className="btn-upload">
                                                    <Link href="#" className="tf-btn primary">Choose File</Link>
                                                    <input type="file" className="ip-file" />
                                                </div>
                                                <p className="file-name fw-5">Or drop file here to upload</p>
                                            </div>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="bathrooms">Description:</label>
                                            <textarea className="textarea" defaultValue={""} />
                                        </fieldset>
                                    </div>
                                </div>
                                <Link href="#" className="tf-btn primary btn-add-floor">Add New Floor</Link>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Agent Information</h6>
                                <div className="box-radio-check">
                                    <div className="fw-7">Choose type agent infomation?</div>
                                    <fieldset className="fieldset-radio">
                                        <input type="radio" className="tf-radio" name="radio3" id="radio5" defaultChecked />
                                        <label htmlFor="radio5" className="text-radio">Your current user information</label>
                                    </fieldset>
                                    <fieldset className="fieldset-radio">
                                        <input type="radio" className="tf-radio" name="radio3" id="radio6" />
                                        <label htmlFor="radio6" className="text-radio">Other contact</label>
                                    </fieldset>
                                </div>
                            </div>
                                */}
                            <button type="submit"  className="tf-btn primary" >Add Developer</button>
                        </div >
                    </Form>
                )}
                </Formik>
				

			</LayoutAdmin >
		</>
	)
}