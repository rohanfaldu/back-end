
import Layout from "@/components/layout/Layout"
import Agents3 from "@/components/sections/Agents3"
import Categories2 from "@/components/sections/Categories2"
import LatestNew3 from "@/components/sections/LatestNew3"
import Location3 from "@/components/sections/Location3"
import Recommended3 from "@/components/sections/Recommended3"
import Service3 from "@/components/sections/Service3"
import Slider3 from "@/components/sections/Slider3"
import Testimonial3 from "@/components/sections/Testimonial3"
export default function Home3() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<Slider3 />
				<Location3 />
				<Recommended3 />
				<Categories2 />
				<Service3 />
				<Testimonial3 />
				<Agents3 />
				<LatestNew3 />
			</Layout>
		</>
	)
}