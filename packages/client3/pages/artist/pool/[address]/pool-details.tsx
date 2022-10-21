import Image from "next/image";

import { Avatar, BodyText, Heading } from "@/components/design-system";
import { SocialMediaButton } from "@/components/design-system/button/social-media-button";
import { BackersList } from "@/components/pool/backers-list";
import { handleAddressFormat } from "@/lib/format/common";

type Props = {
  poolImage: string;
  poolDetail: string;
  artistImage: string;
  artistName: string;
  artistDesc: string;
  twitterURL: string;
  discordURL: string;
  backers: any;
};

function PoolDetail({
  poolImage,
  poolDetail,
  artistImage,
  artistName,
  artistDesc,
  twitterURL,
  discordURL,
  backers,
}: Props) {
  const backersFmt = backers.map((backer: any) => {
    return { name: handleAddressFormat(backer.id) };
  });
  return (
    <>
      <div className="relative mt-3 h-[668px] w-full">
        <Image
          alt="Pool Image"
          src={poolImage}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="mt-8 flex items-center">
        <Avatar size={15} image={artistImage} />
        <BodyText className="pl-3 text-white" size="large" semiBold>
          {artistName}
        </BodyText>
      </div>
      <BodyText size="normal" className="mt-6 text-white">
        {artistDesc}
      </BodyText>
      <Heading className="mt-10 text-white" level={5}>
        Project Detail
      </Heading>
      <BodyText size="normal" className="mt-6 text-white">
        {poolDetail}
      </BodyText>
      <Heading className="mt-10 text-white" level={5}>
        Social Media Updates
      </Heading>
      <div className="mt-6 flex flex-col items-center rounded-lg bg-green-100">
        <BodyText className="pt-12 text-dark-50" size="medium">
          Join the community to get updates
        </BodyText>
        <div className="mt-6 mb-12 grid grid-cols-2 gap-4">
          <SocialMediaButton iconLeft="TwitterLogoOutlined" href={twitterURL}>
            Twitter
          </SocialMediaButton>
          <SocialMediaButton iconLeft="DiscordLogoOutlined" href={discordURL}>
            Discord
          </SocialMediaButton>
        </div>
      </div>

      <Heading className="mt-10 text-white" level={5}>
        Backers
      </Heading>

      <BackersList backersList={backersFmt} className="mt-6" />
    </>
  );
}

export default PoolDetail;
