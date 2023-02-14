// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    quantity: 1,
    productDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  onclickDash = () => {
    const {quantity} = this.state

    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  onclickPlus = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="error-view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1 className="error-heading">Product Not Found</h1>
      <div className="button-container">
        <button
          className="error-btn"
          type="button"
          onClick={this.onClickContinueShopping}
        >
          continue shopping
        </button>
      </div>
    </div>
  )

  renderProductDetails = () => {
    const {productDetails, quantity} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      totalReviews,
      rating,
      brand,
      availability,
      similarProducts,
    } = productDetails

    return (
      <div>
        <div className="item-details-container">
          <img className="product-img" src={imageUrl} alt="product" />
          <div className="content-container">
            <h1 className="title">{title}</h1>
            <p className="price">{`RS ${price}`}</p>
            <div className="rating-review-container">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  className="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="review">{`${totalReviews} Reviews`}</p>
            </div>
            <p className="description">{description}</p>
            <p className="available-q"> {`Available: ${availability}`}</p>
            <p className="brand-q"> {`Brand: ${brand}`}</p>
            <hr className="line" />
            <div className="quantity-container">
              <button
                data-testid="plus"
                className="bs-btn"
                onClick={this.onclickPlus}
                type="button"
              >
                <BsPlusSquare />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                data-testid="minus"
                className="bs-btn"
                onClick={this.onclickDash}
                type="button"
              >
                <BsDashSquare />
              </button>
            </div>
            <div className="add-btn">
              <button className="button" type="button">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProducts.map(each => (
            <SimilarProductItem similarItemDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus} = this.state

    let value = ''

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        value = this.renderLoader()
        break
      case apiStatusConstants.success:
        value = this.renderProductDetails()
        break
      case apiStatusConstants.failure:
        value = this.renderFailureView()
        break
      default:
        value = null
        break
    }
    return (
      <div className="product-item-details-container">
        <Header />
        {value}
      </div>
    )
  }
}

export default ProductItemDetails
