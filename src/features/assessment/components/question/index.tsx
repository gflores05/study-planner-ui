import cx from 'classnames'
import { Card } from '@/components/card'
import type { Question } from '../../types'

interface QuestionTextProps {
  children: React.ReactNode
}
function QuestionText({ children }: QuestionTextProps) {
  return (
    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl leading-relaxed">
      {children}
    </h2>
  )
}

interface QuestionOptionProps {
  option: string
  text: string
  selected?: boolean
  name: string
  onSelect: (value: string) => void
}

function QuestionOption({
  option,
  text,
  selected,
  name,
  onSelect
}: QuestionOptionProps) {
  return (
    <label
      className={cx(
        'group flex items-center justify-between rounded-xl p-4 cursor-pointer',
        !selected &&
          ' border border-slate-200 bg-white transition-all hover:border-slate-300 hover:bg-slate-50/50',
        selected &&
          'border-2 border-indigo-600 bg-indigo-50/30 p-4 shadow-sm ring-1 ring-indigo-100'
      )}>
      <div className="flex items-center gap-4">
        <div
          className={cx(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold',
            !selected &&
              'border border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:bg-white',
            selected && 'bg-indigo-600 text-white'
          )}>
          {option.toUpperCase()}
        </div>
        <span
          className={cx(
            !selected && 'font-medium text-slate-700',
            selected && 'font-semibold text-indigo-900'
          )}>
          {text}
        </span>
      </div>
      <input
        type="radio"
        name={name}
        value={option}
        checked={selected}
        className={cx(
          'h-4 w-4 text-indigo-600 accent-indigo-600 focus:ring-indigo-600',
          !selected && 'border-slate-300'
        )}
        onChange={evt => onSelect(evt.target.value)}
      />
    </label>
  )
}

interface QuestionOptionListProps {
  children: React.ReactNode[]
}
export function QuestionOptionList({ children }: QuestionOptionListProps) {
  return <div className="mt-8 space-y-4">{children}</div>
}

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onChangeAnswer: (answer: string) => void
}

export function QuestionCard({
  question,
  selectedAnswer,
  onChangeAnswer
}: QuestionCardProps) {
  return (
    <Card compact>
      <QuestionText>{question.text}</QuestionText>

      <QuestionOptionList>
        {question.options.map(option => (
          <QuestionOption
            key={option.id}
            name="answer"
            option={option.option}
            text={option.text}
            selected={selectedAnswer === option.option}
            onSelect={onChangeAnswer}
          />
        ))}
      </QuestionOptionList>
    </Card>
  )
}
