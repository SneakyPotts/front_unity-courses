import { Loader } from '_ui/Loader'

export default function SiteLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <Loader />
    </div>
  )
}
