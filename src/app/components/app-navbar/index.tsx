import {
  faRightFromBracket,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, type ComponentProps } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useStudyPlan } from '../../../features/study-plan/hooks/study-plan.hooks'
import { useAuth } from '@/features/auth/hooks'
import { Link } from 'react-router'

function StudyPlanLevel() {
  const { studyPlan, loading } = useStudyPlan()
  const { user, isUserLoading, fetchUser } = useAuth()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const levelInitial = useMemo(() => user?.name[0].toUpperCase(), [user])

  if (isUserLoading) {
    return <Spinner />
  }

  return (
    <div className="flex items-center gap-4">
      {studyPlan && studyPlan.level && (
        <Badge
          variant="info"
          className="h-auto gap-1.5 px-3 py-1 text-sm ring-1 ring-indigo-700/10 ring-inset">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          Level: {studyPlan.level}
        </Badge>
      )}
      {loading && <Spinner />}

      <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
        <Avatar className="size-9 ring-2 ring-slate-100">
          <AvatarImage
            alt={levelInitial}
            src={user?.picture}
            referrerPolicy="no-referrer"
          />
          <AvatarFallback className="bg-slate-200 font-semibold text-slate-600">
            {levelInitial}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
        <Link to="/">
          <FontAwesomeIcon className="text-xl" icon={faUserGraduate} />
        </Link>
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        <Link to="/">
          Human<span className="text-indigo-600">Learning</span>
        </Link>
      </span>
    </div>
  )
}

export function StudyPlanNav() {
  return (
    <div className="flex gap-4">
      <StudyPlanLevel />
      <LogoutButton />
    </div>
  )
}

export function LogoutButton() {
  const { handleLogout } = useAuth()

  return (
    <Button variant="ghost" size="icon" title="Log out" onClick={handleLogout}>
      <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
    </Button>
  )
}

interface LoginButton extends Omit<
  ComponentProps<typeof Button>,
  'children' | 'onClick'
> {}

export function LoginButton(props: LoginButton) {
  const { handleLogin } = useAuth()

  return (
    <Button variant="outline" size="lg" {...props} onClick={handleLogin}>
      Log In
    </Button>
  )
}

export function SingupButton() {
  const { handleSignUp } = useAuth()

  return (
    <Button onClick={handleSignUp} size="lg">
      Sing Up
    </Button>
  )
}

export function AuthNav() {
  return (
    <div className="flex gap-4">
      <LoginButton />
      <SingupButton />
    </div>
  )
}

export function AppNavbar() {
  const { isAuthenticated } = useAuth()

  return (
    <Navbar compact>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />
        {isAuthenticated ? <StudyPlanNav /> : <AuthNav />}
      </div>
    </Navbar>
  )
}
