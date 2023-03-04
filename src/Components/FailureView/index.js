import './index.css'

const FailureView = props => {
  const {retry} = props

  const onClickRetry = () => {
    retry()
  }

  return (
    <div className="failure_card">
      <img
        src="https://res.cloudinary.com/djedlaeqd/image/upload/v1675872020/homepage-failure_egb8fl_uxaqi5.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="Try_again_button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
