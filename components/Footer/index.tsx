import Link from 'next/link';
import styles from './Footer.module.scss';

const contactInfo = (
    <p>
        Atendimento remoto <br />
        Brasil e exterior
    </p>
);

// Navigation links
const navigationLinks = [
    { text: 'Início', href: '/#inicio' },
    { text: 'Sobre', href: '/#sobre' },
    { text: 'Projetos', href: '/#projetos' },
    { text: 'Contato', href: '/#contato' },
].map(({ text, href }) => (
    <Link key={text} href={href}>{text}</Link>
));

// Social links
const socialLinks = [
    { text: 'Instagram', href: 'https://www.instagram.com/nalberthweb/' },
    { text: 'LinkedIn', href: 'https://www.linkedin.com/in/matheusnalberth/' },
    { text: 'Behance', href: 'https://www.behance.net/NMDesign' },
    {
        text: 'WhatsApp',
        href: 'https://wa.me/5582991434310?text=Ol%C3%A1%2C%20Nalberth%21%20Vim%20pelo%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.',
    },
].map(({ text, href }) => (
    <Link key={text} href={href} target="_blank" rel="noopener noreferrer">{text}</Link>
));

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.col}>
                        {contactInfo}
                        <Link href='mailto:nalberthdev@gmail.com'>nalberthdev@gmail.com</Link>
                    </div>
                    <div className={styles.linksCol}>
                        {navigationLinks}
                    </div>
                </div>
                <div className={styles.border} />
                <div className={styles.copyrights}>
                    <div className={styles.col}>
                        <p>© Todos os direitos reservados — 2026</p>
                    </div>
                    <div className={styles.linksCol}>
                        {socialLinks}
                    </div>
                </div>
            </div>
            <h2 className={styles.bigText}>Nalberth Dev</h2>
        </footer>
    );
};

export default Footer;
