import cn from 'utils/cn';

const SkeletonLine = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'animate-pulse rounded bg-slate-200 dark:bg-catppuccin-surface1',
      className
    )}
  />
);

const SkeletonPr = () => (
  <div className="flex w-full flex-col border-b border-solid bg-white p-2 first:rounded-t-lg last:rounded-b-lg last:border-none dark:bg-catppuccin-surface0">
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex w-full items-center gap-2">
          <SkeletonLine className="size-5 shrink-0 rounded-xl" />
          <SkeletonLine className="h-5 w-3/4" />
        </div>
        <div className="flex shrink-0 pl-2">
          <SkeletonLine className="h-5 w-20" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex grow flex-wrap gap-2">
          <SkeletonLine className="h-5 w-32" />
          <SkeletonLine className="h-5 w-24" />
        </div>
        <SkeletonLine className="h-5 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

export const SkeletonList = ({
  count = 1,
  titles,
}: {
  count?: number;
  titles: string[];
}) => (
  <>
    {titles.map((title) => (
      <div
        className="flex flex-col gap-2 dark:text-catppuccin-text"
        key={title}
      >
        {title}
        <div className="flex flex-col rounded-lg border border-solid shadow-md">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonPr key={i} />
          ))}
        </div>
      </div>
    ))}
  </>
);
