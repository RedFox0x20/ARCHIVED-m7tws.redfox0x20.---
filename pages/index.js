import Head from 'next/head';

import {
    ContentSection,
    MainSection,
    SectionContent,
    SectionDescription,
    SectionTitle,
} from '../components/sections';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
    return (
        <div>
            <Head>
                <title>{'RedFox0x20'}</title>
                <meta
                    content="RedFox0x20 | Website description"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>

            <Header />

            <MainSection>
                <ContentSection>
                    <SectionTitle>{'Section title'}</SectionTitle>
                    <SectionContent>
                        <SectionDescription>
                            {'Section Description'}
                        </SectionDescription>
                    </SectionContent>
                </ContentSection>
                <div className="divider" />
                <ContentSection>
                    <SectionTitle>{'Section two'}</SectionTitle>
                    <SectionContent>
                        <SectionDescription>
                            {'Another description'}
                        </SectionDescription>
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
