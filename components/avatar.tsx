import cn from 'utils/cn';

type Props = {
  src: string;
  title?: string;
  className?: string;
  shape?: 'circle' | 'rounded';
};

export const Avatar = ({ src, title, className, shape = 'circle' }: Props) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={title}
    className={cn(
      'size-5 border-2 border-solid border-stone-700 dark:border-catppuccin-subtext0',
      shape === 'circle' ? 'rounded-full' : 'rounded',
      className
    )}
    src={src}
    title={title}
  />
);
