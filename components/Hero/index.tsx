import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        >
        {/* Video Background - Dark Mode Only */}
        <div className="absolute inset-0 z-[-1]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/images/hero/bg1.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Gradient transition overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto max-w-[800px] text-center relative z-10"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Prédisez la Bourse avec l'IA
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-white/90 sm:text-lg md:text-xl">
                  Vestr.ai est une plateforme alimentée par l'intélligence artificielle qui anticipe les mouvements des marchés financiers.
                </p>

                <div className="flex items-center justify-center space-y-4 flex-row space-x-4 space-y-0">
                  <Link
                    href="/market"
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Marché
                  </Link>
            
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
     
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
     
        </div>
      </section>
    </>
  );
};

export default Hero;
