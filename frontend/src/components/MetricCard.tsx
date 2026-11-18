import type { FC } from "react";

interface MetricCardProps{
    title:string;
    value:number |string;
}

const MetricCard:FC<MetricCardProps>=({title,value})=>{
    return(
        <>
        <div className="bg-white rounded-2xl ring-1 ring-slate-300  p-5 shadow-sm  space-y-1">
          <span className="text-[11px] font-semibold text-slate-500">{title}</span>
          <h3 className="text-2xl font-extrabold text-slate-900">{value}</h3>
        </div>
        </>
    );
}
export default MetricCard;