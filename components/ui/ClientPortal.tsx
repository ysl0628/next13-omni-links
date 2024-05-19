//components/ClientPortal.tsx

import { createPortal } from 'react-dom'
type ClientPortalInterface = {
  children: any
  show?: boolean
  onClose?: () => void
  selector: Element | null
}

const ClientPortal = ({ children, selector }: ClientPortalInterface) => {
  return selector ? createPortal(children, selector) : null
}

export default ClientPortal
