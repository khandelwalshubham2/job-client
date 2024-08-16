//import { Button } from "@/components/ui/button";
import HeroImg from "../../assets/hero.png";
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 pt-10 py-5 lg:py-0">
      <div className="flex flex-col pt-9 gap-4">
        <div className="pl-24 text-lg text-gray-400 relative before:content-[''] before:absolute before:w-20 before:h-[2px] before:bg-gray-400 before:left-0 before:top-1/2">
          One Stop Solution to Find Jobs
        </div>
        <div className="text-3xl lg:text-7xl font-bold">
          Build your best job community starting from here.
        </div>
        {/* <div className="flex gap-5">
          <Button>Find Jobs</Button>
          <Button>Post New Job</Button>
        </div> */}
      </div>
      <div className="grid row-start-1 lg:col-start-2">
        <img src={HeroImg} />
      </div>
    </div>
  );
};

export default Hero;
