interface NewsCardProps {
  title: string;
  source: string;
  time: string;
  imageUrl: string;
  url: string;
  description: string;
  readTime: string;
}

const NewsCard = ({
  title,
  source,
  time,
  url,
  description,
  readTime,
}: NewsCardProps) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="glass-dark rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm mb-2 line-clamp-5">{description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{source}</span>
          <span>{time}</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
