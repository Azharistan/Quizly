import { Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import "./style/Backbutton.css"


const BackButton = () => {
  return (
    <div>
        <Link to={'/'} className='back-button'>
            <BsArrowLeft className='text-2xl'/>
        </Link>      
    </div>
  )
}

export default BackButton
