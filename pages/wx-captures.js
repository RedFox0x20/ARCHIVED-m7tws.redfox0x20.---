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
)
    .sort((ImgA, ImgB) => ImgA.default.src - ImgB.default.src)
    .reverse();

const ModeTranslation = {
    mcir: 'MCIR',
    msa: 'MSA',
    pris: 'Pristine',
};

const DirectionTranslation = {
    northbound: 'Northbound',
    southbound: 'Southbound',
};

export default function wxcaptures() {
    return (
        <div>
            <Head>
                <title>{'M7TWS | NOAA Gallery'}</title>
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
                                    const Date = ThumbnailPath.substr(0, 10)
                                        .replace('-', '/')
                                        .replace('-', '/');
                                    const Time = ThumbnailPath.substr(
                                        11,
                                        5
                                    ).replace('-', ':');
                                    const Satellite = ThumbnailPath.substr(
                                        17,
                                        7
                                    );
                                    const Degree = ThumbnailPath.substr(25, 2);
                                    const Direction =
                                        DirectionTranslation[
                                            ThumbnailPath.split('-')[9]
                                        ];
                                    const Mode =
                                        ModeTranslation[
                                            ThumbnailPath.split('-')[8]
                                        ];

                                    return (
                                        <ProjectCard
                                            altTxt=""
                                            imgSrc={`/wx-captures/${ThumbnailPath}`}
                                            key={Date + Time + Satellite + Mode}
                                        >
                                            <CardTitle>{Satellite}</CardTitle>
                                            <CardDescription>
                                                {Mode}
                                            </CardDescription>
                                            <CardDescription>
                                                {`${Date} @ ${Time} UTC`}
                                            </CardDescription>
                                            <CardDescription>
                                                {`Maximum elevation: ${Degree}° ${Direction}`}
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
