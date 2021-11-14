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

function importAll(r) {
    return r.keys().map(r);
}

function DeconstructImageImports(Images) {
    return Images.map((item) => {
        const {src} = item.default;
        const path = `${src.split('/').pop().split('.')[0]}.png`;
        let YearFigure = path.split('_')[1];
        YearFigure = `${YearFigure.slice(0, 4)}/${YearFigure.slice(4, 6)}/${YearFigure.slice(6, 8)}`;
        let TimeFigure = path.split('_')[2];
        TimeFigure = `${TimeFigure.slice(0, 2)}:${TimeFigure.slice(2, 4)}:${TimeFigure.slice(4, 6)}`;
        const FrequencyFigure = `${path.split('_')[3]}`;
        return {
            src: src,
            Path: path,
            Date: YearFigure,
            Time: TimeFigure,
            Frequency: FrequencyFigure
        }
    })
}

const ImageList = DeconstructImageImports(importAll(
    require.context('../public/wefax-captures/', false, /(max|apt|nocorr)\.png/)
)).reverse();

function WEFAX_List() {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>{'Date @ Time'}</th>
                    <th className='hidden md:table-cell'>{'Frequency (Hz)'}</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {ImageList.map((Img, idx) => {
                    console.log;
                    return (
                        <tr key={idx.toString()}>
                            <td>{`${Img.Date} @ ${Img.Time}`}</td>
                            <td className='hidden md:table-cell'>{Img.Frequency}</td>
                            <td>
                                <a
                                    className="btn"
                                    href={`/wefax-captures/${Img.Path}`}
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

export default function WEFAX_Gallery() {
    return (
        <div>
            <Head>
                <title>{'M7TWS | WEFAX Gallery'}</title>
                <meta
                    content="M7TWS Amateur Radio | HF VHF Operations | Satellite Reception"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" type="image/icon type" />
            </Head>

            <Header />

            <MainSection>
                <ContentSection>
                    <SectionTitle>{'M7TWS - WEFAX Gallery'}</SectionTitle>
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
                                    'Captured on an IC-735 HF Transceiver with an indoor flower pot antenna using FLDigi'
                                }
                            </SectionDescription>
                        </div>
                        <WEFAX_List />
                    </SectionContent>
                </ContentSection>
            </MainSection>

            <Footer />
        </div>
    );
}
