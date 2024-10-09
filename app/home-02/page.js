
import Layout from "@/components/layout/Layout"
import Agents2 from "@/components/sections/Agents2"
import Categories1 from "@/components/sections/Categories1"
import LatestNew2 from "@/components/sections/LatestNew2"
import Location2 from "@/components/sections/Location2"
import Property2 from "@/components/sections/Property2"
import Recommended2 from "@/components/sections/Recommended2"
import Service2 from "@/components/sections/Service2"
import Slider2 from "@/components/sections/Slider2"
import Testimonial2 from "@/components/sections/Testimonial2"
export default function Home2() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<Slider2 />
				<Categories1 />
				<Recommended2 />
				<Service2 />
				<Location2 />
				<Property2 />
				<Agents2 />
				<Testimonial2 />
				<LatestNew2 />
			</Layout>
		</>
	)
}