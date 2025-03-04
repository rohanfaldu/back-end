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
import variablesList from "../../components/common/variable";

export default function MyProperty() {
  const [propertiesVisits, setPropertiesVisits] = useState([]); // Store all fetched properties
  const [filteredProperties, setFilteredProperties] = useState([]); // Store filtered properties
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [statusFilter, setStatusFilter] = useState(''); // Store selected status filter
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 5; // Number of items per page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePropertyid, setDeletePropertyid] = useState('');
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    currentPage: variablesList.currentPage,
    itemsPerPage: variablesList.itemsPerPage,
});
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
  
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

  useEffect(() => {
    

    fetchData(); // Fetch data on component mount
  }, []);

  const formattedStartDate = startDate ? `${startDate}T00:00:00.000Z` : null;
  const formattedEndDate = endDate ? `${endDate}T23:59:59.999Z` : null;

  const fetchData = async (page = 1) => {
    try {
        const requestData = {
            page,
            limit: pagination.itemsPerPage,
            startDate: formattedStartDate,
            endDate: formattedEndDate, 
        };

        const getUserInfo = await insertData('api/visit/get-visit-schedule', requestData, true); // Ensure data is passed
        setPropertiesVisits(getUserInfo.data.list); // Save all properties
        const { totalCount, totalPages, currentPage } = response.data;
        setPagination({
            ...pagination,
            totalCount,
            totalPages,
            currentPage,
          });
        setLoading(false); // Stop loading
        setError(null); // Clear errors
    } catch (err) {
      setError(err.response?.message || 'An error occurred'); // Handle error
      setLoading(false); // Stop loading
    }
  };

  const exportToExcel = async () => {
      try {
        console.log("Exporting to Excel...");
    
        if (!propertiesVisits || propertiesVisits.length === 0) {
          alert("No data to export");
          return;
        }
    
        // Ensure properties data exists
        console.log("Properties:", propertiesVisits);
    
        // Create a new workbook instance
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Property Comments");
    
        // Define columns
        worksheet.columns = [
          { header: "Title", key: "title", width: 50 },
          { header: "Agency OR Developer Name", key: "agency_developer_name", width: 20 },
          { header: "Visitor Name", key: "visitor_name", width: 20 },
          { header: "Visit Date", key: "visit_date", width: 20 },
          { header: "Visit Type", key: "visit_type", width: 20 },
        ];
    
        // Apply bold font to the header row
        worksheet.getRow(1).font = { bold: true };
    
        // Add data to worksheet
        propertiesVisits.forEach((p) => {
          worksheet.addRow({
            title: p?.property.lang_translations.en_string || "N/A",
            agency_developer_name: p?.property.users.full_name || "N/A",
            visitor_name: p?.users.full_name || "N/A",
            visit_date: p?.scheduled_date 
            ? new Date(p.scheduled_date).toLocaleString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            }) 
            : "N/A",
            visit_type: p?.visit_type || "N/A"
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
        saveAs(new Blob([buffer]), "property_visit.xlsx");
    
        console.log("Excel file exported successfully!");
      } catch (error) {
        console.error("Excel export error:", error);
        alert("Error exporting to Excel: " + error.message);
      }
    };
  
  
      const exportToPDF = () => {
      if (propertiesVisits.length === 0) {
        alert("No data to export");
        return;
      }
  
      const doc = new jsPDF();
  
      // Table data
      const tableBody = propertiesVisits.map((property) => [
        property?.property?.lang_translations?.en_string || "N/A",
        property?.property?.users?.full_name || "N/A",
        property?.users?.full_name || "N/A",
        property?.scheduled_date 
            ? new Date(property.scheduled_date).toLocaleString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            }) 
            : "N/A",
        property?.visit_type || "N/A",
    ]);
    
      // Generate table
      autoTable(doc, {
        head: [["Title", "Agency OR Developer Name", "Visitor Name", "Visit Date", "Visit Type"]],
        body: tableBody,
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 50 },
          2: { cellWidth: 20 },
          4: { cellWidth: 30 },
          4: { cellWidth: 30 },
        },
        styles: { fontSize: 10, cellPadding: 5 },
        didDrawCell: (data) => {
          if (data.column.index === 3 && propertiesVisits[data.row.index]?.users?.image) {
            const imgUrl = propertiesVisits[data.row.index].users.image;
            const x = data.cell.x + 5;
            const y = data.cell.y + 3;
            const width = 20;
            const height = 20;
            doc.addImage(imgUrl, "JPEG", x, y, width, height);
          }
        },
      });
  
      doc.save("property_visit.pdf");
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
                  <h6 className="title">Property visit Listing</h6>
                  {/* <Link className="remove-file tf-btn primary" href="/create-agency">Add Agnecy</Link> */}
                  <div style={{display: "flex", alignItems: "center"}}>
                    {/* <div>
                      <Link className="remove-file tf-btn primary" href="/create-agency" style={{marginRight: "20px"}}>Add Agency</Link>
                    </div> */}
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

                  {(propertiesVisits.length > 0)?
                    <>
                      <div className="wrap-table">
                        <div className="table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>Property Title</th>
                                <th>Agency OR Developer Name</th>
                                <th>Visitor Name</th>
                                <th>Visit Date</th>
                                <th>Visit Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {propertiesVisits.map(user => (
                                <tr key={user.id} className="file-delete">
                                  <td>{user.property.lang_translations.en_string}</td>
                                  <td>{user.property.users.full_name}</td>
                                  <td>{user.users.full_name}</td>
                                  <td>{new Date(user.scheduled_date).toLocaleString('en-US', { 
                                        year: 'numeric', 
                                        month: '2-digit', 
                                        day: '2-digit', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        second: '2-digit', 
                                        hour12: true 
                                        })}</td>
                                  <td>{user.visit_type}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <ul className="wd-navigation">
                          {[...Array(Math.ceil(propertiesVisits.length / itemsPerPage))].map((_, index) => (
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
          </LayoutAdmin>
        </>
      )}
    </>
  );
}
