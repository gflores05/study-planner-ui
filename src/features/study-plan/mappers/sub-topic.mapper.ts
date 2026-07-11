import type { SubTopicDTO } from '../dtos'
import type { SubTopic } from '../types'

export const SubTopicMapper = {
  fromDTO: (dto: SubTopicDTO): SubTopic => ({
    id: dto.id,
    title: dto.title,
    studyMaterial: dto.study_material,
    topicId: dto.topic_id
  })
}
