import Image from "next/image"

export default function Home() {
  return (
    <>
      <div className="h-[90vh] flex flex-col sm:flex-row justify-center p-4 sm:gap-x-44">
        <div className="bg-black dark:bg-white rounded-3xl">
          <Image 
            src="/images/agro.png"
            alt="Agro Point"
            width={350}
            height={350}
          />
        </div>
      </div>
    </>
  )
}
