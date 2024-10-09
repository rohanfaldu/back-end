
import Link from "next/link"

export default function Agents3() {
	return (
		<>

			<section className="flat-section flat-agents-v2 bg-surface">
				<div className="container">
					<div className="box-title wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
						<div className="text-subtitle text-primary">Our Teams</div>
						<h4 className="mt-4">Meet Our Agents</h4>
					</div>
					<div className="grid-2 gap-30 wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
						<div className="box-agent style-2 hover-img">
							<div className="box-img img-style">
								<img src="/images/agents/agent-sm-1.jpg" alt="image-agent" />
								<ul className="agent-social">
									<li><Link href="#" className="icon icon-facebook" /></li>
									<li><Link href="#" className="icon icon-linkedin" /></li>
									<li><Link href="#" className="icon icon-twitter" /></li>
									<li><Link href="#" className="icon icon-instagram" /></li>
								</ul>
							</div>
							<div className="content">
								<h6><Link href="#" className="link" />Jack Halow</h6>
								<p className="mt-4 text-variant-1">CEO &amp; Founder</p>
								<ul className="list-info">
									<li><span className="icon icon-phone2" />1-333-345-6868</li>
									<li><span className="icon icon-mail" />hi.avitex@gmail.com</li>
									<li><span className="icon icon-mapPinLine" />101 E 129th St, East Chicago, IN
										46312, US</li>
								</ul>
								<Link href="#" className="tf-btn size-1">Contact Agent</Link>
							</div>
						</div>
						<div className="box-agent style-2 hover-img">
							<div className="box-img img-style">
								<img src="/images/agents/agent-sm-2.jpg" alt="image-agent" />
								<ul className="agent-social">
									<li><Link href="#" className="icon icon-facebook" /></li>
									<li><Link href="#" className="icon icon-linkedin" /></li>
									<li><Link href="#" className="icon icon-twitter" /></li>
									<li><Link href="#" className="icon icon-instagram" /></li>
								</ul>
							</div>
							<div className="content">
								<h6><Link href="#" className="link" />John Smith</h6>
								<p className="mt-4 text-variant-1">Property Manager</p>
								<ul className="list-info">
									<li><span className="icon icon-phone2" />1-333-345-6868</li>
									<li><span className="icon icon-mail" />hi.avitex@gmail.com</li>
									<li><span className="icon icon-mapPinLine" />101 E 129th St, East Chicago, IN
										46312, US</li>
								</ul>
								<Link href="#" className="tf-btn size-1">Contact Agent</Link>
							</div>
						</div>
						<div className="box-agent style-2 hover-img">
							<div className="box-img img-style">
								<img src="/images/agents/agent-sm-3.jpg" alt="image-agent" />
								<ul className="agent-social">
									<li><Link href="#" className="icon icon-facebook" /></li>
									<li><Link href="#" className="icon icon-linkedin" /></li>
									<li><Link href="#" className="icon icon-twitter" /></li>
									<li><Link href="#" className="icon icon-instagram" /></li>
								</ul>
							</div>
							<div className="content">
								<h6><Link href="#" className="link" />Chris Patt</h6>
								<p className="mt-4 text-variant-1">Administrative Staff</p>
								<ul className="list-info">
									<li><span className="icon icon-phone2" />1-333-345-6868</li>
									<li><span className="icon icon-mail" />hi.avitex@gmail.com</li>
									<li><span className="icon icon-mapPinLine" />101 E 129th St, East Chicago, IN
										46312, US</li>
								</ul>
								<Link href="#" className="tf-btn">Contact Agent</Link>
							</div>
						</div>
						<div className="box-agent style-2 hover-img">
							<div className="box-img img-style">
								<img src="/images/agents/agent-sm-4.jpg" alt="image-agent" />
								<ul className="agent-social">
									<li><Link href="#" className="icon icon-facebook" /></li>
									<li><Link href="#" className="icon icon-linkedin" /></li>
									<li><Link href="#" className="icon icon-twitter" /></li>
									<li><Link href="#" className="icon icon-instagram" /></li>
								</ul>
							</div>
							<div className="content">
								<h6><Link href="#" className="link" />Jack Halow</h6>
								<p className="mt-4 text-variant-1">Real Estate Marketer</p>
								<ul className="list-info">
									<li><span className="icon icon-phone2" />1-333-345-6868</li>
									<li><span className="icon icon-mail" />hi.avitex@gmail.com</li>
									<li><span className="icon icon-mapPinLine" />101 E 129th St, East Chicago, IN
										46312, US</li>
								</ul>
								<Link href="#" className="tf-btn size-1">Contact Agent</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
