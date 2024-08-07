import srchIcon from "../assets/srchIcon.svg"
import writeIcon from "../assets/compose.svg"
import notification from "../assets/notifications.svg"
import user from "../assets/user.svg"

const Navbar = () => {
  return (
    <div className="flex w-full px-5 py-2 items-center justify-between border-b-2 border-b-gray-100">
      <div className="flex">
        <a><h1 className="text-4xl font-dmSerifDisplay font-medium tracking-tight cursor-pointer">Medium</h1></a>
        <div className="flex justify-center items-center bg-gray-50 rounded-full px-2 py-2 mx-5">
          <img src={srchIcon} alt="srchIcon" className="size-7" />
          <input type="text" placeholder="Search" className="font-montserrat bg-gray-50 text-[0.8rem] font-medium w-44 px-2 focus:outline-none pb-[5px]" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex cursor-pointer items-center hover:text-[#000] group mx-1">
          <img src={writeIcon} alt="writeIcon" className="size-6 opacity-75 group-hover:opacity-100 mx-1" />
          <h3 className="text-[#21212175] font-charter group-hover:text-[#21212195]">
            Write
          </h3>
        </div>
        <div className="mx-1">
          <img src={notification} alt="notification" className="size-6 mx-5 cursor-pointer opacity-75 hover:opacity-100" />
        </div>
        <div className="border-black rounded-full border-[1px] mx-1">
          <img src={user} alt="user" className="size-6 cursor-pointer opacity-50 hover:opacity-75 m-1" />
        </div>
      </div>
    </div>
  )
}

export default Navbar