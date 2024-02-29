import { Metadata } from "next";
import {getVideoByNumber, randomVideos} from "~/lib/video";
import { getIndexPageText, getVideosPageText } from "i18n";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import VideoStatic from "~/components/VideoStatic";

export async function generateMetadata({
  params,
}: {
  params: { lang: string; uuid: string };
}): Promise<Metadata> {
  let description = "";

  if (params.uuid) {
    const video = await getVideoByNumber(params.uuid);
    if (video) {
      // description = video.video_description;
    }
  }
  return {
    description: `${description} | Soramagic.co`,
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/${params.lang}/video/${params.uuid}`,
    },
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function ({
  params,
}: {
  params: { locale: string; uuid: string };
}) {
  const locale = params.locale;
  const video = await getVideoByNumber(params.uuid.replace("sora-video-", ""));
  const videos = await randomVideos(4);
  const indexLanguageText = getIndexPageText(locale);
  const videosPageText = getVideosPageText(locale);
  const promptTag = (await indexLanguageText).prompt;

  return (
    <>
      <Header locale={locale} page={''} indexLanguageText={indexLanguageText}/>
      <div className="bg-black relative">
        <div className="relative w-full bg-black pb-56.75 shadow-sm">
          <video
            style={{width: '65%', height: '65%', margin: 'auto', alignItems: 'center'}}
            src={video.videoUrl} 
            controls={true} 
            preload={"metadata"} 
            loop 
            playsInline={true} 
            autoPlay={true} 
            controlsList="nodownload"></video>
        </div>
        <div className="relative h-28">
          <div className="absolute p-4 w-full shadow-md rounded-b-lg transition-all duration-300 ease-in-out z-10 px-[17.5%] mb-14">
            <p className="mb-4 text-white flex flex-row font-bold text-sm">{promptTag}: {video.prompt}</p>
            <div className="text-white font-bold text-sm flex items-center justify-between">
              <div className="flex items-center">
                <img src={video.userAvatarUrl} alt={video.username} className="rounded-full inline-block w-6 h-6 mr-1"/>{video.username}
              </div>
              <span className="mr-[35%]">{video.publishDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="isolate overflow-hidden bg-[#000000] shadow-2xl shadow-white sm:rounded-xl sm:px-12 xl:py-8">
          <h2 className="mx-auto mt-1 max-w-xl text-center text-3xl leading-8 text-white py-10">
            {(await videosPageText).relatedVideos}
          </h2>
          <VideoStatic locale={locale} promptTag={promptTag} videoList={videos}/>          
        </div>
      </div>
      <br/>
      <br/>
      <Footer
        locale={locale}
        description={(await indexLanguageText).description}
      />
    </>
  )
}
