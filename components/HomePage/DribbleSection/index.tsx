import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/libs/gsap';
import styles from './DribbleSection.module.scss';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import { splitText } from '@/utils/textUtils';

const animations = [
    { left: { x: -800, rotation: -30, y: 100 }, right: { x: 800, rotation: 30, y: 100 } },
    { left: { x: -900, rotation: -20, y: -150 }, right: { x: 900, rotation: 20, y: -150 } },
    { left: { x: -400, rotation: -35, y: -400 }, right: { x: 400, rotation: 35, y: -400 } },
];

const projectImages = [
    { src: '/images/projeto.webp', alt: 'Projeto Baratão Pisos' },
    { src: '/images/projeto1.webp', alt: 'Projeto Wenderson Bertoldo' },
    { src: '/images/projeto2.webp', alt: 'Projeto Red Max' },
    { src: '/images/projeto3.webp', alt: 'Projeto Vision Gota' },
    { src: '/images/projeto4.webp', alt: 'Projeto Bem Brasil Supermercado' },
    { src: '/images/projeto5.webp', alt: 'Projeto SmartMus Automação' },
];

export default function DribbleSection() {
    const rowsRef = useRef<HTMLDivElement[]>([]);
    const taglineRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef(null);
    const headingRef = useRef<HTMLDivElement | null>(null);
    const btnWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Images animation
            rowsRef.current.forEach((row, index) => {
                if (!row) return;

                const [leftImg, rightImg] = row.children as unknown as HTMLImageElement[]; // Safely cast children

                const triggerSettings = {
                    trigger: `.${styles.dribble}`,
                    start: 'top center',
                    end: '150% bottom',
                    scrub: true,
                };

                // Animate left image
                gsap.fromTo(leftImg, { x: 0, rotation: 0, y: 0 }, { ...animations[index]?.left, duration: 1, scrollTrigger: triggerSettings });

                // Animate right image
                gsap.fromTo(rightImg, { x: 0, rotation: 0, y: 0 }, { ...animations[index]?.right, duration: 1, scrollTrigger: triggerSettings });
            });

            // Create a timeline for the text div animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${styles.dribble} .${styles.text}`,
                    start: 'top 70%',
                    onEnter: () => tl.play(),
                },
            });

            // Animation sequence
            if (taglineRef.current) {
                tl.from(taglineRef.current, { y: 50, opacity: 0, duration: .8 }, 0);
            }

            if (imageRef.current) {
                tl.from(imageRef.current, { y: 50, opacity: 0, duration: .8 }, 0.2);
            }

            if (headingRef.current) {
                const headingSpans = headingRef.current.querySelectorAll('span span');
                tl.from(headingSpans, { y: "120%", duration: .6, stagger: 0.003 }, 0.4);
            }

            if (btnWrapperRef.current) {
                tl.from(btnWrapperRef.current, { y: 50, opacity: 0, duration: 0.8 }, 0.8);
            }
        });

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    return (
        <section className={styles.dribble}>
            {/* text */}
            <div className={styles.text}>
                <div ref={taglineRef}>
                    <Tag text='Siga no Behance' />
                </div>
                <Image
                    src='/images/behancelogo.webp'
                    alt='Behance'
                    width={1500}
                    height={1500}
                    ref={imageRef}
                />
                <h5 ref={headingRef}>
                    {splitText("Dando vida ao digital — cada projeto é pensado para unir estética e resultado em sites sob medida.")}
                </h5>
                <div className={styles.btnSpace} ref={btnWrapperRef}>
                    <Button text="Ver portfólio" href="https://www.behance.net/NMDesign" targetBlank={true} />
                </div>
            </div>

            {/* animated images */}
            <div className={styles.container}>
                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        className={styles.row}
                        ref={(el) => {
                            if (el) {
                                rowsRef.current[index] = el; // Assign the element to the ref if it is not null
                            }
                        }}
                        key={index}
                    >
                        {projectImages.slice(index * 2, index * 2 + 2).map((projectImage) => (
                            <Image
                                key={projectImage.src}
                                src={projectImage.src}
                                width={1616}
                                height={1264}
                                alt={projectImage.alt}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
