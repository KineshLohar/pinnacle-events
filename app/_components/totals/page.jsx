'use client'
import CountUp from "react-countup";

const totals = [
  {
    id: 1,
    name: "Events Completed",
    value: 10,
  },
  {
    id: 2,
    name: "Years Of Experience",
    value: 11,
  },
  {
    id: 3,
    name: "Happy Clients",
    value: 12,
  },

  {
    id: 4,
    name: "Trusted Vendors",
    value: 13,
  },
];

export default function Totals() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center justify-evenly py-12 px-8 md:mb-20">
      {totals.map((total) => {
        return (
          <div
            key={total.id}
            className=" p-6 min-h-40  flex flex-col justify-center items-center text-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transition-all ease-linear duration-200 hover:scale-105"
          >
            <CountUp start={0} end={total.value} enableScrollSpy={true} suffix="+" duration={3}>
              {({ countUpRef }) => (
                <h5 ref={countUpRef} className=" mb-2 text-5xl font-bold tracking-tight text-gray-900 font-serif">
                </h5>
              )}
            </CountUp>
            <p className="font-bold text-gray-700 text-xl ">{total.name}</p>
          </div>

          // <div key={total.id}>
          //     <div className="">
          //         <div className="">
          //             {total.value}
          //         </div>
          //         <div className="">
          //             {total.name}
          //         </div>
          //     </div>
          // </div>
        );
      })}
    </div>
  );
}
