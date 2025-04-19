import { useSearchParams } from 'next/navigation'

export default function ProductPage() {
  const searchParams = useSearchParams()
  
  return <div>{searchParams.get('id')}</div>
}
