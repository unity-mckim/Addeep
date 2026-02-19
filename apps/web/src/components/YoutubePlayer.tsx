"use client";

export const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
