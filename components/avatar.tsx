type Props = {
  src: string;
  title?: string;
};

export function Avatar({ src, title }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={title}
      className="size-5 rounded-xl border-2 border-solid border-stone-700 dark:border-catppuccin-subtext0"
      src={src}
      title={title}
    />
  );
}
