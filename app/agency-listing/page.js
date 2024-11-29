'use client'
import DeleteFile from "@/components/elements/DeleteFile"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { insertData } from "../../components/api/Axios/Helper";
import Preloader from "@/components/elements/Preloader";
import React, { useEffect, useState } from 'react';
export default function MyProperty() {
    const [properties, setProperties] = useState(null); // To store fetched data
 	const [loading, setLoading] = useState(true); // To manage loading state
  	const [error, setError] = useState(null); // To manage error state

    useEffect(() => {
		const fetchData = async () => {
		try {
            const type = { type: "agency" };
            const getUserInfo = await insertData('auth/getall', type);

			setProperties(getUserInfo.data); // Save data to state
			setLoading(false); // Stop loading
			setError(null); // Clear errors
		} catch (err) {
			setError(err.response?.data?.message || 'An error occurred'); // Handle error
			setLoading(false); // Stop loading
		}
		};

		fetchData(); // Fetch data on component mount
	}, []); // Empty dependency array ensures this runs only once on mount

    console.log(loading);
    console.log(properties);
	return (
		<>
        {loading
            ? 
                <Preloader /> 
            : 
            <>
                <DeleteFile />
                <LayoutAdmin>
                    <div className="wrap-dashboard-content">
                        <div className="row">
                            <div className="col-md-3">
                                <fieldset className="box-fieldset">
                                    <label htmlFor="title">
                                        Post Status:<span>*</span>
                                    </label>
                                    <select className="nice-select">

                                        <option data-value={1} className="option selected">Select</option>
                                        <option data-value={2} className="option">Publish</option>
                                        <option data-value={3} className="option">Pending</option>
                                        <option data-value={3} className="option">Hidden</option>
                                        <option data-value={3} className="option">Sold</option>
                                
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-md-9">
                        <fieldset className="box-fieldset">
                            <label htmlFor="title">
                                Post Status:<span>*</span>
                            </label>
                            <input type="text" className="form-control style-1" placeholder="Search by title" />
                        </fieldset>
                    </div>
                </div>
                <div className="widget-box-2 wd-listing">
                    <h6 className="title">Agency Listing</h6>
                    <div className="wrap-table">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email Address / Phone Number</th>
                                        <th>Date Published</th>
                                        <th>Status</th>
                                        <th>Feature</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { properties.map(user => (
                                    <tr class="file-delete">
                                        <td>
                                            <div class="listing-box">
                                                <div class="images">
                                                    <img src={user.image || '/images/avatar/user-image.png'} alt="images" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>{user.full_name}</span>
                                        </td>
                                        <td>
                                            <span>{user.email_address}</span><br/>
                                            <span>{user.mobile_number}</span>
                                        </td>
                                        <td>
                                            <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                        </td>
                                        <td>
                                            <div class="status-wrap">
                                                <Link href="#" className="btn-status">{user.status ? 'Published' : 'Inactive'}</Link>
                                            </div>
                                        </td>
                                        <td>
                                            <span>No</span>
                                        </td>
                                        <td>
                                            <ul class="list-action">
                                                <li><Link href="#" className="item"><i className="icon icon-edit" />Edit</Link></li>
                                                <li><Link href="#" className="item"><i className="icon icon-sold" />Sold</Link></li>
                                                <li><a className="remove-file item"><i className="icon icon-trash" />Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                                    <tr className="file-delete">
                                        <td>
                                            <div className="listing-box">
                                                <div className="images">
                                                    <img src="/images/avatar/user-image.png" alt="images" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>Rajesh</span>
                                        </td>
                                        <td>
                                            <span>test@gmail.com</span><br/>
                                            <span>8487002442</span>
                                        </td>
                                        <td>
                                            <span>April 9, 2024</span>
                                        </td>
                                        <td>
                                            <div className="status-wrap">
                                                <Link href="#" className="btn-status">Published</Link>
                                            </div>
                                        </td>
                                        <td>
                                            <span>No</span>
                                        </td>
                                        <td>
                                            <ul className="list-action">
                                                <li><Link href="#" className="item"><i className="icon icon-edit" />Edit</Link></li>
                                                <li><Link href="#" className="item"><i className="icon icon-sold" />Sold</Link></li>
                                                <li><a className="remove-file item"><i className="icon icon-trash" />Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr className="file-delete">
                                        <td>
                                            <div className="listing-box">
                                                <div className="images">
                                                    <img src="/images/avatar/user-image.png" alt="images" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>Rajesh</span>
                                        </td>
                                        <td>
                                            <span>test@gmail.com</span><br/>
                                            <span>8487002442</span>
                                        </td>
                                        <td>
                                            <span>April 9, 2024</span>
                                        </td>
                                        <td>
                                            <div className="status-wrap">
                                                <Link href="#" className="btn-status">Published</Link>
                                            </div>
                                        </td>
                                        <td>
                                            <span>No</span>
                                        </td>
                                        <td>
                                            <ul className="list-action">
                                                <li><Link href="#" className="item"><i className="icon icon-edit" />Edit</Link></li>
                                                <li><Link href="#" className="item"><i className="icon icon-sold" />Sold</Link></li>
                                                <li><a className="remove-file item"><i className="icon icon-trash" />Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <ul className="wd-navigation">
                            <li><Link href="#" className="nav-item active">1</Link></li>
                            <li><Link href="#" className="nav-item">2</Link></li>
                            <li><Link href="#" className="nav-item">3</Link></li>
                            <li><Link href="#" className="nav-item"><i className="icon icon-arr-r" /></Link></li>
                        </ul>
                    </div>
                </div>
            </div >

                </LayoutAdmin >
            </>
            }
		</>
	)
}