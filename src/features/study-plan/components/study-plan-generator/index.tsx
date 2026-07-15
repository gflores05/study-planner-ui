import { Button, Content, MainContainer } from '@/components'
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel,
  FieldError
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { StudyPlanNavbar, StudyPlanStatus } from '@/features/study-plan'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faBookOpen,
  faBrain,
  faGraduationCap,
  faStairs
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useGenerateStudyPlan } from '../../hooks/study-plan.hooks'
import {
  Controller,
  useForm,
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps
} from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { NavLink } from 'react-router'
import type { Subscription } from 'rxjs'

type OptionData = { label: string; value: string | null }

const levels = [
  { label: 'Select a level', value: 'Unknown' },
  { label: 'Elementary School', value: 'Elementary School' },
  { label: 'High School', value: 'High School' },
  { label: 'University', value: 'University' },
  { label: 'Postgraduate', value: 'Postgraduate' }
]

const gradesByLevel: Record<string, OptionData[]> = {
  'Elementary School': [
    { label: 'Select a grade', value: '-1' },
    { label: '1st Grade', value: '1' },
    { label: '2nd Grade', value: '2' },
    { label: '3rd Grade', value: '3' },
    { label: '4th Grade', value: '4' },
    { label: '5th Grade', value: '5' },
    { label: '6th Grade', value: '6' }
  ],
  'High School': [
    { label: 'Select a grade', value: '-1' },
    { label: '6th Grade', value: '6' },
    { label: '7th Grade', value: '7' },
    { label: '8th Grade', value: '8' },
    { label: '9th Grade', value: '9' },
    { label: '10th Grade', value: '10' },
    { label: '11th Grade', value: '11' },
    { label: '12th Grade', value: '12' }
  ],
  University: [
    { label: 'Select a grade', value: '-1' },
    { label: '1st Grade', value: '1' },
    { label: '2nd Grade', value: '2' },
    { label: '3rd Grade', value: '3' },
    { label: '4th Grade', value: '4' },
    { label: '5th Grade', value: '5' },
    { label: '6th Grade', value: '6' }
  ],
  Postgraduate: [
    { label: 'Select a grade', value: '-1' },
    { label: '1st Grade', value: '1' },
    { label: '2nd Grade', value: '2' },
    { label: '3rd Grade', value: '3' },
    { label: '4th Grade', value: '4' }
  ]
}

const studyPlanFormSchema = z.object({
  level: z.string().refine(v => v !== 'Unknown', 'Please select a level'),
  grade: z.string().refine(v => v !== '-1', 'Please select a grade'),
  subject: z
    .string()
    .nonempty('Please enter a subject')
    .max(100, 'Subject must be at most 100 characters long')
})

type GenerateStudyPlanForm = z.infer<typeof studyPlanFormSchema>

interface FieldIconGroupProps {
  label: string
  id: keyof GenerateStudyPlanForm
  icon: IconProp
  control: Control<GenerateStudyPlanForm, any, GenerateStudyPlanForm>
  render: (
    field: ControllerRenderProps<
      GenerateStudyPlanForm,
      keyof GenerateStudyPlanForm
    >,
    fieldState: ControllerFieldState
  ) => React.ReactNode
}
function FieldIconGroup({
  label,
  id,
  icon,
  control,
  render
}: FieldIconGroupProps) {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex content-center">
            <div className="flex flex-col justify-center rounded-2xl bg-linear-to-r shadow-xl from-indigo-600 to-violet-600 p-4 mr-4 text-white shadow-indigo-100">
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="w-full">
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              {render(field, fieldState)}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </div>
        </Field>
      )}
    />
  )
}

interface StudyPlanGeneratorFormProps {
  onSubmit: (data: GenerateStudyPlanForm) => void
  loading?: boolean
}

export function StudyPlanGeneratorForm({
  onSubmit,
  loading
}: StudyPlanGeneratorFormProps) {
  const [grades, setGrades] = useState<OptionData[]>([
    { label: 'Select a grade', value: '-1' }
  ])

  const { handleSubmit, control } = useForm<GenerateStudyPlanForm>({
    resolver: zodResolver(studyPlanFormSchema),
    defaultValues: {
      level: 'Unknown',
      grade: '-1',
      subject: ''
    }
  })

  function onSelectLevel(
    field: ControllerRenderProps<
      {
        level: string
        grade: string
        subject: string
      },
      'level' | 'grade' | 'subject'
    >,
    level: string | null
  ) {
    setGrades(level ? gradesByLevel[level] : [])
    field.onChange(level)
  }

  return (
    <div className="w-full flex justify-center">
      <form
        id="study-plan-form"
        className="w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>New Plan</FieldLegend>
            <FieldDescription>Please answer these questions</FieldDescription>
            <FieldIconGroup
              icon={faGraduationCap}
              control={control}
              label="What's your level?"
              id="level"
              render={(field, fieldState) => (
                <Select
                  aria-invalid={fieldState.invalid}
                  id="level"
                  name={field.name}
                  value={field.value}
                  onValueChange={value => onSelectLevel(field, value)}
                  items={levels}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Niveles</SelectLabel>
                      {levels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldIconGroup
              icon={faStairs}
              label="What grade are you in?"
              id="grade"
              control={control}
              render={(field, fieldState) => (
                <Select
                  aria-invalid={fieldState.invalid}
                  id="grade"
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                  items={grades}
                  disabled={grades.length === 1}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Grados</SelectLabel>
                      {grades.map(grade => (
                        <SelectItem key={grade.value} value={grade.value}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldGroup>
              <FieldIconGroup
                icon={faBookOpen}
                label="What topic would you like to study?"
                id="subject"
                control={control}
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id="subject"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Artificial Intelligence"
                    autoComplete="off"
                  />
                )}
              />
            </FieldGroup>
          </FieldSet>
          <div className="flex justify-end">
            <Button
              variant="primary"
              type="submit"
              form="study-plan-form"
              disabled={loading}>
              <FontAwesomeIcon icon={faBrain} /> Generate
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}

interface ErrorMessageProps {
  children: React.ReactNode
}
export function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="text-red-600 text-sm font-medium mt-4">{children}</p>
}

interface StatusMessageProps {
  children: React.ReactNode
}
export function StatusMessage({ children }: StatusMessageProps) {
  return <p className="text-slate-600 text-sm font-medium mt-4">{children}</p>
}

export function StudyPlanGenerator() {
  const {
    error,
    studyPlan,
    loading,
    generateStudyPlan,
    fetchStudyPlan,
    wsClient
  } = useGenerateStudyPlan()

  useEffect(() => {
    let eventSubscription: Subscription
    if (wsClient) {
      eventSubscription = wsClient.events$.subscribe(async event => {
        console.log('receiving realtime event ', JSON.stringify(event))
        switch (event.event) {
          case 'ReportStudyPlanGeneratedCommand':
            await fetchStudyPlan()
            break
        }
      })
    }

    return () => {
      if (wsClient) {
        wsClient.dispose()
        eventSubscription.unsubscribe()
      }
    }
  }, [wsClient])

  useEffect(() => {
    if (error) {
      toast.error('Error', {
        description: (
          <p className="text-slate-800">
            There was an error generating your study plan. Please try again.
          </p>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'text-red-700',
          icon: 'text-red-700'
        }
      })
    }
  }, [error])

  async function onSubmit({ level, grade, subject }: GenerateStudyPlanForm) {
    await generateStudyPlan(subject, level, parseInt(grade))
    toast.success('Success!', {
      description: (
        <p className="text-slate-800">
          Your plan is being generated right now!
        </p>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'text-emerald-700',
        icon: 'text-emerald-700'
      }
    })
  }

  return (
    <>
      <StudyPlanNavbar />
      <MainContainer>
        <Content
          alignContent="center"
          title="Generate New Plan"
          subtitle="Time to train your brain!">
          <div className="w-full flex flex-col items-center justify-center gap-4">
            {loading && (
              <StatusMessage>Requesting study plan....</StatusMessage>
            )}
            {!studyPlan && !loading && (
              <StudyPlanGeneratorForm onSubmit={onSubmit} loading={loading} />
            )}
            {studyPlan && (
              <>
                {studyPlan.status === StudyPlanStatus.COMPLETED && (
                  <Button variant="primary">
                    <NavLink to={`/study-plan/${studyPlan.id}`} end>
                      Go to your study plan
                    </NavLink>
                  </Button>
                )}
                {studyPlan.status === StudyPlanStatus.PENDING ||
                  (studyPlan.status === StudyPlanStatus.GENERATING && (
                    <StatusMessage>
                      Your study plan is being genereted...
                    </StatusMessage>
                  ))}
                {studyPlan.status === StudyPlanStatus.FAILED ||
                  (studyPlan.status === StudyPlanStatus.UNKNOWN && (
                    <ErrorMessage>
                      Your study plan has failed to generate.
                    </ErrorMessage>
                  ))}
              </>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </Content>
      </MainContainer>
    </>
  )
}
