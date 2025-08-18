import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28 bg-white" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">Features</h2>
      <div className="container">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Features);
