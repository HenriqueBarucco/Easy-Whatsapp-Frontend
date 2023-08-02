'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

const ScrollArea = React.forwardRef(
    ({ className, children, scrollToEnd, ...props }: any, forwardedRef) => {
        const viewportRef = React.useRef(null);
        const [shouldScrollToEnd, setShouldScrollToEnd] = React.useState(scrollToEnd);
  
        React.useEffect(() => {
            if (shouldScrollToEnd) {
                scrollToBottom();
            }
        }, [shouldScrollToEnd]);
  
        const scrollToBottom = () => {
            const viewport = viewportRef.current as any;
            if (!viewport) return;
            viewport.scrollTop = viewport.scrollHeight;
        };
  
        React.useImperativeHandle(forwardedRef, () => ({
            scrollToEnd: scrollToBottom,
        }));
  
        React.useEffect(() => {
            setShouldScrollToEnd(scrollToEnd);
        }, [children, scrollToEnd]);
  
        return (
            <ScrollAreaPrimitive.Root
                className={cn('relative overflow-hidden', className)}
                {...props}
            >
                <ScrollAreaPrimitive.Viewport
                    ref={viewportRef}
                    className="h-full w-full rounded-[inherit]"
                    onScroll={() => {
                        if (
                            viewportRef.current.scrollTop + viewportRef.current.clientHeight <
                            viewportRef.current.scrollHeight
                        ) {
                            setShouldScrollToEnd(false);
                        }
                    }}
                >
                    {children}
                </ScrollAreaPrimitive.Viewport>
                <ScrollBar />
                <ScrollAreaPrimitive.Corner />
            </ScrollAreaPrimitive.Root>
        );
    }
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            'flex touch-none select-none transition-colors',
            orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
            orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-[1px]',
            className
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
