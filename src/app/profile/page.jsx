
import Profile from '@/components/Profile'
import SectionContainer from '@/components/SectionContainer'

const ProfileComponent = () => {

  return (
    <SectionContainer>
      <div className="space-y-2 pb-8 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
          YOUR PROFILE
        </h1>
      </div>
      <Profile />
    </SectionContainer>
  )
}

export default ProfileComponent