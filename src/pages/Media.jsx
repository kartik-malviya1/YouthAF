import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getMedia, deleteMedia } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

export default function Media() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const mediaData = await getMedia();
        setPosts(mediaData);
        setError(null);
      } catch (err) {
        setError('Failed to load media content');
        console.error('Error loading media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
    } catch (err) {
      setError('Failed to delete media item');
      console.error('Error deleting media:', err);
    }
  };

  const blogs = posts.filter(p => p.type === "blog");
  const news = posts.filter(p => p.type === "news");

  if (loading) {
    return (
      <div className="bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading media content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900 ">

      {/* 🔥 HERO (LIGHT OVERLAY) */}
      <section className="relative h-[75vh] flex items-center px-6 overflow-hidden">

        {/* 🔥 BACKGROUND IMAGE */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6 }}
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔥 DARK GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/40" />

        {/* 🔥 RED GLOW (BRAND TOUCH) */}
        <div className="absolute inset-0 bg-linear-to-t from-red-500/10 via-transparent to-transparent" />

        {/* 🔥 CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl"
        >

          <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">
            Stories that
            <br />
            <span className="text-red-500">create impact</span>
          </h1>

          <p className="text-zinc-300 mt-6 text-lg max-w-xl">
            Discover real journeys, inspiring transformations, and the impact of grassroots entrepreneurship.
          </p>

          {/* 🔥 CTA (OPTIONAL BUT 🔥) */}
          <div className="mt-8 flex gap-4">
            <button className="bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition">
              Explore Stories
            </button>

            <button className="border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition">
              Watch Videos
            </button>
          </div>

        </motion.div>

      </section>

      {/* 🔥 BLOGS */}
      <Section title="Our Stories">
        <MasonryGrid
          posts={blogs}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onClick={setSelected}
        />
      </Section>

      {/* 🔥 NEWS */}
      <Section title="News & Updates">
        <MasonryGrid
          posts={news}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onClick={setSelected}
        />
      </Section>

      {/* 🔥 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex justify-center items-center z-50 p-6">

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6"
          >

            <img
              src={selected.image}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <h2 className="text-2xl font-bold mb-2">
              {selected.title}
            </h2>

            <p className="text-sm text-zinc-500 mb-6">
              {new Date(selected.date).toDateString()}
            </p>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selected.content }}
            />

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:scale-105 transition"
              >
                Close
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}

/* 🔥 SECTION */

function Section({ title, children }) {
  return (
    <section className="py-16 px-6 bg-zinc-50">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            {title}
          </h2>

          <span className="text-sm text-zinc-500 hover:text-red-500 cursor-pointer">
            View All →
          </span>
        </div>

        {children}

      </div>

    </section>
  );
}

/* 🔥 MASONRY GRID */

function MasonryGrid({ posts, isAdmin, onDelete, onClick }) {
  if (posts.length === 0) {
    return <p className="text-zinc-500">No content available</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

      {posts.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ scale: 1.03 }}
          onClick={() => onClick(p)}
          className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group bg-white shadow-md hover:shadow-xl transition"
        >

          <img
            src={p.image}
            className="w-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
          />

          {/* LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-80" />

          {/* CONTENT */}
          <div className="absolute bottom-0 p-4 text-white">

            <h3 className="font-semibold text-lg leading-tight">
              {p.title}
            </h3>

            <p className="text-xs mt-1 opacity-80">
              {new Date(p.date).toDateString()}
            </p>

            <div className="text-red-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition">
              Read More →
            </div>

            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(p.id);
                }}
                className="text-red-300 text-xs mt-2 block"
              >
                Delete
              </button>
            )}

          </div>

        </motion.div>
      ))}

    </div>
  );
}