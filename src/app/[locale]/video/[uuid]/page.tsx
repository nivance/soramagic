import { Metadata } from "next";
import {getVideoByNumber, randomVideo} from "~/data/openaiVideo";
import { getIndexPageText, getVideosPageText } from "i18n";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

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
  const video = getVideoByNumber(params.uuid.replace("sora-video-", ""));
  const videos = randomVideo(3);
  const indexLanguageText = getIndexPageText(locale);
  const videosPageText = getVideosPageText(locale);
  const promptTag = (await indexLanguageText).prompt;

  return (
    <>
      <Header locale={locale} page={''} indexLanguageText={indexLanguageText}/>
      <div>
        <div className="bg-[#000000] shadow-1xl sm:rounded-3xl">
          <div className="max-w-2xl xl:max-w-none xl:flex-auto border border-black shadow-lg rounded-xl md:-mx-8 xl:mx-24 xl:aspect-auto flex justify-center items-center">
            <video
              src={video.videoUrl}
              controls={true}
              autoPlay={true}
              playsInline={true}
              preload={"metadata"}
              controlsList={"nodownload"}
              muted
              loop
              style={{width: '65%'}}
            >Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex justify-center items-center md:px-48 md:py-12 lg:px-64">
            <blockquote className="text-md font-semibold leading-8 text-white sm:text-xl sm:leading-9">
              <p>{promptTag}: {video.prompt}</p>
            </blockquote>
            <figure className="relative isolate pt-6 sm:pt-12">                      
              {/* <figcaption className="mt-8 text-base flex items-center">
                <img
                  src={video.user_avatar_url}
                  alt={video.user_nickname}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="font-semibold text-white">
                  {video.user_nickname}
                </div>
              </figcaption> */}
            </figure>
          </div>
        </div>

        <div className="relative isolate overflow-hidden bg-[#000000] shadow-2xl shadow-white sm:rounded-xl sm:px-12 xl:py-8">
          <h2 className="mx-auto mt-1 max-w-xl text-center text-3xl leading-8 text-white py-10">
            {(await videosPageText).relatedVideos}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 px-6 py-14">
            {videos.map((file) => (
              <a key={file.number} href={`/${locale}/video/sora-video-${file.number}`} target="_self">
                <div key={file.prompt}>
                  <div className="rounded-xl flex justify-center items-start">
                    <video
                      src={file.videoUrl}
                      controls={true}
                      autoPlay={false}
                      playsInline={true}
                      preload={"metadata"}
                      controlsList={"nodownload"}
                      style={{width: '100%', height: '240px'}}
                    />
                  </div>
                  <div className={"flex justify-center items-center"}>
                    <p className="pointer-events-none mt-4 block text-sm font-medium text-gray-300 w-[90%] max-h-20 overflow-hidden overflow-ellipsis">{promptTag}: {file.prompt}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
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
