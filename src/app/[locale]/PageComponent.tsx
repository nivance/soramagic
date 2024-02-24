'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import Link from "next/link";

const PageComponent = ({
                         locale = '',
                         indexLanguageText,
                         initVideoList = [],
                         questionText
                       }) => {
  const router = useRouter();

  const [textStr, setTextStr] = useState('');
  const {setShowGeneratingModal, setShowLoadingModal} = useCommonContext();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!textStr) {
      setVideoList(randomVideo(12));
      return;
    }
    setShowGeneratingModal(true);
    const body = {
      prompt: textStr
    };
    const response = await fetch(`/${locale}/api/generate`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    const result = await response.json();
    setShowGeneratingModal(false);
    if (result.data) {
      if (!result.data[0].revised_prompt) {
        return
      }
      const video = {
        revised_prompt: result.data[0].revised_prompt,
        url: result.data[0].url
      }

      // add storage
      const videoHistoryListStr = localStorage.getItem('videoHistoryList');
      if (!videoHistoryListStr) {
        const videoHistoryList = [];
        videoHistoryList.unshift(video);
        localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
      } else {
        const videoHistoryList = JSON.parse(videoHistoryListStr);
        // check exist
        let exist = false;
        for (let i = 0; i < videoHistoryList.length; i++) {
          const videoHistory = videoHistoryList[i];
          if (videoHistory.revised_prompt == video.revised_prompt) {
            exist = true;
            localStorage.setItem('video', JSON.stringify(video));
            router.push(`/${locale}/playground`)
            return;
          }
        }
        if (!exist) {
          videoHistoryList.unshift(video);
          // const newList = videoHistoryList.slice(0, 3);
          localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
        }
      }
      localStorage.setItem('video', JSON.stringify(video));
      router.push(`/${locale}/playground`)
    }
  }

  const [videoList, setVideoList] = useState(initVideoList);

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
  };

  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <Header locale={locale} indexLanguageText={indexLanguageText}/>      
      <div>
        <div className="block overflow-hidden bg-[#000000] bg-cover bg-center text-white"
             style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
          <div className="mx-auto w-full max-w-7xl px-5 mb-5">
            <div className="flex flex-col items-center gap-y-16 py-10 sm:gap-y-20 lg:py-20">
              <div className="max-w-3xl">
                <h1 className="m-10 text-center text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">{indexLanguageText.h1Text}</h1>
                <p className="mx-auto mb-6 text-center text-sm text-[#636262] sm:px-8 sm:text-xl md:px-24 lg:mb-8">{indexLanguageText.pDescription}</p>
              </div>
            </div>
            {/* <div>
              <div
                className={"w-[90%] mx-auto rounded-tl-[30px] rounded-tr-[30px] border-[12px] border-[#ffffff1f] object-fill"}>
                <form onSubmit={handleSubmit} className="relative shadow-lg">
                  <div
                    className="overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 rounded-tl-[20px] rounded-tr-[20px]">
                    <textarea
                      rows={8}
                      name="description"
                      id="description"
                      className="block w-full resize-none border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-lg pt-4 pl-4"
                      placeholder={indexLanguageText.placeholderText}
                      value={textStr}
                      onChange={(e) => {
                        setTextStr(e.target.value);
                      }}
                      maxLength={1000}
                    />
                  </div>
                  <div className="inset-x-px bottom-1 bg-white">
                    <div
                      className="flex justify-center items-center space-x-3 border-t border-gray-200 px-2 py-2">
                      <div className="pt-2 w-1/4">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center rounded-md bg-[#2d6ae0] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
                        >
                          {indexLanguageText.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <div className={"object-fill w-[90%] mx-auto mt-8"}>
              <div className={"mx-auto bg-black"}>
                <div className={"pb-2 border-b-2"}>
                  <h2
                    className={"text-white pt-4 text-4xl flex justify-center items-center"}>{indexLanguageText.soraVideoExample}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-4">
                  {videoList.map((file) => (
                    <div key={file.prompt}>
                      <div
                        className="rounded-xl flex justify-center items-start">
                        <video
                          src={file.videoUrl}
                          controls={true}
                          autoPlay={false}
                          playsInline={true}
                          preload={"metadata"}
                          controlsList={"nodownload"}
                          onMouseOver={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          style={{width: '90%', height: '240px'}}
                        />
                      </div>
                      <div className={"flex justify-center items-center"}>
                        <p
                          className="pointer-events-none mt-2 block text-sm font-medium text-gray-400 w-[90%] max-h-20 overflow-hidden overflow-ellipsis">{indexLanguageText.prompt}: {file.prompt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div key={"more"} className={"px-6 py-4"}>
                  <Link href={`/${locale}/videos`}
                        className={"flex justify-center items-center text-xl text-white hover:text-gray-500"}>
                    {indexLanguageText.moreExample} {'>>'}
                  </Link>
                </div>
              </div>
            </div>
            <div id="faqs" className="justify-centermx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 md:px-10 md:py-24 lg:py-32">
              <div className="mx-auto flex max-w-[550px] flex-col items-center justify-center px-6 text-center lg:max-w-[800px] lg:px-10">
                <h1 className="mx-auto text-center font-bold text-white lg: text-3xl lg:text-4xl">Frequently Asked Questions</h1>
                <p className="font-inter mt-4 max-w-[600px] px-5 text-center text-base font-light text-[#71717A] lg:max-w-[500px] lg:">Let the pain itself be great, let it be followed by the adipiscing elite to some extent, let it be pure, let the sorrow of the dead, be the bed of the great fringilla urn</p>
              </div>
              <div className="mt-10 flex w-full flex-col">
                <div className="mx-12 border border-gray-200"></div>
                <div className="relative my-3 w-full rounded-md px-12 py-8">
                  <div>
                    <h2 className="font-bold text-white text-xl">{questionText.h2_1}</h2>
                    <p className="font-inter mt-4 text-base font-light text-gray-500 whitespace-pre-line">{questionText.h2_1_p1}<Link
                    href={"https://openai.com/sora"} className={"text-blue-500"}>https://openai.com/sora</Link>.</p>
                  </div>
                  {/* <a href="" className="absolute right-5 top-9">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white"></circle>
                      <path d="M7.04688 11.9999H16.9469" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a> */}
                </div>
                <div className="mx-12 border border-gray-200"></div>
                <div className="relative my-3 w-full rounded-md px-12 py-8">
                  <div className="max-w-[700px]">
                    <h2 className="font-bold text-white text-xl">{questionText.h2_2}</h2>
                    <p className="font-inter mt-4 text-base font-light text-gray-500 whitespace-pre-line">{questionText.h2_2_p1}</p>
                  </div>
                  {/* <a href="" className="absolute right-5 top-9">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white"></circle>
                      <path d="M7.05078 12H16.9508" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 7.05005V16.95" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a> */}
                </div>
                <div className="mx-12 border border-gray-200"></div>
                <div className="relative my-3 w-full rounded-md px-12 py-8">
                  <div className="max-w-[700px]">
                    <h2 className="font-bold text-white text-xl">{questionText.h2_3}</h2>
                    <p className="font-inter mt-4 text-base font-light text-gray-500 whitespace-pre-line">{questionText.h2_3_p1}</p>
                  </div>
                  {/* <a href="" className="absolute right-5 top-9">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white"></circle>
                      <path d="M7.05078 12H16.9508" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 7.05005V16.95" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a> */}
                </div>
                <div className="mx-12 border border-gray-200"></div>
                <div className="relative my-3 w-full rounded-md px-12 py-8">
                  <div className="max-w-[700px]">
                    <h2 className="font-bold text-white text-xl">{questionText.h2_4}</h2>
                    <p className="font-inter mt-4 text-base font-light text-gray-500 whitespace-pre-line">{questionText.h2_4_p1}</p>
                  </div>
                  {/* <a href="" className="absolute right-5 top-9">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="white"></circle>
                      <path d="M7.05078 12H16.9508" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 7.05005V16.95" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </a> */}
                </div>
                <div className="mx-12 border border-gray-200"></div>
              </div>
              <p className="font-inter mx-auto mt-12 text-center text-base text-gray-500"> Can’t find the answer you’re looking for? Reach out to our <a href="" className="text-[white]">customer support team.</a>
              </p>
            </div>                         
          </div>
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
