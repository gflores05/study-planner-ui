import { Button, Content, MainContainer, Title } from '@/components'
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  Field,
  FieldLabel
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

type OptionData = { label: string; value: string | null }

const levels = [
  { label: 'Select a level', value: null },
  { label: 'Elementary School', value: 'Elementary School' },
  { label: 'High School', value: 'High School' },
  { label: 'University', value: 'University' },
  { label: 'Postgraduate', value: 'Postgraduate' }
]

const gradesByLevel: Record<string, OptionData[]> = {
  'Elementary School': [
    { label: 'Select a grade', value: null },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' },
    { label: '5th Grade', value: '5th Grade' },
    { label: '6th Grade', value: '6th Grade' }
  ],
  'High School': [
    { label: 'Select a grade', value: null },
    { label: '6th Grade', value: '6th Grade' },
    { label: '7th Grade', value: '7th Grade' },
    { label: '8th Grade', value: '8th Grade' },
    { label: '9th Grade', value: '9th Grade' },
    { label: '10th Grade', value: '10th Grade' },
    { label: '11th Grade', value: '11th Grade' },
    { label: '12th Grade', value: '12th Grade' }
  ],
  University: [
    { label: 'Select a grade', value: null },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' },
    { label: '5th Grade', value: '5th Grade' },
    { label: '6th Grade', value: '6th Grade' }
  ],
  Postgraduate: [
    { label: 'Select a grade', value: null },
    { label: '1st Grade', value: '1st Grade' },
    { label: '2nd Grade', value: '2nd Grade' },
    { label: '3rd Grade', value: '3rd Grade' },
    { label: '4th Grade', value: '4th Grade' }
  ]
}

interface FieldIconGroupProps {
  children: React.ReactNode
  label: string
  labelFor: string
  icon: IconProp
}
function FieldIconGroup({
  children,
  label,
  labelFor,
  icon
}: FieldIconGroupProps) {
  return (
    <Field>
      <div className="flex content-center">
        <div className="flex flex-col justify-center rounded-2xl bg-linear-to-r shadow-xl from-indigo-600 to-violet-600 p-4 mr-4 text-white shadow-indigo-100">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="w-full">
          <FieldLabel htmlFor={labelFor}>{label}</FieldLabel>
          {children}
        </div>
      </div>
    </Field>
  )
}
export function StudyPlanGenerator() {
  const [grades, setGrades] = useState<OptionData[]>([
    { label: 'Select a grade', value: null }
  ])

  function onSelectLevel(level: string | null) {
    setGrades(level ? gradesByLevel[level] : [])
  }

  return (
    <>
      <StudyPlanNavbar />
      <MainContainer>
        <div className="lg:col-span-2 space-y-6">
          <Title
            title="Generate New Plan"
            subtitle="Time to train your brain!"
          />
          <Content alignContent="center">
            <div className="w-full flex justify-center">
              <form className="w-full max-w-lg">
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>New Plan</FieldLegend>
                    <FieldDescription>
                      Please answer these questions
                    </FieldDescription>
                    <FieldIconGroup
                      icon={faGraduationCap}
                      label="What's your level?"
                      labelFor="level">
                      <Select
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
                    </FieldIconGroup>
                    <FieldIconGroup
                      icon={faStairs}
                      label="What grade are you in?"
                      labelFor="grade">
                      <Select
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
                    </FieldIconGroup>
                    <FieldGroup>
                      <FieldIconGroup
                        icon={faBookOpen}
                        label="What topic would you like to study?"
                        labelFor="subject">
                        <Input
                          id="subject"
                          placeholder="Artificial Inteligence"
                          required
                        />
                      </FieldIconGroup>
                    </FieldGroup>
                  </FieldSet>
                  <div className="flex justify-end">
                    <Button variant="primary" type="submit">
                      <FontAwesomeIcon icon={faBrain} /> Generate
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </Content>
        </div>
      </MainContainer>
    </>
  )
}
