// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarItemDetails} = props

  const updatedData = {
    id: similarItemDetails.id,
    imageUrl: similarItemDetails.image_url,
    title: similarItemDetails.title,
    style: similarItemDetails.style,
    price: similarItemDetails.price,
    description: similarItemDetails.description,
    brand: similarItemDetails.brand,
    totalReviews: similarItemDetails.total_reviews,
    rating: similarItemDetails.rating,
    availability: similarItemDetails.availability,
  }

  const {imageUrl, title, price, brand, rating} = updatedData

  return (
    <li className="item-container">
      <img className="image" src={imageUrl} alt={`similar product ${title}`} />
      <h1 className="product-title">{title}</h1>
      <p className="brand">{`by ${brand}`}</p>
      <div className="price-rating-container">
        <p className="price">{`RS ${price}/-`}</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            className="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
