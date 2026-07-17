function InventoryIcon({
    size = 22,
    color = "currentColor"
}) {

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="4" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="12" r="2.5" />
            <circle cx="4" cy="20" r="2.5" />
            <circle cx="12" cy="20" r="2.5" />
            <circle cx="20" cy="20" r="2.5" />
        </svg>
    );
}

export default InventoryIcon;