import Image from "next/image";
import PhysicCompon from '../components/layout/home-page/first-component'
import InfoCompon from "../components/layout/home-page/second-compon"

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-start items-center px-12 pt-8 ">
      <div className="w-full flex flex-col gap-y-12">
        <PhysicCompon/>
        <InfoCompon/>
      </div>
    </div>
  );
}
