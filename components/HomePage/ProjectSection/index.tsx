import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/libs/gsap';
import { splitText } from '@/utils/textUtils';
import styles from './ProjectSection.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

const projects = [
    {
        title: 'Baratão Pisos',
        category: ['Site institucional', 'Elementor'],
        img: '/images/projeto.webp',
        width: 1672,
        height: 941,
        href: 'https://www.behance.net/gallery/250283967/Site-Institucional-Baratao-Pisos',
    },
    {
        title: 'Wenderson Bertoldo',
        category: ['Página de captura', 'Lançamento'],
        img: '/images/projeto1.webp',
        width: 1616,
        height: 1264,
        href: 'https://www.behance.net/gallery/236108337/Pagina-de-Captura-Evento-Wenderson-Bertoldo',
    },
    {
        title: 'Red Max',
        category: ['Landing page', 'Encapsulado'],
        img: '/images/projeto2.webp',
        width: 1616,
        height: 1264,
        href: 'https://www.behance.net/gallery/235895839/Pagina-de-Vendas-Red-Max',
    },
    {
        title: 'Vision Gota',
        category: ['Landing page', 'Encapsulado'],
        img: '/images/projeto3.webp',
        width: 1616,
        height: 1264,
        href: 'https://www.behance.net/gallery/232667841/Pagina-de-Vendas-Encapsulado-Vision-Gota',
    },
    {
        title: 'Bem Brasil Supermercado',
        category: ['E-commerce', 'Shopify'],
        img: '/images/projeto4.webp',
        width: 808,
        height: 632,
        href: 'https://www.behance.net/gallery/228300601/Site-E-commerce-Bem-Brasil-Supermercado',
    },
    {
        title: 'Wenderson Bertoldo',
        category: ['Landing page', 'Lançamento'],
        img: '/images/projeto7.webp',
        width: 3232,
        height: 2528,
        href: 'https://www.behance.net/gallery/231238199/Pagina-de-Vendas-Mentoria-Wenderson-Bertoldo',
    },
    {
        title: 'SmartMus Automação',
        category: ['Landing page', 'SaaS'],
        img: '/images/projeto5.webp',
        width: 808,
        height: 632,
        href: 'https://www.behance.net/gallery/228169619/Landing-Page-SmartMus-Automacao',
    },
    {
        title: 'Segura+',
        category: ['Landing page', 'Encapsulado'],
        img: '/images/projeto6.webp',
        width: 1616,
        height: 1264,
        href: 'https://www.behance.net/gallery/231952219/Pagina-de-Vendas-Encapsulado-Segura',
    },
];

export default function ProjectSection() {
    const cardRefs = useRef<HTMLAnchorElement[]>([]);
    const headingRef = useRef<HTMLDivElement | null>(null);
    const taglineRef = useRef<HTMLDivElement | null>(null);
    const btnWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Create a timeline for the heading wrapper animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: `.${styles.projects} .${styles.heading}`,
                start: 'top 70%',
                onEnter: () => tl.play(),
            },
        });

        // Animation sequence
        if (taglineRef.current) {
            tl.from(taglineRef.current, { y: 50, opacity: 0, duration: .8 }, 0);
        }

        if (headingRef.current) {
            const headingSpans = headingRef.current.querySelectorAll('span span');
            tl.from(headingSpans, { y: "110%", duration: .6, stagger: 0.01 }, 0.4);
        }

        if (btnWrapperRef.current) {
            tl.from(btnWrapperRef.current, { y: 50, opacity: 0, duration: 0.8 }, 0.8);
        }

        // Project Card Animation
        cardRefs.current.forEach((card, i) => {
            if (i < cardRefs.current.length - 1) {
                gsap.to(card, {
                    scale: 0.8,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: cardRefs.current[i + 1],
                        start: 'top center',
                        end: 'top top',
                        scrub: 1,
                    },
                });
            }
        });

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const addToRefs = (el: HTMLAnchorElement | null) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <section className={styles.projects} id="projetos">
            {/* heading */}
            <div className={styles.heading}>
                <div ref={taglineRef}>
                    <Tag text='Criações' />
                </div>
                <div className={styles.headingWrapper}>
                    <h1 ref={headingRef}>
                        {splitText("Uma olhada nos meus projetos recentes")}
                    </h1>
                    <div ref={btnWrapperRef}>
                        <Button text="Todos os projetos" href="https://www.behance.net/NMDesign" targetBlank={true} />
                    </div>
                </div>
            </div>

            {/* projects wrapper */}
            <div className={styles.wrapper}>
                {projects.map((project) => (
                    <Link
                        key={project.href}
                        href={project.href}
                        ref={addToRefs}
                        className={styles.projectCard}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver o projeto ${project.title} no Behance`}
                    >
                        <Image
                            src={project.img}
                            width={project.width}
                            height={project.height}
                            alt={`Projeto ${project.title}`}
                        />
                        <div className={styles.projectDetails}>
                            <div
                                className={`${styles.title} ${
                                    ['/images/projeto1.webp', '/images/projeto4.webp'].includes(project.img)
                                        ? styles.darkTitle
                                        : ''
                                }`}
                            >
                                <h3>{project.title}</h3>
                            </div>
                            <div className={styles.category}>
                                {project.category.map((cat, j) => <h5 key={j}>{cat}</h5>)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
