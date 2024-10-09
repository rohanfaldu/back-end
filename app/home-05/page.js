
import Layout from "@/components/layout/Layout"
import Agents5 from "@/components/sections/Agents5"
import Benefit3 from "@/components/sections/Benefit3"
import Filter from "@/components/sections/Filter"
import LatestNew5 from "@/components/sections/LatestNew5"
import Location5 from "@/components/sections/Location5"
import Property4 from "@/components/sections/Property4"
import Recommended5 from "@/components/sections/Recommended5"
import Service5 from "@/components/sections/Service5"
import Slider4 from "@/components/sections/Slider4"
import Testimonial5 from "@/components/sections/Testimonial5"
export default function Home5() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1} hcls>
				<Slider4 />
				<Filter />
				<Service5 />
				<Recommended5 />
				<Location5 />
				<Property4 />
				<Benefit3 />
				<Agents5 />
				<Testimonial5 />
				<LatestNew5 />
			</Layout>
		</>
	)
}