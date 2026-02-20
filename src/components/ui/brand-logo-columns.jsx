import { motion } from "framer-motion";
import React from "react";

export const BrandColumn = ({ logos, duration = 15, className }) => {
  if (!logos || logos.length === 0) return null;
console.log(className);

  const baseDuration = duration * 1.5;

  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: baseDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 gap-x-80 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {logos.map((logo, i) => (
                <div
                  key={i + index * logos.length}
                  className="flex justify-center"
                >
                  <img
                    src={logo}
                    alt={`Brand Logo ${i + 1}`}
                    className="h-16 md:h-20 object-contain"
                  />
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
