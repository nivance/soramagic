'use client'
import HeadInfo from "~/components/HeadInfo";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
// import {allVideoList} from "~/data/openaiVideo";

const PageComponent = ({
                         locale = '',
                         videosLanguageText,
                         indexLanguageText,
                         initVideoList = []
                       }) => {

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
  };

  return (
    <>
      <HeadInfo
        title={videosLanguageText.title}
        description={videosLanguageText.description}
        locale={locale}
        page={"/videos"}
      />
      <Header locale={locale} page={"videos"} indexLanguageText={indexLanguageText}/>

      <div className={"mb-8"}>
        <h2
          className={"text-white pt-4 text-4xl flex justify-center items-center"}>{indexLanguageText.soraVideoExample}</h2>
      </div>

      <div className={"w-[90%] mx-auto mb-20"}>
        <div role="list" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {initVideoList.map((video) => (
            <a key={video.number} href={`/${locale}/video/sora-video-${video.number}`} target="_self">
              <div key={video.prompt}>
                <div
                  className="rounded-xl flex justify-center items-start">
                  <video
                    src={video.video_url}
                    controls={true}
                    autoPlay={false}
                    playsInline={true}
                    preload={"metadata"}
                    controlsList={"nodownload"}
                    style={{width: '90%', height: '240px'}}
                    onMouseOver={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
                <div className="mb-4 mt-4 flex flex-row items-center">
                  <img src={video.user_avatar_url} alt={video.username} className="w-8 h-8 rounded-full mr-2"/>
                  <p className="text-sm text-white">{video.username}</p>
                </div>
                <div className={"flex justify-center items-center"}>
                  <p
                    className="pointer-events-none mt-2 block text-sm font-medium text-white w-[90%]">{indexLanguageText.prompt}: {video.prompt}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer
        locale={locale}
        description={indexLanguageText.description}
      />
    </>
  )
}
export default PageComponent
