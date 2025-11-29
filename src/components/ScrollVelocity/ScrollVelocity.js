import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "motion/react";
import "./ScrollVelocity.css";

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping,
  stiffness,
  numCopies,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const copyRef = useRef(null);
  const containerRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);
  const containerWidth = useElementWidth(containerRef);
  const copiesNeeded = copyWidth
    ? Math.ceil(containerWidth / copyWidth) + 400
    : numCopies ?? 1;
  const copyCount = Math.max(numCopies ?? 1, copiesNeeded);
  const totalCopyWidth = copyWidth * copyCount;

  function wrap(min, max, v) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    const loopWidth = totalCopyWidth || copyWidth;
    return `${wrap(-loopWidth, 0, v)}px`;
  });

  useEffect(() => {
    if (copyWidth) {
      const halfTrack = Math.ceil(copyCount / 2) * copyWidth;
      baseX.set(-halfTrack);
    }
  }, [baseX, copyCount, copyWidth]);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    if (copyWidth === 0) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    const adjustedVelocityFactor = Number.isFinite(velocityFactor.get())
      ? velocityFactor.get()
      : 0;

    moveBy += directionFactor.current * moveBy * adjustedVelocityFactor;
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < copyCount; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}
      </span>
    );
  }

  return (
    <div className={parallaxClassName} style={parallaxStyle} ref={containerRef}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
  appendSpace = true,
}) => {
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {appendSpace ? (
            <>{text} </>
          ) : (
            text
          )}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;