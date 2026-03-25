import { useRef } from "react";
import "./carousel.css"
export default function BlogCarousel({ allPosts, setSelectedPost, formatDate }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-wrapper">
      
      {/* LEFT BUTTON */}
      <button className="carousel-btn left" onClick={() => scroll("left")}>
        ←
      </button>

      {/* CAROUSEL TRACK */}
      <div className="carousel-track" ref={scrollRef}>
        {allPosts.map((post, index) => (
          <article
            key={post.id}
            className={`story-card blog-story-card`}
            onClick={() => setSelectedPost(post)}
            role="button"
            tabIndex={0}
          >
            <div className="story-img short" style={{ height: "260px" }}>
              <img src={post.image} alt={post.title} />
              <div className="story-img-overlay">
                <span className="story-cat">{post.category}</span>
              </div>
            </div>

            <div className="story-body">
              <div className="story-date">
                {formatDate(post.date)}
              </div>

              <div className="story-title">{post.title}</div>

              <p className="story-excerpt">{post.excerpt}</p>

              <button
                className="story-read"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPost(post);
                }}
              >
                Read story →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* RIGHT BUTTON */}
      <button className="carousel-btn right" onClick={() => scroll("right")}>
        →
      </button>
    </div>
  );
}