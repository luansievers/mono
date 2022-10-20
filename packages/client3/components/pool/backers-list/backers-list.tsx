import { useState } from "react";

import { Avatar, BodyText, Link } from "../../design-system";

type Props = {
  className?: string;
  backersList: {
    name: string;
    profileImageUrl: string;
  }[];
  maxItems?: number;
};

export function BackersList({ className, backersList, maxItems = 9 }: Props) {
  const [viewAllItems, setViewAllItems] = useState(false);
  const backersListToShow = viewAllItems
    ? backersList
    : backersList.slice(0, maxItems);
  return (
    <div className={className}>
      <div className="flex justify-between">
        <div className="flex">
          <BodyText size="normal" className=" text-dark-50">
            Total
          </BodyText>
          <BodyText size="normal" semiBold className="pl-2 text-light-40">
            {`${backersList.length} Backers`}
          </BodyText>
        </div>
        {backersList.length ? (
          <Link
            href=""
            className="cursor-pointer text-light-20"
            onClick={() => {
              setViewAllItems((currentVal) => !currentVal);
            }}
            useNextLink={false}
          >
            {viewAllItems ? "Show less" : "View All"}
          </Link>
        ) : null}
      </div>
      <div className={"grid grid-cols-3 gap-4"}>
        {backersListToShow.map((backer) => (
          <div className="mt-8 flex items-center break-all" key={backer.name}>
            <Avatar
              size={12}
              image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR42mNgGAWjAAj+48GUG37i92+cmFJL/hMDKLHkv1TeVYKYIgvwBQ81gommFvxHtqB0797/6BbCxMixAGzA7AcPUFyJzEcWI9sHxAQP1YIIGWPzCVUjeehbQLN8gK2wG1o+oElpSiiIqFoXUKuCoboFAP+MJG7jSOWlAAAAAElFTkSuQmCC"
            />
            <BodyText className="pl-3 text-white" size="normal">
              {backer.name}
            </BodyText>
          </div>
        ))}
      </div>
    </div>
  );
}
