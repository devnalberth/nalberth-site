import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import { gsap } from '@/libs/gsap';
import styles from './Nav.module.scss';

// Define your links and paths
const links = [
    { name: 'Início', path: '/#inicio' },
    { name: 'Sobre', path: '/#sobre' },
    { name: 'Projetos', path: '/#projetos' },
    { name: 'Contato', path: '/#contato' },
];

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigationMenuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const router = useRouter(); // Get the router instance

    const handleSectionNavigation = (
        event: React.MouseEvent<HTMLAnchorElement>,
        path: string,
    ) => {
        event.preventDefault();
        setMenuOpen(false);

        const sectionId = path.split('#')[1];
        if (!sectionId) return;

        // Secondary template routes are no longer part of the public flow.
        // If one is open, return to the landing page without invoking Next's
        // animated route transition for a hash-only navigation.
        if (router.pathname !== '/') {
            window.location.assign(`/#${sectionId}`);
            return;
        }

        window.history.pushState(null, '', `/#${sectionId}`);
        window.requestAnimationFrame(() => {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    };

    // Menu Animation
    useEffect(() => {
        const links = linksRef.current?.children;

        // Create a GSAP timeline
        const timeline = gsap.timeline();

        if (menuOpen) {
            // Open menu animation
            timeline
                .to(navigationMenuRef.current, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.8,
                    ease: 'power4.inOut',
                    autoAlpha: 1,
                })
                .fromTo(
                    links ? Array.from(links).map(link => link.firstChild) : [], // Safely handle undefined
                    { y: '-100%' }, // Start from below and invisible
                    {
                        y: '0%', // Move to original position
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'power4.inOut',
                    },
                    '-=0.3' // Start the link animation 0.5 seconds earlier
                );
        } else {
            // Close menu animation
            timeline
                .to(
                    links ? Array.from(links).map(link => link.firstChild) : [], // Safely handle undefined
                    {
                        y: '-100%', // Move up
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'power4.inOut',
                    }
                )
                .to(navigationMenuRef.current, {
                    clipPath: 'inset(0% 0% 100% 0%)', // Hide menu
                    duration: 0.8,
                    ease: 'power4.inOut',
                }, '-=0.3'); // Start the menu hiding 0.5 seconds after link animation starts
        }

        // Cleanup function to kill the timeline on unmount
        return () => {
            timeline.kill();
        };
    }, [menuOpen]);

    // Close menu on route change
    useEffect(() => {
        const handleRouteChange = () => {
            setMenuOpen(false); // Close the menu when navigating to a new page
        };

        // Listen for route changes
        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('hashChangeStart', handleRouteChange);

        // Cleanup the event listener on unmount
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('hashChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <nav className={styles.nav}>
                <Link
                    href='/#inicio'
                    className={styles.logo}
                    onClick={(event) => handleSectionNavigation(event, '/#inicio')}
                >
                    <span>Nalberth</span>
                </Link>
                <button
                    type="button"
                    className={styles.menu_Toggle}
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={menuOpen}
                >
                    <div className={styles.bar}></div>
                    <span>{menuOpen ? 'FECHAR' : 'MENU'}</span>
                </button>
                <Link
                    href='/#contato'
                    className={styles.link}
                    onClick={(event) => handleSectionNavigation(event, '/#contato')}
                >
                    <span>Contato</span>
                </Link>
            </nav>
            <div ref={navigationMenuRef} className={styles.navigationMenu}>
                <ul ref={linksRef}>
                    {links.map(({ name, path }) => (
                        <li key={name}>
                            <Link href={path} onClick={(event) => handleSectionNavigation(event, path)}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
