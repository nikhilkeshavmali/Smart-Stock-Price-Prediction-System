import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "@/components/NewsCard";
import { Oval } from "react-loader-spinner";
import Footer from "@/components/Footer";

interface NewsItem {
  title: string;
  description: string;
  source: string;
  url: string;
  image_url: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/news/`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-[#0a0d12] text-[#e6e9ef] py-16 px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-5">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-[#12161f] text-[#c9a227] px-4 py-1.5 rounded-md border border-[#1f2530]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a227] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a227]" />
              </span>
              Breaking news
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#e6e9ef]">
            Market intelligence
          </h1>

          <p className="text-[#8b93a3] mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Real-time financial news, pulled straight from the wire.
          </p>
        </div>

        {/* News grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Oval
                color="#c9a227"
                secondaryColor="#232936"
                height={48}
                width={48}
              />
            </div>
          ) : news.length === 0 ? (
            <div className="text-center font-mono text-sm text-[#6b7686]">
              No market news available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#12161f] border border-[#1f2530] rounded-xl p-6 hover:border-[#2a3140] transition-colors"
                >
                  <NewsCard
                    title={item.title}
                    description={item.description}
                    source={item.source}
                    url={item.url}
                    image_url={item.image_url}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
