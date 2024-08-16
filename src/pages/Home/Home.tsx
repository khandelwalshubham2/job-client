import { Separator } from "@/components/ui/separator";
import Landing from "./Landing";
import Review from "./Review";

const Home = () => {
  return (
    <div className="container">
      <Landing />
      <Separator />
      <Review />
    </div>
  );
};

export default Home;
