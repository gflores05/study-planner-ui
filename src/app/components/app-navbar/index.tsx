import {
  faRightFromBracket,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Navbar, type ButtonProps } from '@/components'
import { useEffect, useMemo } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useStudyPlan } from '../../../features/study-plan/hooks/study-plan.hooks'
import { useAuth } from '@/features/auth/hooks'

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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-555 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          Level: {studyPlan.level}
        </span>
      )}
      {loading && <Spinner />}

      <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
        <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center font-semibold text-slate-600 ring-2 ring-slate-100">
          {user?.picture ? (
            <img alt={user.name} src={user.picture} />
          ) : (
            levelInitial
          )}
        </div>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
        <FontAwesomeIcon className="text-xl" icon={faUserGraduate} />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        Edu<span className="text-indigo-600">Plan</span>
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
    <Button variant="flat" size="icon" title="Log out" onClick={handleLogout}>
      <FontAwesomeIcon className="text-2xl" icon={faRightFromBracket} />
    </Button>
  )
}

interface LoginButton extends Omit<ButtonProps, 'children' | 'onClick'> {}

export function LoginButton(props: LoginButton) {
  const { handleLogin } = useAuth()

  return (
    <Button {...props} onClick={handleLogin}>
      Log In
    </Button>
  )
}

export function SingupButton() {
  const { handleSignUp } = useAuth()

  return (
    <Button onClick={handleSignUp} variant="primary">
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
