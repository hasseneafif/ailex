const Certifs = () => {
  return (
    <section className="py-8 md:py-16" style={{ background: 'rgb(242,242,242)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl px-4 py-8 flex flex-col items-center relative bg-transparent shadow-none">
            <div className="flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-12 lg:gap-24 w-full">
              <img
                src="/images/certif/board.svg"
                alt="Board Certification"
                className="h-8 sm:h-8 md:h-8 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-none mx-auto skill-pop"
              />
              <img
                src="/images/certif/ibm.svg"
                alt="IBM Certification"
                className="h-8 sm:h-8 md:h-12 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[200px] mx-auto skill-pop"
              />
              <img
                src="/images/certif/intel.svg"
                alt="Intel Certification"
                className="h-8 sm:h-8 md:h-12 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-none mx-auto skill-pop"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifs;
