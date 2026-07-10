import { Container } from '../../../../components/container'
import { MainContainer } from '../../../../components/main-container'
import { StudyPlanNavbar } from '../navbar'

export function StudyPlanGenerator() {
  return (
    <>
      <StudyPlanNavbar />
      <MainContainer>
        <Container>
          <h2 className="text-xl font-bold text-slate-900">
            Generar Nuevo Plan
          </h2>
        </Container>
      </MainContainer>
    </>
  )
}
