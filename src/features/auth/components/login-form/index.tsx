import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { loginFormSchema, type LoginFormValues } from '../../schemas'
import { FormTextField } from '../form-text-field'

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  submitting?: boolean
  error?: string | null
}

export function LoginForm({ onSubmit, submitting, error }: LoginFormProps) {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' }
  })

  return (
    <form id="login-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormTextField
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormTextField
          control={control}
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={submitting}>
          {submitting && <Spinner />} Log In
        </Button>
      </FieldGroup>
    </form>
  )
}
