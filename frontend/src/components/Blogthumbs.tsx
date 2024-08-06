
import showLess from "../assets/showLess.svg"
import bookmark from "../assets/bookmark-plus.svg"
import more from "../assets/more.svg"

interface blogThumbTypes {
    title: string
    desc:string
    authName:string
    stats: {
        memberOnly:boolean
        claps:number
        resp:number
        date:Date
    }
}
const Blogthumbs = ({title, desc, authName, stats }:blogThumbTypes) => {
    return (
        <div className="flex-col bg-red-400 border-b-10 border-slate-200 w-full justify-center pb-5">
            <div className="w-full bg-yellow-200 py-2">
                {authName}
            </div>
            <div className="grid grid-cols-3">
                <div className="col-span-2 ">
                    <h1 className="font-extrabold text-2xl font-montserrat tracking-tight py-3">
                        {title}
                    </h1>
                    <h3 className="font-roboto text-md text-[#21212175] py-2">
                        {desc}
                    </h3>
                    <h5 className="flex justify-between">
                        <div className="flex gap-2">
                            <div>
                                {stats.memberOnly ? (<>true</>): (<>false</>)}
                            </div>
                            <div>
                                {stats.date.getDate()}
                            </div>
                            <div>
                                {stats.date.getMonth()}
                            </div>
                            <div>
                                {stats.claps}
                            </div>
                            <div>
                                {stats.resp}
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <img src={showLess} alt="show less" className="opacity-50 hover:opacity-75 size-7 cursor-pointer"/>
                            <img src={bookmark} alt="add bookmarks" className="opacity-50 hover:opacity-75 size-7 cursor-pointer"/>
                            <img src={more} alt="more options" className="opacity-50 hover:opacity-75 size-7 cursor-pointer"/>
                        </div>
                    </h5>
                </div>
                <div className=" flex col-span-1 bg-green-200 items-center justify-center">
                    <div>
                        Thumbnail  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogthumbs