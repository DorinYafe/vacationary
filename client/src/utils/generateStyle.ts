export function generateStyle(baseStyle: string) {
    return (className?: string) => `${baseStyle} ${!!className && className}`
};