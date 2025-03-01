'use client';

import DeleteFile from "@/components/elements/DeleteFile";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import Link from "next/link";
import Image from 'next/image';
import { insertData, deletedData } from "../../components/api/Axios/Helper";
import Preloader from "@/components/elements/Preloader";
import React, { useEffect, useState } from 'react';
import EditIcon from "../../public/images/favicon/edit.png";
import DeleteIcon from "../../public/images/favicon/delete.png";
import ViewIcon from "../../public/images/favicon/view.png";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useRef } from "react"; 


export default function MyProperty() {
  const [properties, setProperties] = useState([]); // Store all fetched properties
  const [filteredProperties, setFilteredProperties] = useState([]); // Store filtered properties
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [statusFilter, setStatusFilter] = useState(''); // Store selected status filter
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePropertyid, setDeletePropertyid] = useState('');

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    

    fetchData(); // Fetch data on component mount
  }, []);

  const formattedStartDate = startDate ? `${startDate}T00:00:00.000Z` : null;
    const formattedEndDate = endDate ? `${endDate}T23:59:59.999Z` : null;
    const fetchData = async () => {
      try {
        const type = 
        { 
          type: "developer",
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
        const getUserInfo = await insertData('auth/getall', type, false);
        console.log(getUserInfo);
        setProperties(getUserInfo.data.user_data); // Save all properties
        setFilteredProperties(getUserInfo.data.user_data); // Initially display all properties
        setLoading(false); // Stop loading
        setError(null); // Clear errors
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred'); // Handle error
        setLoading(false); // Stop loading
      }
    };
  // console.log('filteredProperties');
  // console.log(filteredProperties.length);
  useEffect(() => {
    filterAndPaginateData(); // Apply filter and pagination whenever inputs change
  }, [searchTerm, statusFilter, currentPage, properties]);

  const handleView = (id) => {
    const URL = `${process.env.NEXT_PUBLIC_SITE_URL}/developer/${id}`;
      window.open(URL, '_blank')
  };

  // Filter and paginate properties
  const filterAndPaginateData = (updatedProperties = properties) => {
    let filtered = updatedProperties;
  
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(property => property.status === statusFilter);
    }
  
    // Paginate results
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  
    setFilteredProperties(paginated);
  };
  

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDelete = async () => {
    console.log();
    try {
      const deleteData = { id: deletePropertyid, type: "developer" };
      const agencyDeleteId = { user_id: deletePropertyid };
      const deleteDeveloperInfo = await deletedData(`api/developer/${deletePropertyid}`, agencyDeleteId);
  
      if (deleteDeveloperInfo.status) {
        const deleteUserInfo = await insertData('auth/delete/user', deleteData);
        if (deleteUserInfo.status) {
          // Filter out the deleted property
          const filteredData = properties.filter((item) => item.id !== deletePropertyid);
          console.log(filteredData);
          setIsModalOpen(false);
          setProperties(filteredData); // Save all properties
          setSearchTerm(''); // Reset search input
          setStatusFilter(''); // Reset status filter
          setCurrentPage(1); // Reset pagination to the first page
          
          // Call filter and paginate with updated properties
          filterAndPaginateData(filteredData); // Pass the filtered data to the function
        } else {
          alert(deleteUserInfo.message);
        }
      } else {
        alert(deleteDeveloperInfo.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred'); // Handle error
      setLoading(false); // Stop loading
    }
  };
  

  // Handle status filter change
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };
  
  const openModal = (id) => {
    setIsModalOpen(true);
    setDeletePropertyid(id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const exportToExcel = async () => {
    try {
      console.log("Exporting to Excel...");
  
      if (!properties || properties.length === 0) {
        alert("No data to export");
        return;
      }
  
      // Ensure properties data exists
      console.log("Properties:", properties);
  
      // Create a new workbook instance
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Property Comments");
  
      // Define columns
      worksheet.columns = [
        { header: "Name", key: "name", width: 20 },
        { header: "Email", key: "email", width: 25 },
        { header: "Mobile", key: "mobile", width: 15 },
        { header: "Date", key: "date", width: 50 },
      ];
  
      // Apply bold font to the header row
      worksheet.getRow(1).font = { bold: true };
  
      // Add data to worksheet
      properties.forEach((p) => {
        worksheet.addRow({
          name: p?.full_name || "N/A",
          email: p?.email_address || "N/A",
          mobile: p?.mobile_number || "N/A",
          date: p?.created_at ? new Date(p?.created_at).toLocaleDateString() : "N/A"
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
      saveAs(new Blob([buffer]), "active_developers.xlsx");
  
      console.log("Excel file exported successfully!");
    } catch (error) {
      console.error("Excel export error:", error);
      alert("Error exporting to Excel: " + error.message);
    }
  };


    const exportToPDF = () => {
    if (properties.length === 0) {
      alert("No data to export");
      return;
    }

    const doc = new jsPDF();

    // Table data
    const tableBody = properties.map((property) => [
      property?.full_name || "N/A",
      property?.email_address || "N/A",
      property?.mobile_number || "N/A",
      property?.created_at ? new Date(property?.created_at).toLocaleDateString() : "N/A",
    ]);

    // Generate table
    autoTable(doc, {
      head: [["Name", "Email", "Mobile", "Date"]],
      body: tableBody,
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 30 },
        4: { cellWidth: 40 },
      },
      styles: { fontSize: 10, cellPadding: 5 },
      didDrawCell: (data) => {
        if (data.column.index === 3 && properties[data.row.index]?.users?.image) {
          const imgUrl = properties[data.row.index].users.image;
          const x = data.cell.x + 5;
          const y = data.cell.y + 3;
          const width = 20;
          const height = 20;
          doc.addImage(imgUrl, "JPEG", x, y, width, height);
        }
      },
    });

    doc.save("active_developers.pdf");
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
              {/* <div className="row">
                <div className="col-md-3">
                  <fieldset className="box-fieldset">
                    <label htmlFor="status">Post Status:<span>*</span></label>
                    <select className="nice-select" onChange={handleStatusChange}>
                      <option value="">Select</option>
                      <option value="Published">Publish</option>
                      <option value="Pending">Pending</option>
                      <option value="Hidden">Hidden</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </fieldset>
                </div>
                <div className="col-md-9">
                  <fieldset className="box-fieldset">
                    <label htmlFor="search">Search by Title:<span>*</span></label>
                    <input
                      type="text"
                      className="form-control style-1"
                      placeholder="Search by title"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </fieldset>
                </div>
              </div> */}

              <div className="widget-box-2 wd-listing">
                
                <div class="top d-flex justify-content-between align-items-center">
                  <h6 className="title">Developer Listing</h6>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <div>
                      <Link className="remove-file tf-btn primary" href="/create-developer" style={{marginRight: "20px"}}>Add Developers</Link>
                    </div>
                    <div>
                      <button onClick={exportToExcel} className="tf-btn primary" style={{marginRight: "20px"}}>Export Excel</button>
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
                      onClick={() => fetchData()} 
                      className="tf-btn primary" 
                      style={{ width: "100%" }}
                    >
                      Filter Date Range
                    </button>
                  </div>
                  </div>
                
                  {(Array.isArray(filteredProperties) && filteredProperties.length > 0)?
                    <>
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
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredProperties.map(user => (
                                <tr key={user.id} className="file-delete">
                                  <td>
                                    <div className="listing-box">
                                      <div className="images">
                                        <img src={user.image || '/images/avatar/user-image.png'} alt="images" />
                                      </div>
                                    </div>
                                  </td>
                                  <td>{user.full_name}</td>
                                  <td>
                                    <span>{user.email_address}</span><br />
                                    <span>{user.mobile_number}</span>
                                  </td>
                                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                  <td>
                                    <div className="status-wrap">
                                      <Link href="#" className="btn-status">{user.status? 'Inactive':'Active'}</Link>
                                    </div>
                                  </td>
                                  <td>
                                    <ul className="list-action">
                                      <li className="edit">
                                        <Link href={`/edit-developer/${user.id}`} className="item">
                                          <Image
                                            src={EditIcon} // Imported image object or static path
                                            alt="Edit icon"
                                            width={25}
                                            height={25}
                                          />
                                        </Link>
                                      </li>
                                      <li className="delete">
                                        <a className="remove-file item" onClick={() => openModal(user.id)} >
                                          <Image
                                              src={DeleteIcon} // Imported image object or static path
                                              alt="Delete icon"
                                              width={25}
                                              height={25}
                                            />
                                        </a>
                                      </li>
                                      <li className="delete">
                                        <a
                                          className="remove-file item"
                                          onClick={() => handleView(user.id)}
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
                          {[...Array(Math.ceil(properties.length / itemsPerPage))].map((_, index) => (
                            <li key={index}>
                              <Link
                                href="#"
                                className={`nav-item ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index + 1)}
                              >
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>:<>
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
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>No Record Found</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  }

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
