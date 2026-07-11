import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import cx from 'classnames'
import { Card } from '@/components/card'

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

interface QuestionHintProps {
  children: React.ReactNode
}

function QuestionHint({ children }: QuestionHintProps) {
  return (
    <p className="mt-2 text-sm text-slate-500 inline-flex items-center gap-1">
      <FontAwesomeIcon icon={faLightbulb} className="text-indigo-500" />
      {children}
    </p>
  )
}

interface QuestionOptionProps {
  option: string
  text: string
  selected?: boolean
}

function QuestionOption({ option, text, selected }: QuestionOptionProps) {
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
          {option}
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
        name="question_3"
        checked={selected}
        className={cx(
          'h-4 w-4 text-indigo-600 accent-indigo-600 focus:ring-indigo-600',
          !selected && 'border-slate-300'
        )}
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
export function QuestionCard() {
  return (
    <Card compact>
      <QuestionText>
        ¿Cuál es la función principal de la "función de activación" en una
        neurona artificial dentro de una red neuronal?
      </QuestionText>

      <QuestionHint>
        Piensa en cómo se decide si una señal biológica pasa o no a la siguiente
        neurona.
      </QuestionHint>

      <QuestionOptionList>
        <QuestionOption
          option="A"
          text="Multiplicar los datos de entrada por un peso asignado de forma aleatoria."
        />
        <QuestionOption
          option="B"
          text="Introducir no linealidad en la red para que pueda aprender patrones complejos."
          selected
        />
        <QuestionOption
          option="C"
          text="Almacenar de forma permanente las respuestas correctas dadas por el usuario."
        />
        <QuestionOption
          option="D"
          text="Reducir la velocidad de procesamiento para evitar el sobrecalentamiento del sistema."
        />
      </QuestionOptionList>
    </Card>
  )
}
