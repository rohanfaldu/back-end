
import Link from "next/link"

export default function Agents2() {
	return (
		<>

			<section className="flat-section flat-agents">
				<div className="container">
					<div className="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Our Teams</div>
						<h4 className="mt-4">Meet Our Agents</h4>
					</div>
					<div className="row wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box col-lg-4 col-sm-6">
							<div className="box-agent style-1 hover-img">
								<div className="box-img img-style">
									<img src="/images/agents/agent-lg-1.jpg" alt="image-agent" />
									<ul className="agent-social">
										<li><Link href="#" className="icon icon-facebook" /></li>
										<li><Link href="#" className="icon icon-linkedin" /></li>
										<li><Link href="#" className="icon icon-twitter" /></li>
										<li><Link href="#" className="icon icon-instagram" /></li>
									</ul>
								</div>
								<Link href="#" className="content">
									<div className="info">
										<h6 className="link">Jack Halow</h6>
										<p className="mt-4 text-variant-1">CEO &amp; Founder</p>
									</div>
									<span className="icon-phone" />
								</Link>
							</div>
						</div>
						<div className="box col-lg-4 col-sm-6">
							<div className="box-agent style-1 hover-img">
								<div className="box-img img-style">
									<img src="/images/agents/agent-lg-2.jpg" alt="image-agent" />
									<ul className="agent-social">
										<li><Link href="#" className="icon icon-facebook" /></li>
										<li><Link href="#" className="icon icon-linkedin" /></li>
										<li><Link href="#" className="icon icon-twitter" /></li>
										<li><Link href="#" className="icon icon-instagram" /></li>
									</ul>
								</div>
								<Link href="#" className="content">
									<div className="info">
										<h6 className="link">John Smith</h6>
										<p className="mt-4 text-variant-1">Property Manager</p>
									</div>
									<span className="icon-phone" />
								</Link>
							</div>
						</div>
						<div className="box col-lg-4 col-sm-6">
							<div className="box-agent style-1 hover-img">
								<div className="box-img img-style">
									<img src="/images/agents/agent-lg-3.jpg" alt="image-agent" />
									<ul className="agent-social">
										<li><Link href="#" className="icon icon-facebook" /></li>
										<li><Link href="#" className="icon icon-linkedin" /></li>
										<li><Link href="#" className="icon icon-twitter" /></li>
										<li><Link href="#" className="icon icon-instagram" /></li>
									</ul>
								</div>
								<Link href="#" className="content">
									<div className="info">
										<h6 className="link">Chris Patt</h6>
										<p className="mt-4 text-variant-1">Administrative Staff</p>
									</div>
									<span className="icon-phone" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
