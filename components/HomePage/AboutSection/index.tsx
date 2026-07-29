import { useEffect, useRef } from "react";
import { gsap } from "@/libs/gsap";
import styles from "./AboutSection.module.scss";
import Button from "@/components/Button";
import Tag from "@/components/Tag";

export default function AboutSection() {
    const aboutTextRef = useRef<HTMLHeadingElement | null>(null);
    const taglineRef = useRef<HTMLDivElement | null>(null);
    const btnWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const aboutText = aboutTextRef.current;
        const tagline = taglineRef.current;
        const buttonWrapper = btnWrapperRef.current;

        // Animate the aboutText (already implemented)
        if (aboutText) {
            const text = aboutText.textContent?.trim() || "";
            const hasProcessed = aboutText.querySelector(".letter");

            if (!hasProcessed) {
                aboutText.innerHTML = text
                    .split(" ")
                    .map(word =>
                        `<span class="word" style="will-change: opacity; display: inline-block;">${word.split("").map(letter => `<span class="letter" style="will-change: opacity; display: inline-block;">${letter}</span>`).join("")}</span>`
                    )
                    .join(" ") + " ";

                const letters = aboutText.querySelectorAll(".letter");
                gsap.set(letters, { opacity: 0.2 });

                gsap.timeline({
                    scrollTrigger: {
                        trigger: aboutText,
                        start: "top 90%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                }).to(letters, {
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.02,
                    ease: "power2.out",
                });
            }
        }

        // Animate tagline and button using a helper function
        const animateElement = (element: HTMLElement | null, trigger: HTMLElement | null, start: string, end: string, fromProps: gsap.TweenVars) => {
            if (element) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger,
                        start,
                        end,
                        once: true,
                    },
                }).from(element, fromProps);
            }
        };

        animateElement(tagline, tagline, "top 90%", "top 50%", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" });
        animateElement(buttonWrapper, tagline, "top 50%", "top 30%", { y: 50, opacity: 0, duration: 1, ease: "power2.out" });

    }, []);

    return (
        <section className={styles.about} id="sobre">
            <div className={styles.container}>
                <div ref={taglineRef}>
                    <Tag text="Sobre" />
                </div>
                <h2 className={styles.aboutText} ref={aboutTextRef}>
                    Webdesigner com mais de 05 anos de experiência, colaborando em 06 agências de marketing e mais de 75 projetos ao redor do mundo. Com experiência em Design Social Media e Estratégia de conteúdo. Hoje meu lado tech fala mais alto, cursando Desenvolvimento Full Stack com objetivo de dominar a programação de ponta a ponta para criar projetos únicos e personalizados com infraestrutura digital segura, escalável e projetada para converter visitantes em clientes.
                </h2>
                <div className={styles.btnSpace} ref={btnWrapperRef}>
                    <Button
                        text="Vamos conversar"
                        href="https://wa.me/5582991434310?text=Ol%C3%A1%2C%20Nalberth%21%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto."
                        targetBlank={true}
                    />
                </div>
            </div>
        </section>
    );
}
