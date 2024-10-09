
import Link from "next/link"

export default function Agents1() {
	return (
		<>

			<section className="flat-section flat-agents">
				<div className="container">
					<div className="box-title text-center wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Our Teams</div>
						<h4 className="mt-4">Meet Our Agents</h4>
					</div>
					<div className="row">
						<div className="box col-lg-3 col-sm-6">
							<div className="box-agent hover-img wow fadeIn" data-wow-delay=".2s" data-wow-duration="2000ms">
								<div className="box-img img-style">
									<img src="/images/agents/agent-1.jpg" alt="image-agent" />
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
						<div className="box col-lg-3 col-sm-6">
							<div className="box-agent hover-img wow fadeIn" data-wow-delay=".4s" data-wow-duration="2000ms">
								<div className="box-img img-style">
									<img src="/images/agents/agent-2.jpg" alt="image-agent" />
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
						<div className="box col-lg-3 col-sm-6">
							<div className="box-agent hover-img wow fadeIn" data-wow-delay=".6s" data-wow-duration="2000ms">
								<div className="box-img img-style">
									<img src="/images/agents/agent-3.jpg" alt="image-agent" />
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
						<div className="box col-lg-3 col-sm-6">
							<div className="box-agent hover-img wow fadeIn" data-wow-delay=".8s" data-wow-duration="2000ms">
								<div className="box-img img-style">
									<img src="/images/agents/agent-4.jpg" alt="image-agent" />
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
										<p className="mt-4 text-variant-1">Real Estate Marketer</p>
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
