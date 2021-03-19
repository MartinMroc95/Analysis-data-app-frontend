import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ActiveLink({ to, name, icon, color }) {
  const location = useLocation()

  const blueBorderColor = 'border-blue-600'
  const redBorderColor = 'border-red-600'

  const blueTextColor = 'text-blue-600'
  const redTextColor = 'text-red-600'

  const switchBorderColor = (key) => {
    switch (key) {
      case 'blue':
        return blueBorderColor
      case 'red':
        return redBorderColor
      default:
        break
    }
  }

  const switchTextColor = (key) => {
    switch (key) {
      case 'blue':
        return blueTextColor
      case 'red':
        return redTextColor
      default:
        break
    }
  }

  return (
    <Link
      to={to}
      className={`flex items-center py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline border-b-2 hover:${switchBorderColor(
        color
      )}  ${location.pathname === to ? switchBorderColor(color) : 'border-gray-800'}`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`pr-0  w-5 h-5 min-w-32 md:pr-3 ${
          location.pathname === to ? switchTextColor(color) : 'text-white'
        } `}
      ></FontAwesomeIcon>
      <span
        className={`pb-1 md:pb-0 text-xs md:text-base  ${
          location.pathname === to ? 'text-white' : 'text-gray-400'
        } block md:inline-block`}
      >
        {name}
      </span>
    </Link>
  )
}

export default ActiveLink
