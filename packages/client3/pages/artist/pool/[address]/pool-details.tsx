import Image from "next/image";

import { Avatar, BodyText, Heading } from "@/components/design-system";
import { SocialMediaButton } from "@/components/design-system/button/social-media-button";
import {
  BackersList,
  DummyBackersListData,
} from "@/components/pool/backers-list";

function PoolDetail() {
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
          James K
        </BodyText>
      </div>
      <BodyText size="normal" className="mt-6 text-white">
        Tom Smith is a freelance musician from the North Chicago Area. Over the
        past 15 years, he traveled on tour, opening for several musicians and
        bands, including The Yellow Foundation and Mel Roads. Now, Joe is
        developing an innovate project, a collaborative album featuring fellow
        Northern Illinois musicians. This project, Techno Collab, will include
        his longtime friend, DJ Chaz D., as well as Library Sound, and Adam
        Zela.
      </BodyText>
      <Heading className="mt-10 text-white" level={5}>
        Project Detail
      </Heading>
      <BodyText size="normal" className="mt-6 text-white">
        Longtime friends Joe Smith and Chaz D. (DJ Chaz) left their small
        Northern Illinois town to pursue music. After moving to opposide sides
        of the country, DJ Chaz worked as a solo artist as Joe opened and
        performed on several music tours. Years later, they reunited to jam on
        their hometown stage. Within hours, they had a foundation for a new
        project: a collaborative 5-track EP calling for all other Northern
        Illinois musicians. Check out Joe’s video for an exclusive look into the
        making of Techno Collab, the next best sound from the most unique
        artists in Northern Illinois!
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

      <BackersList backersList={DummyBackersListData} className="mt-6" />
    </>
  );
}

export default PoolDetail;
