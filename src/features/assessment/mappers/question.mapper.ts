import type { AnswerDTO, QuestionDTO } from '../dtos'
import type { Answer, Question } from '../types'

export const AnswerMapper = {
  fromDTO: (dto: AnswerDTO): Answer => {
    return {
      id: dto.id,
      text: dto.text,
      option: dto.option
    }
  }
}

export const QuestionMapper = {
  fromDTO: (dto: QuestionDTO): Question => {
    return {
      id: dto.id,
      options: dto.options.map(AnswerMapper.fromDTO),
      answer: dto.answer,
      selectedAnswer: dto.selected_answer,
      text: dto.text,
      assessmentId: dto.assessment_id
    }
  }
}
