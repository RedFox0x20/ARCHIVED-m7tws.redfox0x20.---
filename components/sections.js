import React from 'react';

export function MainSection({ children }) {
    return (
        <main className="m-auto md:w-11/12 p-0 sm:p-4 md:p-6 xl:p-8 text-center">
            {children}
        </main>
    );
}

export function ContentSection({ children }) {
    return (
        <section className="w-full md:w-5/6 m-auto p-2 text-left">
            {children}
        </section>
    );
}

export function SectionTitle({ children }) {
    return (
        <h1 className="text-xl md:text-5xl text-left underline mb-5 sm:mb-0">
            {children}
        </h1>
    );
}

export function SectionDescription({ children }) {
    return <p className="text-lg md:text-2xl mb-5">{children}</p>;
}

export function SectionContent({ children }) {
    return <div className="sm:m-8">{children}</div>;
}
