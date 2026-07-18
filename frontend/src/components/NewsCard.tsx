interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  url: string;
  image_url: string;
}

const NewsCard = ({
  title,
  description,
  source,
  url,
  image_url,
}: NewsCardProps) => {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      <p className="text-sm text-muted-foreground mb-2">
        {description?.slice(0, 100)}...
      </p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-muted-foreground">{source}</span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
