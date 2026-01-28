interface SocialFooterProps {
    url: string;
    children: React.ReactNode;
}
export function SocialFooter({url, children}: SocialFooterProps) {
    return <a href={url} rel="noopener noreferrer" target="_blank">{children}</a>
}