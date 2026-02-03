import { Spinner } from "@/components/ui/spinner"

interface FullScreenLoaderProps {
    label?:string
}

const FullScreenLoader = ({label}: FullScreenLoaderProps) => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-2'>
        <Spinner />
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}

export default FullScreenLoader