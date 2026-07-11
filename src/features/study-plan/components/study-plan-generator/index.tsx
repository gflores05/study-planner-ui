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
import { StudyPlanNavbar } from '@/features/study-plan'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faBookOpen,
  faBrain,
  faGraduationCap,
  faStairs
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
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
import { Spinner } from '@/components/ui/spinner'
import { NavLink } from 'react-router'

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
    { label: 'Select a grade', value: 'Unknown' },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' },
    { label: '5th Grade', value: '5th Grade' },
    { label: '6th Grade', value: '6th Grade' }
  ],
  'High School': [
    { label: 'Select a grade', value: 'Unknown' },
    { label: '6th Grade', value: '6th Grade' },
    { label: '7th Grade', value: '7th Grade' },
    { label: '8th Grade', value: '8th Grade' },
    { label: '9th Grade', value: '9th Grade' },
    { label: '10th Grade', value: '10th Grade' },
    { label: '11th Grade', value: '11th Grade' },
    { label: '12th Grade', value: '12th Grade' }
  ],
  University: [
    { label: 'Select a grade', value: 'Unknown' },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' },
    { label: '5th Grade', value: '5th Grade' },
    { label: '6th Grade', value: '6th Grade' }
  ],
  Postgraduate: [
    { label: 'Select a grade', value: 'Unknown' },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' }
  ]
}

const studyPlanFormSchema = z.object({
  level: z.string().refine(v => v !== 'Unknown', 'Please select a level'),
  grade: z.string().refine(v => v !== 'Unknown', 'Please select a grade'),
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

export function StudyPlanGeneratorForm() {
  const [grades, setGrades] = useState<OptionData[]>([
    { label: 'Select a grade', value: 'Unknown' }
  ])

  const { handleSubmit, control } = useForm<GenerateStudyPlanForm>({
    resolver: zodResolver(studyPlanFormSchema),
    defaultValues: {
      level: 'Unknown',
      grade: 'Unknown',
      subject: ''
    }
  })

  function onSelectLevel(level: string | null) {
    setGrades(level ? gradesByLevel[level] : [])
  }

  const { generateStudyPlan, loading } = useGenerateStudyPlan()

  async function onSubmit({ level, grade, subject }: GenerateStudyPlanForm) {
    await generateStudyPlan(level, grade, subject)
    toast('Success!', {
      description: <p>Your plan is being generated right now!</p>,
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2 bg-emerald-700 rounded-sm'
      }
    })
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
                  {...field}
                  id="level"
                  onValueChange={onSelectLevel}
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
                  {...field}
                  id="grade"
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

function StudyPlanLoading() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <Spinner />
      <p className="mt-4 text-lg font-medium text-slate-700">
        Generating your study plan...
      </p>
    </div>
  )
}

export function StudyPlanGenerator() {
  const { error, currentStudyPlan, loading } = useGenerateStudyPlan()
  return (
    <>
      <StudyPlanNavbar />
      <MainContainer>
        <Content
          alignContent="center"
          title="Generate New Plan"
          subtitle="Time to train your brain!">
          {loading && <StudyPlanLoading />}
          {!currentStudyPlan && <StudyPlanGeneratorForm />}
          {currentStudyPlan && (
            <NavLink to={`/study-plan/${currentStudyPlan.id}`} end>
              Go to your study plan
            </NavLink>
          )}
          {error && (
            <p className="text-red-600 text-sm font-medium mt-4">{error}</p>
          )}
        </Content>
      </MainContainer>
    </>
  )
}
