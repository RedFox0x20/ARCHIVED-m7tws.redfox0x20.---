export function CollapseToggle({ title, children }) {
    return (
        <div className="collapse border rounded-box border-base-300 collapse-arrow mb-6">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content text-left">{children}</div>
        </div>
    );
}

export function CollapseFocus({ title, children }) {
    return (
        <div
            className="collapse border rounded-box border-base-300 collapse-arrow mb-6"
            tabIndex="0"
        >
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content">{children}</div>
        </div>
    );
}

export function CollapseAlwaysOpen({ title, children }) {
    return (
        <div
            className="collapse border rounded-box border-base-300 collapse-open mb-6"
            tabIndex="0"
        >
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content">{children}</div>
        </div>
    );
}
