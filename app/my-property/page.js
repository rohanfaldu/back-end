
import DeleteFile from "@/components/elements/DeleteFile"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link"
export default function MyProperty() {

	return (
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
				<h6 className="title">My Properties</h6>
				<div className="wrap-table">
					<div className="table-responsive">
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Date Published</th>
									<th>Status</th>
									<th>Feature</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr className="file-delete">
									<td>
										<div className="listing-box">
											<div className="images">
												<img src="/images/home/house-1.jpg" alt="images" />
											</div>
											<div className="content">
												<div className="title"><Link href="/property-details-v1" className="link">Gorgeous Apartment Building</Link> </div>
												<div className="text-date">12 Lowell Road, Port Washington</div>
												<div className="text-1 fw-7">$5050,00</div>
											</div>
										</div>
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
								{/* col 2 */}
								<tr className="file-delete">
									<td>
										<div className="listing-box">
											<div className="images">
												<img src="/images/home/house-2.jpg" alt="images" />
											</div>
											<div className="content">
												<div className="title"><Link href="/property-details-v1" className="link">Mountain Mist Retreat, Aspen</Link> </div>
												<div className="text-date">Brian Drive, Montvale, New Jersey</div>
												<div className="text-1 fw-7">$5050,00</div>
											</div>
										</div>
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
								{/* col 3 */}
								<tr className="file-delete">
									<td>
										<div className="listing-box">
											<div className="images">
												<img src="/images/home/house-3.jpg" alt="images" />
											</div>
											<div className="content">
												<div className="title"><Link href="/property-details-v1" className="link">Lakeview Haven, Lake Tahoe</Link> </div>
												<div className="text-date">12 Lowell Road, Port Washington</div>
												<div className="text-1 fw-7">$5050,00</div>
											</div>
										</div>
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
								{/* col 4 */}
								<tr className="file-delete">
									<td>
										<div className="listing-box">
											<div className="images">
												<img src="/images/home/house-4.jpg" alt="images" />
											</div>
											<div className="content">
												<div className="title"><Link href="/property-details-v1" className="link">Coastal Serenity Cottage</Link> </div>
												<div className="text-date">Brian Drive, Montvale, New Jersey</div>
												<div className="text-1 fw-7">$5050,00</div>
											</div>
										</div>
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
	)
}