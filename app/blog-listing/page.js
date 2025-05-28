'use client';

import DeleteFile from "@/components/elements/DeleteFile";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import Link from "next/link";
import { insertData, deletedData } from "../../components/api/Axios/Helper";
import Preloader from "@/components/elements/Preloader";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EditIcon from "../../public/images/favicon/edit.png";
import DeleteIcon from "../../public/images/favicon/delete.png";
import variablesList from "../../components/common/variable";
import ViewIcon from "../../public/images/favicon/view.png";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from "react";


export default function BlogListing() {
	const [blog, setBlog] = useState([]); // Store properties for the current page
	const [loading, setLoading] = useState(true); // Manage loading state
	const [error, setError] = useState(null); // Manage error state
	const [searchTerm, setSearchTerm] = useState(''); // Store search input
	const [statusFilter, setStatusFilter] = useState(''); // Store selected status filter
	const [pagination, setPagination] = useState({
		totalCount: 0,
		totalPages: 0,
		currentPage: variablesList.currentPage,
		itemsPerPage: variablesList.itemsPerPage,
	}); // Track pagination info

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [deleteBlogid, setDeleteBlogid] = useState('');

	const startDateRef = useRef(null);
	const endDateRef = useRef(null);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");


	const formattedStartDate = startDate ? `${startDate}T00:00:00.000Z` : null;
	const formattedEndDate = endDate ? `${endDate}T23:59:59.999Z` : null;
	const fetchBlog = async (page = variablesList.currentPage, term = '', status = '') => {
		setLoading(true);
		try {
			const requestData = {
				page,
				limit: pagination.itemsPerPage,
				lang: "en",
				title: "",
				description: "",
				startDate: formattedStartDate,
				endDate: formattedEndDate,
			};

			const response = await insertData("api/blog/getall", requestData, true);
			console.log(response);
			if (response.status) {

				const { blogs, totalCount, totalPages, currentPage } = response.data;
				setBlog(blogs);
				setPagination({
					...pagination,
					totalCount,
					totalPages,
					currentPage,
				});
				setError(null);
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBlog(pagination.currentPage, searchTerm, statusFilter);
	}, [pagination.currentPage, searchTerm, statusFilter]);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on search
	};

	const handleStatusChange = (e) => {
		setStatusFilter(e.target.value);
		setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on filter
	};

	const handleView = (slug) => {
		const URL = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
		  window.open(URL, '_blank')
	};

	const handleDelete = async () => {
		try {
			const response = await deletedData(`api/blog/delete/${deleteBlogid}`, { blogId: deleteBlogid });
			if (response.status) {
				setIsModalOpen(false);
				fetchProperties(pagination.currentPage, searchTerm, statusFilter);
				router.replace("/blog-listing");
			} else {
				alert(response.message);
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		}
	};

	const handlePageChange = (page) => {
		setPagination({ ...pagination, currentPage: page });
	};

	const openModal = (id) => {
		setIsModalOpen(true);
		setDeleteBlogid(id);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};


	const exportToExcel = async () => {
		try {
			console.log("Exporting to Excel...");

			if (!blog || blog.length === 0) {
				alert("No data to export");
				return;
			}

			// Ensure properties data exists
			console.log("blog:", blog);

			// Create a new workbook instance
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet("Blog Comments");

			// Define columns
			worksheet.columns = [
				{ header: "Title", key: "title", width: 60 },
				{ header: "image", key: "image", width: 15 },
				{ header: "Date", key: "date", width: 25 },
			];

			// Apply bold font to the header row
			worksheet.getRow(1).font = { bold: true };

			// Add data to worksheet
			blog.forEach((b) => {
				worksheet.addRow({
					title: p?.title || "N/A",
					image: p?.image || "N/A",
					date: p?.created_at ? new Date(b?.created_at).toLocaleDateString() : "N/A"
				});
			});

			// Apply border to all cells
			worksheet.eachRow((row) => {
				row.eachCell((cell) => {
					cell.alignment = { horizontal: "center", vertical: "middle" };
					cell.border = {
						top: { style: "thin" },
						left: { style: "thin" },
						bottom: { style: "thin" },
						right: { style: "thin" },
					};
				});
			});

			// Write to buffer and save the file
			const buffer = await workbook.xlsx.writeBuffer();
			saveAs(new Blob([buffer]), "active_blog.xlsx");

			console.log("Excel file exported successfully!");
		} catch (error) {
			console.error("Excel export error:", error);
			alert("Error exporting to Excel: " + error.message);
		}
	};


	const exportToPDF = () => {
		if (blog.length === 0) {
			alert("No data to export");
			return;
		}

		const doc = new jsPDF();

		// Table data
		const tableBody = blog.map((b) => [
			blog?.title || "N/A",
			blog?.image || "N/A",
			blog?.created_at ? new Date(blog?.created_at).toLocaleDateString() : "N/A",
		]);

		// Generate table
		autoTable(doc, {
			head: [["Title", "image", "Date"]],
			body: tableBody,
			columnStyles: {
				0: { cellWidth: 40 },
				1: { cellWidth: 70 },
				2: { cellWidth: 30 },
				4: { cellWidth: 20 },
			},
			styles: { fontSize: 10, cellPadding: 5 },
			didDrawCell: (data) => {
				if (data.column.index === 3 && blog[data.row.index]?.users?.image) {
					const imgUrl = blog[data.row.index].users.image;
					const x = data.cell.x + 5;
					const y = data.cell.y + 3;
					const width = 20;
					const height = 20;
					doc.addImage(imgUrl, "JPEG", x, y, width, height);
				}
			},
		});

		doc.save("active_blog.pdf");
	};




	return (
		<>
			{loading ? (
				<Preloader />
			) : (
				<>
					<DeleteFile />
					<LayoutAdmin>

						<div className="wrap-dashboard-content">
							<div className="widget-box-2 wd-listing">
								<div class="top d-flex justify-content-between align-items-center">
									<h6 className="title">Blog Listing</h6>
									{/* <Link className="remove-file tf-btn primary" href="/create-property">Add Property</Link> */}

									<div style={{ display: "flex", alignItems: "center" }}>
										<div>
											<Link className="remove-file tf-btn primary" href="/create-blog" style={{ marginRight: "20px" }}>Add Blog</Link>
										</div>
										<div>
											<button onClick={exportToExcel} className="tf-btn primary" style={{ marginRight: "20px" }}>Export Excel</button>
											<button onClick={exportToPDF} className="tf-btn secondary">Export PDF</button>
										</div>
									</div>


								</div>


								<div className="top d-flex justify-content-between align-items-center mt-3">

									<div style={{ display: "flex", flexDirection: "column", flex: 1, marginRight: "40px" }}>
										<label htmlFor="start-date" style={{ marginBottom: "5px", fontWeight: "bold" }}>Start Date</label>
										<input
											type="date"
											id="start-date"
											ref={startDateRef}
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
											onClick={() => startDateRef.current.showPicker()}
											style={{ padding: "5px", cursor: "pointer", width: "100%" }}
										/>
									</div>

									{/* End Date */}
									<div style={{ display: "flex", flexDirection: "column", flex: 1, marginRight: "40px" }}>
										<label htmlFor="end-date" style={{ marginBottom: "5px", fontWeight: "bold" }}>End Date</label>
										<input
											type="date"
											id="end-date"
											ref={endDateRef}
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
											onClick={() => endDateRef.current.showPicker()}
											style={{ padding: "5px", cursor: "pointer", width: "100%" }}
										/>
									</div>

									{/* Button */}
									<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
										<label style={{ visibility: "hidden", marginBottom: "5px" }}>Filter</label>
										<button
											onClick={() => fetchBlog(1,)}
											className="tf-btn primary"
											style={{ width: "100%" }}
										>
											Filter Date Range
										</button>
									</div>
								</div>


								{blog.length > 0 ? (
									<>
										<div className="wrap-table">
											<div className="table-responsive">
												<table>
													<thead>
														<tr>
															<th>Image</th>
															<th>Title</th>
															<th>Date Published</th>
															<th>Status</th>
															<th>Action</th>
														</tr>
													</thead>
													<tbody>
														{blog.map((blog) => (
															<tr key={blog.id}>
																<td>
																	<div className="listing-box">
																		<div className="images">
																			<img
																				src={blog.image || '/images/avatar/user-image.png'}
																				alt="blog"
																			/>
																		</div>
																	</div>
																</td>
																<td>{blog.title}</td>
																<td>{new Date(blog.created_at).toLocaleDateString()}</td>
																<td>
																	<div className="status-wrap">
																		<Link href="#" className="btn-status" onClick={() => statusChange(blog.id)}>
																			{blog.status ? "Active" : "Inactive"}
																		</Link>
																	</div>
																</td>
																<td>
																	<ul className="list-action">
																		{/* <li className="edit">
																			<Link href={`/edit-property/${property.id}`} className="item">
																			<Image
																				src={EditIcon} // Imported image object or static path
																				alt="Edit icon"
																				width={25}
																				height={25}
																			/>
																			</Link>
																		</li> */}
																		<li className="edit">
																			<Link href={`/edit-blog/${blog.id}`} className="item">
																				<Image
																					src={EditIcon}
																					alt="Edit icon"
																					width={25}
																					height={25}
																				/>
																			</Link>
																		</li>

																		<li className="delete">
																			<a
																				className="remove-file item"
																				onClick={() => openModal(blog.id)}
																			>
																				<Image
																					src={DeleteIcon}
																					alt="Delete icon"
																					width={25}
																					height={25}
																				/>
																			</a>
																		</li>
																		<li className="delete">
																			<a
																				className="remove-file item"
																				onClick={() => handleView(blog.slug)}
																				style={{ border: 'none', background: 'transparent', padding: 0 }}
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				<Image
																					src={ViewIcon} // Imported image object or static path
																					alt="View icon"
																					width={25}
																					height={25}
																				/>
																			</a>
																		</li>


																	</ul>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
											<ul className="wd-navigation">
												{Array.from({ length: pagination.totalPages }, (_, index) => (
													<li key={index}>
														<Link
															href="#"
															className={`nav-item ${pagination.currentPage === index + 1 ? 'active' : ''}`}
															onClick={() => handlePageChange(index + 1)}
														>
															{index + 1}
														</Link>
													</li>
												))}
											</ul>
										</div>
									</>
								) : (
									<div>No records found</div>
								)}
							</div>
						</div>
						{isModalOpen && (
							<div className="modal">
								<div className="modal-content">
									<>

										<h2>Delete Item</h2>
										<p>Are you sure you want to delete this item?</p>
										<div>
											<button className="tf-btn primary " onClick={handleDelete}>Yes, Delete</button>
											<button className="tf-btn primary" onClick={closeModal}>Cancel</button>
										</div>
									</>

								</div>
							</div>
						)}
					</LayoutAdmin>
				</>
			)}
		</>
	);
}
