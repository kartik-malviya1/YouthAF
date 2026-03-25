import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GenericCarousel = ({ 
  items, 
  renderItem, 
  title, 
  label, 
  loading, 
  error,
  breakpoints = {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
}) => {
  if (loading) return <LoadingState />;
  if (error) return <div className="blog-message-box">{error}</div>;

  return (
    <section className="stories-section" style={{ paddingTop: '0' }}>
      <div className="container">
        {/* Header Section */}
        <div className="stories-header reveal visible" style={{ marginTop: '52px', marginBottom: '30px' }}>
          <div>
            {label && <span className="section-label">{label}</span>}
            <h2 className="section-title">{title}</h2>
          </div>
          <div style={{ color: 'var(--grey-light)', fontWeight: 600 }}>
            {items.length} {items.length === 1 ? 'story' : 'stories'}
          </div>
        </div>

        {/* Carousel Logic */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={breakpoints}
          className="stories-swiper"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              {renderItem(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GenericCarousel;