import cn from 'utils/cn';

type Props = {
  src: string;
  title?: string;
  className?: string;
};

export const Avatar = ({ src, title, className }: Props) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={title}
    className={cn(
      'size-5 rounded-full border-2 border-solid border-stone-700 dark:border-catppuccin-subtext0',
      className
    )}
    src={src}
    title={title}
  />
);
