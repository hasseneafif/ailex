import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center mx-auto">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-xoireqe text-black dark:text-black sm:text-2xl lg:text-xl xl:text-xl">
          {title}
        </h3>
        <p className="pr-[10px] font-ubunto font-medium leading-relaxed text-black">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
