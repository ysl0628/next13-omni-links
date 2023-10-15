import Container from '@/components/ui/Container'
import SignUpClient from '@/components/page/auth/SignUpClient'

export default function SignUpPage() {
  return (
    <div className="flex bg-grey-50 w-full">
      <Container>
        <div className="flex justify-center items-center h-[95%]">
          <div className="w-full p-2 px-16 pb-8 min-w-[20rem] md:max-w-[32rem] md:shadow-md md:rounded md:bg-white bg-grey-50">
            <SignUpClient />
          </div>
        </div>
      </Container>
    </div>
  )
}
