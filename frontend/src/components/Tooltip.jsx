import { InformationCircleIcon } from "@heroicons/react/24/outline"

function Tooltip({ text }) {

  return (

    <div className="relative group inline-block">

      <InformationCircleIcon
        className="w-5 h-5 text-blue-500 cursor-pointer"
      />

      <div
        className="
        absolute
        left-1/2
        -translate-x-1/2
        bottom-8
        hidden
        group-hover:block
        bg-slate-900
        text-white
        text-xs
        rounded-lg
        px-3
        py-2
        whitespace-nowrap
        shadow-xl
        z-50
        "
      >

        {text}

        <div
          className="
          absolute
          left-1/2
          -translate-x-1/2
          top-full
          w-0
          h-0
          border-l-4
          border-r-4
          border-t-4
          border-transparent
          border-t-slate-900
          "
        />

      </div>

    </div>

  )

}

export default Tooltip