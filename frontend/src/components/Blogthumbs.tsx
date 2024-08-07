import showLess from "../assets/showLess.svg"
import bookmark from "../assets/bookmark-plus.svg"
import more from "../assets/more.svg"
import user from "../assets/user.svg"
import zap from "../assets/zap.svg"
import resp from "../assets/resp.svg"
import heart from "../assets/heart.svg"
import Tooltip from "./Tooltip"

interface blogThumbTypes {
    title: string
    desc: string
    authName: string
    stats: {
        memberOnly: boolean
        claps: number
        resp: number
        date: Date
    }
    thumbnail: string
}
const Blogthumbs = ({ title, desc, authName, stats, thumbnail }: blogThumbTypes) => {
    return (
        <div className="flex flex-col w-full justify-center pb-5 rounded-lg ">
            <div className="flex items-center w-full py-2">
                <div className="border-black rounded-full border-[1px] mx-1">
                    <img src={user} alt="user" className="size-3.5 cursor-pointer opacity-50 hover:opacity-75 m-1" />
                </div>
                <div>
                    {authName}
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-2 ">
                    <h1 className="font-extrabold text-2xl font-montserrat tracking-tighter py-2">
                        {title}
                    </h1>
                    <h3 className="font-roboto text-md text-[#21212175] ">
                        {desc}
                    </h3>
                    <h5 className="flex justify-between border-b-2 pt-4 pb-4 items-center">
                        <div className="flex gap-2">
                            <div>
                                {stats.memberOnly ? (
                                    <>
                                        <Tooltip text="Member-only Story">
                                            <img src={zap} alt="memberOnly" className="size-6 opacity-75 hover:opacity-100 cursor-pointer" />
                                        </Tooltip>
                                    </>) : (null)}
                            </div>
                            <div>
                                {stats.date.getDate()}
                            </div>
                            <div>
                                {stats.date.getMonth()}
                            </div>
                            <div className="flex items-center">
                                <Tooltip text="Likes">
                                    <div>
                                        <img src={heart} alt="likes" className="size-5 opacity-75 hover:opacity-100 cursor-pointer" />
                                    </div>
                                </Tooltip>
                                {stats.claps}
                            </div>
                            <div className="flex items-center">
                                <Tooltip text="Responses">
                                    <div>
                                        <img src={resp} alt="responses" className="size-5 opacity-50 hover:opacity-75 cursor-pointer" />
                                    </div>
                                </Tooltip>
                                {stats.resp}
                            </div>
                        </div>
                        <div className="flex gap-5 ">
                            <Tooltip text="See less like this">
                                <img src={showLess} alt="show less" className="opacity-50 hover:opacity-75 size-7 cursor-pointer" />
                            </Tooltip>
                            <Tooltip text="Add Bookmark">
                                <img src={bookmark} alt="add bookmarks" className="opacity-50 hover:opacity-75 size-7 cursor-pointer" />
                            </Tooltip>
                            <Tooltip text="More Options">
                                <img src={more} alt="more options" className="opacity-50 hover:opacity-75 size-7 cursor-pointer" />
                            </Tooltip>
                        </div>
                    </h5>
                </div>
                <div className="flex col-span-1 items-center justify-center w-full h-full px-8 ">
                    <div className="relative w-full h-24">
                        <img src={thumbnail} alt="thumbnail" className="absolute inset-0 object-cover w-full h-full rounded-sm" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogthumbs