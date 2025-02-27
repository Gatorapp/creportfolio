"use client";

import React, { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { MdCircle } from "react-icons/md";
import Bounded from "@/components/Bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `Techlist`.
 */
export type TechlistProps = SliceComponentProps<Content.TechlistSlice>;

/**
 * Component for "Techlist" Slices.
 */
const Techlist: FC<TechlistProps> = ({ slice }) => {

  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 5,
        },
      });


      tl.fromTo(
        ".tech-row",
        {
          x:(index)=>{
            return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600,-400)
          },
        },{
            x:(index)=>{
              return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600,400)
            },
            ease: "power1.inOut"
          })
    }, component)
    return () => ctx.revert()
  })


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Bounded as="div">
      <Heading size="xl" className="mb-8" as="h2">
        {slice.primary.heading_title}
      </Heading>
      </Bounded>
      {slice.primary.tech_name.map((tech, index) => (
        <div 
        key={index}
        className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
        aria-label={tech.tech_name || undefined}>
          {Array.from({length: 15}, (_, index) => (
            <React.Fragment key={index}>
              <span className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
              style={{color: index === 7 && tech.tech_color ? tech.tech_color : "inherit" }}
              >{tech.tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
  // Render the item
))}
    </section>
  );
};

export default Techlist;
