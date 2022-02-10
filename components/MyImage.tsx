import Image from 'next/image'
import { getFilePath } from '../utils/file'

export default function MyImage({src, width, height, ...otherProps}) {
  if (!src) {
    return null
  }
  return (
    <Image 
      src={
        typeof src === 'string' ?
        (src[0] === '/' ? getFilePath(src) : src) :
        URL.createObjectURL(src)
      }
      width={width} 
      height={height} 
      {...otherProps}
    />
  )
}