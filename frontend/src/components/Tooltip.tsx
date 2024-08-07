import { ReactNode } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
    return (
        <div className="relative flex flex-col items-center group">
            {children}
            <div className="absolute bottom-2 flex-col items-center hidden mb-5 group-hover:flex">
                <span className="relative rounded-md z-10 p-4 text-xs leading-none text-white whitespace-nowrap bg-black shadow-lg ">
                    {text}
                </span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
        </div>
    );
};

export default Tooltip;
