import LoginClient from '@/components/page/auth/LoginClient'
import DialogWrapper from '@/components/dialog/Dialog'

export default function LoginModal() {
  return (
    <DialogWrapper open={true}>
      <LoginClient />
    </DialogWrapper>
  )
}
