import { Accounts } from './Components/Accounts/Accounts';
import { Campaigns } from './Components/Campaigns/Campaigns';
// import { Campaigns } from './Components/Campaigns/Campaigns';
import { Profiles } from './Components/Profiles/Profiles';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accounts />} />
        <Route path="/Profiles/:accountId" element={<Profiles />} />
        <Route path="/Campaigns/:profileId" element={<Campaigns />} />
      </Routes >
    </>

  )
}

export default App
// < Accounts />
//       <Profiles />
//       <Campaigns />