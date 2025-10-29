import { Badges } from "@/components/shared/homeDetails/badges";
import style from './ProfilePage.module.scss'

const ProfileBadges = () => {
  return (
    <div className={style.a}>
      <Badges 
        achievementProgress={{ current: 62, total: 120 }}
        nextAchievement={{
          name: "Warrior",
          current: 1,
          total: 3,
          description: "Win 3 battles against NPCs to earn the Warrior badge!",
        }}
        coursesProgress={{ current: 7, total: 86 }}
      />




    </div>
  );
};

export default ProfileBadges;
