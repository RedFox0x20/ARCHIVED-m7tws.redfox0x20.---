import Head from 'next/head';

import {
    CardButton,
    CardDescription,
    CardTitle,
    ProjectCard,
} from '../components/cards';
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

function importAll(r) {
    return r.keys().map(r);
}

const ImageList = importAll(
    require.context('../public/wx-captures/', false, /\.(jpe?g)$/)
).reverse();

const ModeTranslation = {
    mcir: 'MCIR',
    msa: 'MSA',
    pris: 'Pristine',
};

export default function wxcaptures() {
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
                    <SectionTitle>
                        {'M7TWS - NOAA Satellite Gallery'}
                    </SectionTitle>
                    <SectionContent>
                        <SectionDescription>
                            {
                                'A gallery of all of my NOAA APT captures, this section is a WIP.'
                            }
                        </SectionDescription>
                        <DynamicGrid>
                            {ImageList.map((item, idx) => {
                                if (idx > 18) {
                                    return;
                                }
                                const src = item.default.src;
                                const ThumbnailPath = `${
                                    src.split('/')[6].split('.')[0]
                                }.jpg`;
                                if (ThumbnailPath.endsWith('thumb.jpg')) {
                                    const FullImagePath = ThumbnailPath.replace(
                                        '-thumb',
                                        ''
                                    );
                                    const Satellite = ThumbnailPath.substring(
                                        0,
                                        7
                                    ).toUpperCase();
                                    const DateTime =
                                        ThumbnailPath.split('-')[2];
                                    const Day = DateTime.substr(2, 2);
                                    const Month = DateTime.substr(0, 2);
                                    const Time = `${DateTime.substr(
                                        4,
                                        2
                                    )}:${DateTime.substr(6, 7)}`;
                                    const Mode =
                                        ModeTranslation[
                                            ThumbnailPath.split('-')[3]
                                        ];

                                    return (
                                        <ProjectCard
                                            altTxt=""
                                            imgSrc={`/wx-captures/${ThumbnailPath}`}
                                        >
                                            <CardTitle>{Satellite}</CardTitle>
                                            <CardDescription>
                                                {Mode}
                                            </CardDescription>
                                            <CardDescription>
                                                {`${Day}/${Month} @ ${Time} UTC`}
                                            </CardDescription>
                                            <CardButton
                                                linkTo={`/wx-captures/${FullImagePath}`}
                                            >
                                                {'View full image'}
                                            </CardButton>
                                        </ProjectCard>
                                    );
                                }
                            })}
                        </DynamicGrid>
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
