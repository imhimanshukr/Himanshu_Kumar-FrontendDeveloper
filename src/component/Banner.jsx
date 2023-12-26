import banner from "../assets/banner.png";

const Banner = () => {

  return (
    <div className="flex flex-col items-center md:flex-row md:justify-around md:px-0 px-2 py-8 border-b-2 border-gray-100">
        <div>
            <h1 className="text-4xl font-bold cursive-font">Launching Dreams, <br/> Defying Gravity&apos;s Limits.</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
        <div className="banner">
            <img src={banner} alt="" width='470px' />
        </div>
    </div>
  )
}

export default Banner;