/**
 * Accessible skip-to-content link. Visually hidden until focused,
 * lets keyboard users jump straight to the main content.
 */
export function SkipLink({ targetId = "main" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
