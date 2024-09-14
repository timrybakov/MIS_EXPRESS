import Advantages from '@/components/Advantages'
import ListItems from '@/components/ListItems'
import Partners from '@/components/Partners'
import Slider from '@/components/Slider'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HimNN",
  description: "Generated by create next app",
};


const Home = () => {
  return (

    <div className="main-page">
      <Slider />
        <Advantages />
        <ListItems />
        <Partners />
    </div>);
}

export default Home