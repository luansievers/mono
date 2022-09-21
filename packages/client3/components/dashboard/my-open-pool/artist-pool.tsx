import { BodyText, Button } from "../../design-system";

type Props = {
  isVerified: boolean;
  onButtonClick: () => void;
};

export function ArtistPool({ isVerified, onButtonClick }: Props) {
  return (
    <div className="grid place-items-center rounded-lg bg-green-100 pt-14 pb-12">
      <BodyText size="normal" className="text-dark-50">
        {isVerified
          ? "You haven’t created your pool yet, create your first pool"
          : "To create the first pool, you need to verify Identity"}
      </BodyText>
      <Button className="mt-4" buttonType="secondary" onClick={onButtonClick}>
        {isVerified ? "Create Pool" : "Verify Identity"}
      </Button>
    </div>
  );
}
