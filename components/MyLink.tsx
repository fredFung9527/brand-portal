import Link from 'next/link'

export default function MyLink({to, children}) {
  return (
    <Link href={to || '/'}>
      <a>
        {children}
      </a>
    </Link>
  )
}