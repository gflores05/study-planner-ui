import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import {
  PASSWORD_MIN_LENGTH,
  registerFormSchema,
  type RegisterFormValues
} from '../../schemas'
import { FormTextField } from '../form-text-field'

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  submitting?: boolean
  error?: string | null
}

export function RegisterForm({
  onSubmit,
  submitting,
  error
}: RegisterFormProps) {
  const { handleSubmit, control } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  return (
    <form id="register-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <FormTextField
          control={control}
          name="name"
          label="Name"
          placeholder="Jane Doe"
          autoComplete="name"
        />
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
          placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
          autoComplete="new-password"
        />
        <FormTextField
          control={control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        <Button
          size="lg"
          type="submit"
          className="w-full"
          disabled={submitting}>
          {submitting && <Spinner />} Create Account
        </Button>
      </FieldGroup>
    </form>
  )
}
