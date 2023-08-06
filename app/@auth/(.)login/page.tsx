import LoginClient from '@/components/auth/LoginClient'
import DialogWrapper from '@/components/dialog/Dialog'

export default function LoginModal() {
  return (
    <DialogWrapper open={true}>
      <LoginClient />
    </DialogWrapper>
  )
}
