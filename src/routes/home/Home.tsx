import Comments from "../../components/comments/Comments"
import Contact from "../../components/contact/Contact"
import Hero from "../../components/hero/Hero"
import Navbar from "../../components/navbar/Navbar"
import Pricing from "../../components/pricing/Pricing"
import Services from "../../components/services/Services"
import Studio from "../../components/studio/Studio"
import Watch from "../../watch/Watch"

const Home = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Watch/>
      <Pricing/>
      <Studio/>
      <Services/>
      <Comments/>
      <Contact/>
    </>
  )
}

export default Home 