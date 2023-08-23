import { API } from '@/lib/api';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn('flex items-center space-x-4 lg:space-x-6', className)}
            {...props}
        >
            <Link
                href="/panel"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Chat
            </Link>
            <Link
                href={API}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                API
            </Link>
        </nav>
    );
}