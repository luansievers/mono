import clsx from "clsx";

type Props = {
  className?: string;
};

export function Divider({ className }: Props) {
  return (
    <div className={clsx("relative flex items-center py-5", className)}>
      <div className="flex-grow border-t border-dark-90"></div>
    </div>
  );
}
