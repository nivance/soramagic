'use client'

const VideoStatic = ({locale = '', promptTag, videoList = []}) => {

    const handleMouseEnter = (event) => {
        event.target.play();
    };
    
    const handleMouseLeave = (event) => {
        event.target.pause();
    };

    return (
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-4">
            {videoList.map((video) => (
            <a key={video.number} href={`/${locale}/video/sora-video-${video.number}`} target="_self">
                <div key={video.prompt}>
                    <div className="rounded-xl flex justify-center items-start">
                        <video
                            src={video.video_url}
                            controls={true}
                            autoPlay={false}
                            playsInline={true}
                            preload={"metadata"}
                            controlsList={"nodownload"}
                            onMouseOver={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{width: '100%', height: '240px'}}
                        />
                    </div>
                    <div className={"flex justify-center items-center"}>
                        <p className="pointer-events-none mt-2 block font-medium text-gray-400 w-[100%] max-h-20 overflow-hidden overflow-ellipsis">{promptTag}: {video.prompt}</p>
                    </div>
                    <div className="mb-4 mt-4 flex flex-row items-center justify-between">
                        <div className="flex justify-start ml-2">
                            <img 
                                src={video.user_avatar_url} 
                                alt={video.username} 
                                className="rounded-full inline-block w-6 h-6 mr-1"/>
                            <p className="text-sm text-white">{video.username}</p>
                        </div>
                        <div className="flex justify-end mr-2">
                            <p className="text-sm text-white justify-end">{video.publish_date}</p>
                        </div>
                    </div>
                </div>
            </a>
            ))}
        </div>
      </section>
    );
};

export default VideoStatic