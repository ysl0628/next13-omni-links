import DialogWrapper from '@/components/dialog/Dialog'
import SignUpClient from '@/components/page/auth/SignUpClient'

export default function SignUpModal() {
  return (
    <DialogWrapper open={true}>
      <SignUpClient />
    </DialogWrapper>
  )
}
