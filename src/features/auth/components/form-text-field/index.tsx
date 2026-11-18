import type { ComponentProps } from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface FormTextFieldProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  'name' | 'id' | 'value' | 'onChange' | 'onBlur'
> {
  control: Control<T>
  name: Path<T>
  label: string
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            {...inputProps}
            id={name}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
