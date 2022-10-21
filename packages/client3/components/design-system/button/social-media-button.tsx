import { LinkButton } from "./link-button";

type Props = React.ComponentProps<typeof LinkButton>;

export function SocialMediaButton(props: Props) {
  return (
    <LinkButton
      {...props}
      className="rounded-[100px] border border-light-40 bg-transparent text-light-40 hover:bg-dark-80 disabled:text-dark-80 disabled:hover:bg-transparent"
      buttonType="custom"
    />
  );
}
