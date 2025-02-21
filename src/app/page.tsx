"use client"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import { root } from "postcss";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {

    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time *1000);
    });
    gsap.ticker.lagSmoothing(0);

    const stickySection = document.querySelector(".steps");
    const stickyHeight = window.innerHeight * 7;
    const cards = document.querySelectorAll(".card");
    const countContainer = document.querySelector(".count-container");
    const totalCards = cards.length;

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyHeight}px`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        positionCards(self.progress);
      },

    });

    const getRadius = () => {
      return window.innerWidth < 900
      ? window.innerWidth * 7.5
      : window.innerWidth * 2.5;
    };

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI /2 - arcAngle / 2;

    const positionCards:any = (progress = 0) => {
      const radius = getRadius();
      const totalTravel = 1 + totalCards / 7.5;
      const adjustedProgress = (progress * totalTravel -1 ) * 0.75;

      cards.forEach((card: any, i: number) => {
        const normalizedProgress = (totalCards - 1 - i) / totalCards;
        const cardProgress = normalizedProgress + adjustedProgress;
        const angle = startAngle + arcAngle * cardProgress;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const rotation = (angle - Math.PI / 2) * 180 / Math.PI;

        gsap.set(card, {
          x: x,
          y: -y + radius,
          rotation: -rotation,
          transformOrigin: "center center",
        })
      })
    }

    positionCards(0);

    let currentCardIndex = 0;

    const options = {
      root: null,
      rootMargin: "0% 0%",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          window.scrollY;

          let cardIndex = Array.from(cards).indexOf(entry.target);

          currentCardIndex = cardIndex;

          const targetY = 150 - currentCardIndex * 150;
          gsap.to(countContainer, {
            y:targetY,
            duration:0.3,
            ease: "power1.out",
            overwrite: true,
          });
        }
      });
    }, options);

    cards.forEach((card) => {
      observer.observe(card);
    });

    window.addEventListener("resize", () => positionCards(0));
  }
  ,{scope: container})
  
  return (
    <ReactLenis root>
    <div ref={container} className="overflow-hidden">
    <section className='intro overflow-hidden ' ></section >

    <section className='steps overflow-hidden'>
        <div className='step-counter'>
        <div className="counter-title">
            <h1>Steps</h1>
        </div>
        <div className="count">
            <div className='count-container'>
                <h1>01</h1>
                <h1>02</h1>
                <h1>03</h1>
                <h1>04</h1>
                <h1>05</h1>
            </div>
        </div>
        </div>
        <div className='cards'>
          <div className="card">
            <div className="card-img">
              <img src="/assets/card-1.jpg" alt="" />
            </div>
            <div className="card-content">
              <p>
                Effortlessly import your 3D models and assets into out intuitive design tool, ensuring that projects are set up quickly.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src="/assets/card-2.jpg" alt="" />
            </div>
            <div className="card-content">
              <p>
                Effortlessly import your 3D models and assets into out intuitive design tool, ensuring that projects are set up quickly.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src="/assets/card-3.jpg" alt="" />
            </div>
            <div className="card-content">
              <p>
                Effortlessly import your 3D models and assets into out intuitive design tool, ensuring that projects are set up quickly.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-img">
              <img src="/assets/card-4.jpg" alt="" />
            </div>
            <div className="card-content">
              <p>
                Effortlessly import your 3D models and assets into out intuitive design tool, ensuring that projects are set up quickly.
              </p>
            </div>
          </div>
          <div className="card last">
            <div className="card-img">
              <img src="/assets/card-5.jpg" alt="" />
            </div>
            <div className="card-content">
              <p>
                Effortlessly import your 3D models and assets into out intuitive design tool, ensuring that projects are set up quickly.
              </p>
            </div>
          </div>

          <div className="empty overflow-hidden"></div>
          <div className="empty overflow-hidden"></div>
        </div>
    </section>

    <section className='outro overflow-hidden'>
      <p>
        Our 3D design tool is built to enhance yout creative workflow,
        <span> providing a seamless and intuitive experience </span>
        for crafting stunning
        visuals and bringing your ideas to life.
      </p>
    </section>
    
    </div>
    </ReactLenis>
  );
}
