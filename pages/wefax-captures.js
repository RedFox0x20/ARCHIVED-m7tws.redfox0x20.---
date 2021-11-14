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

const ImageList = importAll(
    require.context('../public/wefax-captures/', false, /\.png/)
)
    .map((obj) => {
        return `${obj.default.src.split('/').pop().split('.')[0]}.png`;
    })
    .reverse();

function WEFAX_List() {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>{'Capture'}</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {ImageList.map((Img, idx) => {
                    console.log;
                    return (
                        <tr key={idx.toString()}>
                            <td>{Img}</td>
                            <td>
                                <a
                                    className="btn"
                                    href={`/wefax-captures/${Img}`}
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
