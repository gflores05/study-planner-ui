import type { SubTopicDTO } from '../../study-plan/dtos'
import type { SubTopic } from '../../study-plan/types'

export const SubTopicMapper = {
  fromDTO: (dto: SubTopicDTO): SubTopic => ({
    id: dto.id,
    title: dto.title,
    studyMaterial: dto.study_material,
    topicId: dto.topic_id
  })
}
