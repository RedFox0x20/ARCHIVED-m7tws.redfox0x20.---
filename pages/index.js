import Head from 'next/head';
import Link from 'next/link';

import { CardButton, CardTitle, ProjectCard } from '../components/cards';
import {
    ContentSection,
    MainSection,
    SectionContent,
    SectionDescription,
    SectionTitle,
} from '../components/sections';
import DynamicGrid from '../components/dynamicgrid';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
    return (
        <div>
            <Head>
                <title>{'M7TWS'}</title>
                <meta
                    content="M7TWS Amateur Radio | HF VHF Operations | Satellite Reception"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" type="image/icon type" />
            </Head>

            <Header />

            <MainSection>
                <ContentSection>
                    <SectionTitle>{'M7TWS'}</SectionTitle>
                    <SectionContent>
                        <SectionDescription>
                            {'UK Amateur Radio Operator'}
                            <Link href="https://qrz.com/db/M7TWS" passHref>
                                <span className="btn btn-sm btn-link">
                                    {'View on QRZ.com'}
                                </span>
                            </Link>
                        </SectionDescription>
                        <p>
                            {
                                "Hi there! I've been an amateur radio operator since the 12th of October 2020, I passed my Foundation exam via an online exam on the 7th of October 2020."
                            }
                            <br />
                            {
                                'Most of my operation takes place on the 2 Metre band however I also enjoy some HF SSB and Data.'
                            }
                        </p>
                        <div className="mt-4">
                            <p className="underline">{'Transceivers'}</p>
                            <ul className="ml-8 list-disc">
                                <li>
                                    {
                                        'TR-9000 2 Metre All Mode Transceiver (With DIY Data-mode Interface)'
                                    }
                                </li>
                                <li>
                                    {
                                        'Icom IC-735 HF All Mode Transceiver (With DIY Data-mode Interface)'
                                    }
                                </li>
                            </ul>
                            <p className="underline">
                                <br />
                                {'Antennas'}
                            </p>
                            <ul className="ml-8 list-disc">
                                <li>
                                    {
                                        'DP2-2 Commercial dipole for 2 Metres - Variable length'
                                    }
                                </li>
                                <li>
                                    {'DIY 3 Element 2 Metre Yagi-Uda built by '}
                                    <span className="link link-primary">
                                        <Link
                                            href="https://qrz.com/db/M7JRF"
                                            passHref
                                        >
                                            {'James, M7JRF'}
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                            <p className="underline">
                                <br />
                                {'Power supplies'}
                            </p>
                            <ul className="ml-8 list-disc">
                                <li>
                                    {'Jetfon PC30SWM 30 Amp 13.8V Mains PSU'}
                                </li>
                                <li>
                                    {'Nevada PS204 3-6 Amp 13.8V Mains PSU'}
                                </li>
                                <li>{'17Ah Lead Acid Battery for /P'}</li>
                            </ul>
                        </div>
                    </SectionContent>
                </ContentSection>
                <div className="divider" />
                <ContentSection>
                    <SectionTitle>{'Image Gallery'}</SectionTitle>
                    <SectionContent>
                        <SectionDescription>
                            {
                                "Here's a collection of images that I have received via NOAA APT Weather Satellites"
                            }
                        </SectionDescription>
                        <DynamicGrid>
                            <ProjectCard altTxt="" imgSrc="">
                                <CardTitle>
                                    {'NOAA Satellite Gallery'}
                                </CardTitle>
                                <CardButton linkTo="/wx-captures">
                                    {'Open NOAA Gallery'}
                                </CardButton>
                            </ProjectCard>
                            <ProjectCard altTxt="" imgSrc="">
                                <CardTitle>{'WEFAX Gallery'}</CardTitle>
                                <CardButton linkTo="/wefax-captures">
                                    {'Open WEFAX Gallery'}
                                </CardButton>
                            </ProjectCard>
                            {/* <ProjectCard imgSrc='' altTxt=''>
                                <CardTitle>SSTV image</CardTitle>
                                <CardButton href='/sstv-captures'>Open SSTV Gallery</CardButton>
                            </ProjectCard> */}
                        </DynamicGrid>
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
