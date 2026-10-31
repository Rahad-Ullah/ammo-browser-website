import advertise from "~/assets/advertise.png";
import overlay from "~/assets/overlay2.png";

const Advertise = () => {
  return (
    <div className="pb-24">
      <div className="container">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-4 xl:gap-0 justify-between font-Poppins">
          {/* left */}
          <div className="max-w-[708px]">
            <h5 className="xl:text-6xl text-3xl lg:text-5xl heading-gradient">
              Advertising with AmmoBrowser
            </h5>
            <p className="xl:text-2xl text-base font-normal text-primaryWhite pt-5 xl:pt-10">
              We offer a variety of advertising options, including:
            </p>
            <ul className="font-light text-base xl:text-2xl list-disc text-thirdColor pt-5 pb-9 flex flex-col gap-5">
              <div className="flex">
                <li className="list-disc marker:text-3xl list-inside w-[30px] marker:leading-[22px] lg:leading-[30px] xl:leading-[37px]"></li>
                <li className="xl:leading-8 leading-5">
                  Featured listings that appear at the top of search results.
                </li>
              </div>
              <div className="flex">
                <li className="list-disc marker:text-3xl list-inside w-[30px] marker:leading-[22px] lg:leading-[30px] xl:leading-[37px]"></li>
                <li className="xl:leading-8 leading-5">
                  Banner ads displayed throughout the site. Contact us to
                  explore our packages and pricing.
                </li>
              </div>
            </ul>
            <p className="xl:text-2xl text-lg font-normal text-primaryWhite pb-2">
              How do you get started with advertising on AmmoBrowser{" "}
            </p>
            <p className="xl:text-2xl text-lg font-light text-thirdColor">
              Getting started is easy. Contact us to discuss your goals and
              budget. We'll help you choose the right package to maximize your
              visibility and reach.
            </p>
          </div>
          {/* right */}
          <div>
            <div className="xl:w-[830px] lg:w-[500px] lg:h-[400px] w-full h-[245px] sm:h-[280px] xl:h-[786px] overflow-hidden relative">
              <img
                src={advertise}
                alt="advertise"
                className="w-full h-full object-cover"
              />
              {/* overlay */}
              <img
                src={overlay}
                alt="overlay"
                className="absolute w-full bottom-0 left-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
