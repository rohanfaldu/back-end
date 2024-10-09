
import Layout from "@/components/layout/Layout"
import Agents4 from "@/components/sections/Agents4"
import Banner from "@/components/sections/Banner"
import Benefit2 from "@/components/sections/Benefit2"
import LatestNew4 from "@/components/sections/LatestNew4"
import Location4 from "@/components/sections/Location4"
import Map from "@/components/sections/Map"
import Property3 from "@/components/sections/Property3"
import Recommended4 from "@/components/sections/Recommended4"
import Service4 from "@/components/sections/Service4"
import Testimonial4 from "@/components/sections/Testimonial4"
export default function Home4() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<Map />
				<Recommended4 />
				<Service4 />
				<Location4 />
				<Agents4 />
				<Property3 />
				<Testimonial4 />
				<Benefit2 />
				<LatestNew4 />
				<Banner />
			</Layout>
		</>
	)
}