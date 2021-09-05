import Head from 'next/head';

import { CardButton, CardDescription, ProjectCard } from '../components/cards';
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
import { CollapseToggle } from '../components/collapse';

const ModeTranslation = {
    mcir: 'MCIR',
    mcirprecip: 'MCIR Precipitation',
    msa: 'MSA',
    msaprecip: 'MSA Precipitation',
    pris: 'Pristine',
    norm: 'Normal',
    contrast: 'Contrast',
    contrasta: 'Contrast A',
    contrastb: 'Contrast B',
    no: 'NO',
    hvct: 'HVCT',
};

const DirectionTranslation = {
    northbound: 'Northbound',
    southbound: 'Southbound',
};

function importAll(r) {
    return r.keys().map(r);
}

const ImageList = importAll(
    require.context('../public/wx-captures/', false, /-thumb\.(jpe?g)$/)
)
    .sort((ImgA, ImgB) => ImgA.default.src - ImgB.default.src)
    .reverse();

function DeconstructImageImports(Images) {
    return Images.map((item) => {
        const src = item.default.src;
        const ThumbnailPath = `${src.split('/')[6].split('.')[0]}.jpg`;
        return {
            Thumbnail: ThumbnailPath,
            FullImage: ThumbnailPath.replace('-thumb', ''),
            Date: ThumbnailPath.substr(0, 10)
                .replace('-', '/')
                .replace('-', '/'),
            Time: ThumbnailPath.substr(11, 5).replace('-', ':'),
            Satellite: ThumbnailPath.substr(17, 7),
            Degree: ThumbnailPath.substr(25, 2),
            Direction:
                DirectionTranslation[ThumbnailPath.split('-')[9]] ||
                DirectionTranslation[ThumbnailPath.split('-')[10]],
            Mode:
                ThumbnailPath.split('-')[11] === undefined
                    ? ModeTranslation[ThumbnailPath.split('-')[8]]
                    : ModeTranslation[
                          ThumbnailPath.split('-')[8] +
                              ThumbnailPath.split('-')[9]
                      ],
        };
    });
}

function ImageCard({ ImageData, children }) {
    return (
        <ProjectCard altTxt="" imgSrc={`/wx-captures/${ImageData.Thumbnail}`}>
            <CardDescription>{ImageData.Mode}</CardDescription>
            <CardDescription>
                {`${ImageData.Date} @ ${ImageData.Time} UTC`}
            </CardDescription>
            <CardDescription>
                {`Maximum elevation: ${ImageData.Degree}° ${ImageData.Direction}`}
            </CardDescription>
            <CardButton
                linkTo={`/wx-captures/${ImageData.FullImage}`}
                target="_blank"
            >
                {'View full image'}
            </CardButton>
        </ProjectCard>
    );
}

const NOAA19_Images = DeconstructImageImports(
    ImageList.filter((obj) => {
        return obj.default.src.includes('NOAA-19');
    })
).slice(0, 9);
const NOAA18_Images = DeconstructImageImports(
    ImageList.filter((obj) => {
        return obj.default.src.includes('NOAA-18');
    })
).slice(0, 9);
const NOAA15_Images = DeconstructImageImports(
    ImageList.filter((obj) => {
        return obj.default.src.includes('NOAA-15');
    })
).slice(0, 9);

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
                        <CollapseToggle title="NOAA-19 - Latest">
                            <DynamicGrid>
                                {NOAA19_Images.map((img) => {
                                    return <ImageCard ImageData={img} />;
                                })}
                            </DynamicGrid>
                        </CollapseToggle>
                        <CollapseToggle title="NOAA-18 - Latest">
                            <DynamicGrid>
                                {NOAA18_Images.map((img) => {
                                    return <ImageCard ImageData={img} />;
                                })}
                            </DynamicGrid>
                        </CollapseToggle>
                        <CollapseToggle title="NOAA-15 - Latest">
                            <DynamicGrid>
                                {NOAA15_Images.map((img) => {
                                    return <ImageCard ImageData={img} />;
                                })}
                            </DynamicGrid>
                        </CollapseToggle>
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
