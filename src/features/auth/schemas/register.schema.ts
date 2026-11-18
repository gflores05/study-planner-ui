import * as z from 'zod'

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 32

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(100, 'Name must be at most 100 characters'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .pipe(z.email('Enter a valid email')),
    password: z
      .string()
      .min(
        PASSWORD_MIN_LENGTH,
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters`
      )
      .max(
        PASSWORD_MAX_LENGTH,
        `Password must be at most ${PASSWORD_MAX_LENGTH} characters`
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .superRefine((values, ctx) => {
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match'
      })
    }
  })

export type RegisterFormValues = z.infer<typeof registerFormSchema>
