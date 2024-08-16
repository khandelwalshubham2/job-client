import reviewProfile1 from "../../assets/reviewProfile1.png";
import reviewStar from "../../assets/reviewStar.png";
import Slider from "react-slick";
const Review = () => {
  var settings = {
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="home-bg">
      <div className="container py-8">
        <p className="heading-2 text-center">Client's Feedback</p>
        <p className="description-1 text-center">What Our client says</p>
        <div className="slider-container mt-5">
          <Slider {...settings}>
            {[1, 2, 3].map((number) => (
              <div
                key={number}
                className="review-content-box border border-gray-300 shadow-md p-2"
              >
                <div className="flex items-center gap-4">
                  <div className="profile-image">
                    <img src={reviewProfile1} alt="" />
                  </div>
                  <div className="profile-details">
                    <div className="heading-2">Thomas darniam</div>
                    <div className="description-1">Designer</div>
                  </div>
                </div>
                <div className="review-details mt-2">
                  <p className="description-1 text-primaryGrayColor">
                    “Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="description-2 text-primaryGrayColor">
                    18 Sept 2022 - 8 : 35 PM
                  </div>
                  <div className="flex items-center gap-1">
                    <img src={reviewStar} alt="" />
                    <img src={reviewStar} alt="" />
                    <img src={reviewStar} alt="" />
                    <img src={reviewStar} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Review;
