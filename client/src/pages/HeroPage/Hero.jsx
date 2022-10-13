import {useParams} from 'react-router-dom'

const Hero = () => {
  const {id} = useParams()
  return (
    <div>Hero: {id}</div>
  )
}

export default Hero