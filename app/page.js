import Layout from "@/components/layout/Layout"
import Agents1 from "@/components/sections/Agents1"
import Benefit1 from "@/components/sections/Benefit1"
import LatestNew1 from "@/components/sections/LatestNew1"
import Location1 from "@/components/sections/Location1"
import Partner from "@/components/sections/Partner"
import Property1 from "@/components/sections/Property1"
import Recommended1 from "@/components/sections/Recommended1"
import Service1 from "@/components/sections/Service1"
import Slider1 from "@/components/sections/Slider1"
import Testimonial1 from "@/components/sections/Testimonial1"
import Login from "@/app/login/page"

export default function Home() {
	return (
		<>

			{/* <Layout headerStyle={1} footerStyle={1}> */}
				<Login />
				{/* <Slider1 />
				<Recommended1 />
				<Location1 />
				<Service1 />
				<Benefit1 />
				<Property1 />
				<Testimonial1 />
				<Agents1 />
				<LatestNew1 />
				<Partner /> */}
			{/* </Layout> */}
		</>
	)
}