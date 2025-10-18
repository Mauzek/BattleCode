import { Rating } from "./rating";
import { Badges } from "./badges";
import styles from "./homeDetails.module.scss";
import { CourseCard } from "../courseCard";

const xpTopUsers = [
  { id: "me", name: "boby", avatar: null, value: 12450 },
  {
    id: "u1",
    name: "Alex",
    avatar: "https://i.pravatar.cc/150?img=1",
    value: 11200,
  },
  {
    id: "u2",
    name: "Mira",
    avatar: "https://i.pravatar.cc/150?img=2",
    value: 10000,
  },
  { id: "u3", name: "Dima", avatar: null, value: 9870 },
  {
    id: "u4",
    name: "Lena",
    avatar: "https://i.pravatar.cc/150?img=4",
    value: 8920,
  },
];

const xpCurrentUser = {
  id: "me",
  name: "boby",
  avatar: null,
  value: 12450,
  position: 1,
};

const coursesTopUsers = [
  {
    id: "u5",
    name: "Sasha",
    avatar: "https://i.pravatar.cc/150?img=5",
    value: 86,
  },
  { id: "u6", name: "Nina", avatar: null, value: 82 },
  {
    id: "u7",
    name: "Ivan",
    avatar: "https://i.pravatar.cc/150?img=7",
    value: 79,
  },
  { id: "u8", name: "Kate", avatar: null, value: 75 },
  {
    id: "u9",
    name: "Max",
    avatar: "https://i.pravatar.cc/150?img=9",
    value: 71,
  },
];

const coursesCurrentUser = {
  id: "me",
  name: "boby",
  avatar: null,
  value: 35,
  position: 123,
};

const achievementsTopUsers = [
  {
    id: "u10",
    name: "Egor",
    avatar: "https://i.pravatar.cc/150?img=10",
    value: 42,
  },
  { id: "u11", name: "Anna", avatar: null, value: 39 },
  { id: "me", name: "boby", avatar: null, value: 37 },
  {
    id: "u12",
    name: "Oleg",
    avatar: "https://i.pravatar.cc/150?img=12",
    value: 34,
  },
  { id: "u13", name: "Zoya", avatar: null, value: 31 },
];

const achievementsCurrentUser = {
  id: "me",
  name: "boby",
  avatar: null,
  value: 37,
  position: 3,
};

export const HomeDetails = () => {
  return (
    <div className={styles.homeDetails}>
      <Badges
        nearestDeadline="30.10.2025"
        achievementProgress={{ current: 62, total: 120 }}
        nextAchievement={{
          name: "Warrior",
          current: 1,
          total: 3,
          description: "Win 3 battles against NPCs to earn the Warrior badge!",
        }}
        coursesProgress={{ current: 7, total: 86 }}
      />

      <CourseCard
        id="12313"
        slug="loops-in-programming"
        title="Loops in Programming"
        description="Master the fundamentals of loops: for, while, and do-while. Learn to avoid infinite loops and optimize iterations."
        status="in progress"
        progress={45}
        tags={["JavaScript", "Beginner", "12 lessons"]}
      />

      <div className={styles.homeDetails__rankingContainer}>
        <Rating
          title="XP Leaderboard"
          unit="XP"
          topUsers={xpTopUsers}
          currentUser={xpCurrentUser}
        />
        <Rating
          title="Courses Leaderboard"
          unit="pcs"
          topUsers={coursesTopUsers}
          currentUser={coursesCurrentUser}
        />
        <Rating
          title="Achievements Leaderboard"
          unit="pcs"
          topUsers={achievementsTopUsers}
          currentUser={achievementsCurrentUser}
        />
      </div>
    </div>
  );
};
