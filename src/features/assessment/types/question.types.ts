export type Answer = {
  id: string
  text: string
  option: string
}

export type Question = {
  id: string
  text: string
  options: Answer[]
  answer: string
  selectedAnswer: string
  assessmentId: string
}
