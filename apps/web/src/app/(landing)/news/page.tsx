"use client";

import { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";

type NewsItem = {
  id: number;
  uuid: string;
  title: string;
  createdAt: string;
  image?: string;
  content: string;
};

function NewsContent() {
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page") || 0),
    pageSize: Number(searchParams.get("size") || 10),
  });

  const getNewsData = async () => {
    try {
      const { data, count, error } = await supabase
        .from("news")
        .select("*", { count: "exact" })
        .order("id")
        .range(
          pagination.pageIndex * 10,
          pagination.pageIndex * 10 + (pagination.pageSize - 1)
        );

      if (error) {
        console.error("Supabase 에러:", error);
        throw error;
      }

      return { data, count };
    } catch (err) {
      console.error("getNewsData 에러:", err);
      throw err;
    }
  };

  const {
    data: NewsList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getNewsData(),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-1">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mb-20 flex flex-col flex-1">
      <div className="w-full text-center">
        <div className="absolute h-[600px] inset-0 bg-black bg-opacity-60 mt-32 mx-1 rounded-lg" />
        <div className="w-full h-[600px] rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4">
              보도자료
            </h1>
            <div>
              <h3 className="text-xl font-poppins font-normal text-white">
                애딥의 최신 소식과 중요한 발표를 확인하세요.
              </h3>
              <h3 className="text-xl font-poppins font-normal text-white">
                투명하고 신속한 정보 공유를 통해 더 나은 소통을 만들어갑니다.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col flex-1 p-28">
        <div className="mt-12 mb-8 grid grid-cols-3 gap-10">
          {NewsList?.data?.map((news: NewsItem) => (
            <div
              key={news.id}
              className="max-w-[500px] border border-gray-200 shadow-md rounded-2xl flex flex-col gap-4"
            >
              <div className="relative w-full h-64">
                <Image
                  src={news.image ?? "/placeholder.png"}
                  alt={String(news.id)}
                  fill
                  className="object-cover"
                />
              </div>
              <div key={news.id} className="mt-2 mb-2 flex flex-col gap-4 p-4">
                <h4 className="text-md text-[#4B5563] font-poppins font-normal">
                  {news.createdAt}
                </h4>
                <h4 className="text-2xl text-[#4B5563] font-poppins font-normal">
                  {news.title}
                </h4>
                <p className="text-md text-[#4B5563] font-poppins font-normal">
                  {news.content}
                </p>
                <button className="bg-transparent w-1/4 p-2 text-purple-500">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function News() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-xl font-medium text-gray-600">Loading...</div>
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
}
