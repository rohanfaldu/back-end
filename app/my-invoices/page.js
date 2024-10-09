
'use client'
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export default function MyInvoices() {
	const [startDate, setStartDate] = useState(new Date())
	const [endtDate, setEndDate] = useState(new Date())
	return (
		<>

			<LayoutAdmin>
				<div className="wrap-dashboard-content">
					<div className="row">
						<div className="col-xl-3 col-sm-6">
							<fieldset className="box-fieldset">
								<select className="nice-select">

									<option data-value={1} className="option selected">All Payment Status</option>
									<option data-value={2} className="option">Paid</option>
									<option data-value={3} className="option">Not Paid</option>

								</select>
							</fieldset>
						</div>
						<div className="col-xl-3 col-sm-6">
							<fieldset className="box-fieldset">
								<select className="nice-select">

									<option data-value={1} className="option">All Payment Method</option>
									<option data-value={2} className="option">Paypal</option>
									<option data-value={3} className="option">Wire Transfer</option>
									<option data-value={4} className="option">Free Package</option>

								</select>
							</fieldset>
						</div >
						<div className="col-xl-2 col-sm-6">
							<div className="box-fieldset">
								<div className="ip-group icon">
									<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="ip-datepicker icon hasDatepicker" />
								</div>
							</div>
						</div>
						<div className="col-xl-2 col-sm-6">
							<div className="box-fieldset">
								<div className="ip-group icon">
									<DatePicker selected={endtDate} onChange={(date) => setEndDate(date)} className="ip-datepicker icon hasDatepicker" />
								</div>
							</div>
						</div>
						<div className="col-xl-2">
							<Link href="#" className="tf-btn primary">Search</Link>
						</div>
					</div >
					<div className="widget-box-2 wd-listing">
						<h6 className="title">My Invoice</h6>
						<div className="wrap-table">
							<div className="table-responsive">
								<table>
									<thead>
										<tr>
											<th>Invoice ID</th>
											<th>Package Name</th>
											<th>Price ($)</th>
											<th>Payment Method</th>
											<th>Payment Status</th>
											<th>Purchase Date</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<span className="text-center">
													1524
												</span>
											</td>
											<td>
												<span>Free</span>
											</td>
											<td>
												<span>$5050,00</span>
											</td>
											<td>
												<span>Free Package</span>
											</td>
											<td>
												<span>Paid</span>
											</td>
											<td>
												<span>April 9, 2024</span>
											</td>
											<td className="box-action-print">
												<Link href="#" className="icon icon-eye" />
											</td>
										</tr>
										{/* col 2 */}
										<tr>
											<td>
												<span className="text-center">
													1525
												</span>
											</td>
											<td>
												<span>Free</span>
											</td>
											<td>
												<span>$5050,00</span>
											</td>
											<td>
												<span>Free Package</span>
											</td>
											<td>
												<span>Not Paid</span>
											</td>
											<td>
												<span>February 18, 2024</span>
											</td>
											<td className="box-action-print">
												<Link href="#" className="icon icon-eye" />
											</td>
										</tr>
										{/* col 3 */}
										<tr>
											<td>
												<span className="text-center">
													1526
												</span>
											</td>
											<td>
												<span>Free</span>
											</td>
											<td>
												<span>$5050,00</span>
											</td>
											<td>
												<span>Free Package</span>
											</td>
											<td>
												<span>Paid</span>
											</td>
											<td>
												<span>April 9, 2024</span>
											</td>
											<td className="box-action-print">
												<Link href="#" className="icon icon-eye" />
											</td>
										</tr>
										{/* col 4 */}
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
	)
}