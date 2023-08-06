import Container from '@/components/Container'
import SignUpClient from '@/components/admin/SignUpClient'

export default function SignUpPage() {
  return (
    <div className="flex bg-grey-50 w-full">
      <Container>
        <div className="flex justify-center items-center h-full">
          <div className="w-full p-2 px-16 pb-8 min-w-[32rem] shadow-md rounded bg-white">
            <SignUpClient />
          </div>
        </div>
      </Container>
    </div>
  )
}
