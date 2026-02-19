declare module 'next/image' {
    import { FC } from 'react';
    import { ImageProps } from 'next/dist/client/image';
    const Image: FC<ImageProps>;
    export default Image;
}

declare module 'next/link' {
    import { FC, PropsWithChildren } from 'react';
    import { LinkProps } from 'next/dist/client/link';
    const Link: FC<PropsWithChildren<LinkProps & { className?: string; target?: string; rel?: string }>>;
    export default Link;
}

declare module 'next/navigation' {
    export function usePathname(): string;
    export function useRouter(): any;
    export function useParams(): any;
    export function useSearchParams(): any;
}
