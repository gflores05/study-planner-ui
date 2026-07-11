export type AnswerDTO = {
  id: string
  text: string
  option: string
}

export type QuestionDTO = {
  id: string
  text: string
  options: AnswerDTO[]
  answer: string
  selected_answer: string
  assessment_id: string
}
