
'use client'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { use, useState, useEffect } from "react"
import CountetNumber from "@/components/elements/CountetNumber"
import DashboardChart from "@/components/elements/DashboardChart"
import DeleteFile from "@/components/elements/DeleteFile"
import LayoutAdmin from "@/components/layout/LayoutAdmin"
import Link from "next/link";
import { insertData, deletedData } from "../../components/api/Axios/Helper";
import Preloader from "@/components/elements/Preloader";
export default function Dashboard() {
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())
	const [loading, setLoading] = useState(true);
	const [dashboardData, setDashboardData] = useState([]);

	useEffect(() => {
        const fetchData = async () => {
			try {
				if(dashboardData.length === 0){
					const geDashboardInfo = await insertData('api/dashboard/list', {}, true);
					setDashboardData(geDashboardInfo);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	});

	return (
		<>
			{
				loading ? (
					<Preloader />
			  	) : (
					<>
						<DeleteFile />
						<LayoutAdmin>
							<div>
								<div className="flat-counter-v2 tf-counter">
									<div className="counter-box">
										<div className="box-icon w-68 round">
											<span className="icon icon-list-dashes" />
										</div>
										<Link href={`/user-listing`} className="item">
											<div className="content-box">
												<div className="title-count">Total Users</div>
												<div className="d-flex align-items-end">
													<h6 className="number" data-speed={2000} data-to={dashboardData?.data?.total_users} ><CountetNumber count={dashboardData?.data?.total_users} /></h6>
													{/* <span className="fw-7 text-variant-2">{dashboardData?.data?.normal_user_count}</span> */}
												</div>
											</div>
										</Link>
									</div>
									<div className="counter-box">
										<div className="box-icon w-68 round">
											<span className="icon icon-clock-countdown" />
										</div>
										<div className="content-box">
											<div className="title-count">Total Projects</div>
											<div className="d-flex align-items-end">
												<h6 className="number" data-speed={2000} data-to={dashboardData?.data?.project_count}><CountetNumber count={dashboardData?.data?.project_count} /></h6>
											</div>
										</div>
									</div>
									<div className="counter-box">
										<div className="box-icon w-68 round">
											<span className="icon icon-bookmark" />
										</div>
										<div className="content-box">
											<div className="title-count">Total Property</div>
											<div className="d-flex align-items-end">
												<h6 className="number" data-speed={2000} data-to={dashboardData?.data?.property_count}><CountetNumber count={dashboardData?.data?.property_count} /></h6>
											</div>
										</div>
									</div>
									<Link href={`/developer-listing`} className="item">
										<div className="counter-box">
											<div className="box-icon w-68 round">
												<span className="icon icon-bookmark" />
											</div>
											<div className="content-box">
												<div className="title-count">Total Active Developer</div>
												<div className="d-flex align-items-end">
													<h6 className="number" data-speed={2000} data-to={dashboardData?.data?.active_developer}><CountetNumber count={dashboardData?.data?.active_developer} /></h6>
												</div>
											</div>
										</div>
									</Link>
									<Link href={`/agency-listing`} className="item">
										<div className="counter-box">
											<div className="box-icon w-68 round">
												<span className="icon icon-bookmark" />
											</div>
											<div className="content-box">
												<div className="title-count">Total Active Agency</div>
												<div className="d-flex align-items-end">
													<h6 className="number" data-speed={2000} data-to={dashboardData?.data?.active_agency}><CountetNumber count={dashboardData?.data?.active_agency} /></h6>
												</div>
											</div>
										</div>
									</Link>
									{/* <div className="counter-box">
										<div className="box-icon w-68 round">
											<span className="icon icon-review" />
										</div>
										<div className="content-box">
											<div className="title-count">Reviews</div>
											<div className="d-flex align-items-end">
												<h6 className="number" data-speed={2000} data-to={17}><CountetNumber count={17} /></h6>
											</div>
										</div>
									</div> */}
								</div>
								<div className="wrapper-content row">
									<div className="col-xl-12">
										
										<div className="widget-box-2 wd-chart">
											<h6 className="title">Page Inside</h6>
											
											<div className="chart-box">
												<DashboardChart />
											</div>
										</div>
									</div>
								</div>
							</div>

						</LayoutAdmin >
					</>
				)
			}
		</>
	)
}	