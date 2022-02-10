import { getFilePath } from '../../utils/file'

export default function LoginLayout({ children }) {
  return (
    <div 
      style={{
        backgroundImage: `url(${getFilePath('/images/background.jpg')})`, 
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}
    >
      { children }
    </div>
  )
}