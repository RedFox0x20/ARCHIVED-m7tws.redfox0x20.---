export default function DynamicGrid({ children }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8 w-full">
            {children}
        </div>
    );
}
