import LoginClient from '@/components/admin/LoginClient'
import DialogWrapper from '@/components/dialog/Dialog'

export default function LoginModal() {
  return (
    <DialogWrapper open={true}>
      <LoginClient />
    </DialogWrapper>
  )
}
