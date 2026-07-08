import './App.css'
import { MainContainer } from './components/main-container'
import { Navbar } from './components/navbar'
import { StudyPlanOverview } from './study-plan/study-plan-overview'

function App() {
  return (
    <>
      <Navbar />

      <MainContainer>
        <StudyPlanOverview />
      </MainContainer>
    </>
  )
}

export default App
