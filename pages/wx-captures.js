import React, { useState } from 'react';
import Head from 'next/head';

import { CardButton, CardDescription, ProjectCard } from '../components/cards';
import {
    ContentSection,
    MainSection,
    SectionContent,
    SectionDescription,
    SectionTitle,
} from '../components/sections';
import { CollapseToggle } from '../components/collapse';
import DynamicGrid from '../components/dynamicgrid';
import Footer from '../components/footer';
import Header from '../components/header';

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
    NOAAAPT: 'Reprocessed with NOAA-APT',
};

const DirectionTranslation = {
    northbound: 'Northbound',
    southbound: 'Southbound',
};

function DeconstructImageImports(Images) {
    return Images.map((item) => {
        const { src } = item.default;
        const ThumbnailPath = `${src.split('/').pop().split('.')[0]}.jpg`;
        return {
            Thumbnail: ThumbnailPath,
            FullImage: ThumbnailPath.replace('-thumb', ''),
            Date: ThumbnailPath.substr(0, 10).split('-').reverse().join('-'),
            Time: ThumbnailPath.substr(11, 5).replace('-', ':'),
            Satellite: ThumbnailPath.substr(17, 7),
            Degree: ThumbnailPath.substr(25, 2),
            Direction:
                DirectionTranslation[ThumbnailPath.split('-')[9]] ||
                DirectionTranslation[ThumbnailPath.split('-')[10]],
            Mode:
                typeof ThumbnailPath.split('-')[11] === 'undefined'
                    ? ModeTranslation[ThumbnailPath.split('-')[8]]
                    : ModeTranslation[
                          ThumbnailPath.split('-')[8] +
                              ThumbnailPath.split('-')[9]
                      ],
        };
    });
}

function importAll(r) {
    return r.keys().map(r);
}

const ImageList = DeconstructImageImports(
    importAll(
        require.context('../public/wx-captures/', false, /-thumb\.(jpe?g)$/)
    )
)
    .sort((a, b) => {
        let ADate = new Date(a.Date);
        ADate.setMinutes(a.Time.split(':')[1]);
        ADate.setHours(a.Time.split(':')[0]);
        let BDate = new Date(b.Date);
        BDate.setMinutes(b.Time.split(':')[1]);
        BDate.setHours(b.Time.split(':')[0]);

        return ADate - BDate;
    })
    .reverse();

const ImageSections = [
    {
        title: 'NOAA 19 - Latest',
        images: ImageList.filter((img) => {
            return img.Thumbnail.includes('NOAA-19');
        }).slice(0, 9),
    },
    {
        title: 'NOAA 18 - Latest',
        images: ImageList.filter((img) => {
            return img.Thumbnail.includes('NOAA-18');
        }).slice(0, 9),
    },
    {
        title: 'NOAA 15 - Latest',
        images: ImageList.filter((img) => {
            return img.Thumbnail.includes('NOAA-15');
        }).slice(0, 9),
    },
];

function SatelliteSections() {
    return ImageSections.map((Section, section_idx) => {
        return (
            <CollapseToggle key={section_idx.toString()} title={Section.title}>
                <DynamicGrid>
                    {Section.images.map((ImageData, image_idx) => {
                        return (
                            <ProjectCard
                                altTxt=""
                                imgSrc={`/wx-captures/${ImageData.Thumbnail}`}
                                key={image_idx.toString()}
                            >
                                <CardDescription>
                                    {ImageData.Mode}
                                </CardDescription>
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
                    })}
                </DynamicGrid>
            </CollapseToggle>
        );
    });
}

function HistoryTable() {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>{'Date @ Time'}</th>
                    <th>{'Satellite'}</th>
                    <th>{'Mode'}</th>
                    <th>{'Position'}</th>
                    <th>{'Direction'}</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {ImageList.map((Img, idx) => {
                    return (
                        <tr key={idx.toString()}>
                            <td>{`${Img.Date} @ ${Img.Time}`}</td>
                            <td>{Img.Satellite}</td>
                            <td>{Img.Mode}</td>
                            <td>{`Maximum elevation: ${Img.Degree}°`}</td>
                            <td>{Img.Direction}</td>
                            <td>
                                <a
                                    className="btn"
                                    href={`/wx-captures/${Img.FullImage}`}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {'View image'}
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default function NOAA_Gallery() {
    const [listMode, setListMode] = useState('Latest');
    function setListMode_Latest() {
        setListMode('Latest');
    }
    function setListMode_History() {
        setListMode('History');
    }
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
                    <noscript>
                        <h1>
                            {
                                'JavaScript must be enabled to view this page correctly'
                            }
                        </h1>
                    </noscript>
                    <SectionContent>
                        <div className="flex">
                            <SectionDescription>
                                {
                                    'Captured on a NooElec V4 SDR with a Dipole Antenna using WxToImg Restored'
                                }
                            </SectionDescription>
                            <div className="hidden xl:tabs m-auto mr-0">
                                {listMode === 'Latest' ? (
                                    <>
                                        <a
                                            className="tab tab-active"
                                            onClick={setListMode_Latest}
                                        >
                                            {'Latest'}
                                        </a>
                                        <a
                                            className="tab"
                                            onClick={setListMode_History}
                                        >
                                            {'History'}
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a
                                            className="tab"
                                            onClick={setListMode_Latest}
                                        >
                                            {'Latest'}
                                        </a>
                                        <a
                                            className="tab tab-active"
                                            onClick={setListMode_History}
                                        >
                                            {'History'}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        {listMode === 'Latest' && <SatelliteSections />}
                        {listMode === 'History' && <HistoryTable />}
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
