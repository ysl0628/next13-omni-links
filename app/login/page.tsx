import Container from '@/components/ui/Container'
import LoginClient from '@/components/page/auth/LoginClient'

export default function LoginPage() {
  return (
    <div className="flex bg-grey-50 w-full">
      <Container>
        <div className="flex justify-center items-center h-[95%]">
          <div className="w-full p-2 px-16 pb-8 min-w-[20rem] md:max-w-[32rem] md:shadow-md md:rounded md:bg-white bg-grey-50">
            <LoginClient />
          </div>
        </div>
      </Container>
    </div>
  )
}
