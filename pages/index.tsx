import AboutSection from "@/components/HomePage/AboutSection";
import BookCallSection from "@/components/HomePage/BookCallSection";
import DribbleSection from "@/components/HomePage/DribbleSection";
import HeroSection from "@/components/HomePage/HeroSection";
import ProjectSection from "@/components/HomePage/ProjectSection";
import ServiceSection from "@/components/HomePage/ServiceSection";
import Head from "next/head";

export default function HomePage() {

    return (
        <>
            <Head>
                <title>Nalberth | Webdesigner & Desenvolvedor Fullstack</title>
            </Head>
            <HeroSection />
            <AboutSection />
            <ProjectSection />
            <ServiceSection />
            <DribbleSection />
            <BookCallSection />
        </>
    );
}
