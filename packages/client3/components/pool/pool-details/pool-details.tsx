import Image from "next/image";

import {
  Avatar,
  BodyText,
  Heading,
  Link,
  Tooltip,
} from "@/components/design-system";
import { SocialMediaButton } from "@/components/design-system/button/social-media-button";
import { BackersList } from "@/components/pool/backers-list";
import { Pool } from "@/lib/graphql/generated";

type Props = {
  poolData: Partial<Pool>;
  backerList?: {
    name: string;
    profileImageUrl: string;
  }[];
};

const ToolTipInformation = () => (
  <div className="max-w-xs">
    <div className="mb-4 text-xl font-bold text-dark-80">
      How can I support in artist development (joining the team or network)?
    </div>
    <div>
      If you want to contribute your skills or talen in support of the artist,
      please click&nbsp;
      <Link href={"https://forms.gle/zEt5ENjzdpUvaMfg6"}>here</Link>
    </div>
  </div>
);

export function PoolDetail({ poolData, backerList }: Props) {
  return (
    <>
      <div className="relative mt-3 h-[668px] w-full">
        <Image
          alt="Mountains"
          src="/images/free-artists-bg.png"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="mt-8 flex items-center">
        <Avatar
          size={15}
          image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAdUlEQVR42mNgGAWjAAj+48GUG37i92+cmFJL/hMDKLHkv1TeVYKYIgvwBQ81gommFvxHtqB0797/6BbCxMixAGzA7AcPUFyJzEcWI9sHxAQP1YIIGWPzCVUjeehbQLN8gK2wG1o+oElpSiiIqFoXUKuCoboFAP+MJG7jSOWlAAAAAElFTkSuQmCC"
        />
        <BodyText className="pl-3 text-white" size="large" semiBold>
          {poolData?.userName}
        </BodyText>
      </div>
      {/* <BodyText size="normal" className="mt-6 text-white">
        [DUMMY DETAILS:] Tom Smith is a freelance musician from the North
        Chicago Area. Over the past 15 years, he traveled on tour, opening for
        several musicians and bands, including The Yellow Foundation and Mel
        Roads. Now, Joe is developing an innovate project, a collaborative album
        featuring fellow Northern Illinois musicians. This project, Techno
        Collab, will include his longtime friend, DJ Chaz D., as well as Library
        Sound, and Adam Zela.
      </BodyText> */}
      <Tooltip placement="bottom-start" content={<ToolTipInformation />}>
        <button>
          <Heading className="mt-10 text-white" level={5}>
            Project Detail
          </Heading>
        </button>
      </Tooltip>

      <BodyText size="normal" className="mt-6 text-white">
        {poolData?.projectDetail}
      </BodyText>
      <Heading className="mt-10 text-white" level={5}>
        Social Media Updates
      </Heading>
      <div className="mt-6 flex flex-col items-center rounded-lg bg-green-100">
        <BodyText className="pt-12 text-dark-50" size="medium">
          Join the community to get updates
        </BodyText>
        <div className="mt-6 mb-12 grid grid-cols-2 gap-4">
          <SocialMediaButton iconLeft="TwitterLogoOutlined">
            Twitter
          </SocialMediaButton>
          <SocialMediaButton iconLeft="DiscordLogoOutlined">
            Discord
          </SocialMediaButton>
        </div>
      </div>

      <Heading className="mt-10 text-white" level={5}>
        Backers
      </Heading>

      <BackersList backersList={backerList ?? []} className="mt-6" />
    </>
  );
}
