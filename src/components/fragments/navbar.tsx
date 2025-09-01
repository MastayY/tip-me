"use client";

import { Button } from "../ui/button";
import RainbowConnectBtn from "./connect-btn";

const Navbar = () => {
  return (
    <nav className='py-6 px-8'>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
              <Button variant="noShadow" className='text-2xl font-bold'>Mastay</Button>
          </div>
          <div>
              <RainbowConnectBtn />
          </div>
      </div>
    </nav>
  )
}

export default Navbar