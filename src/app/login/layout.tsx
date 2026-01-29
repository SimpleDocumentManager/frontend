import LoginGuard from './guard'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <LoginGuard>{children}</LoginGuard>
}
