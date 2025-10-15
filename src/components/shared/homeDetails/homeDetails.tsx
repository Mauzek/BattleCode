import styles from "./homeDetails.module.scss";

import { Course } from "./course";
import { Rating } from "./rating";
import { Badges } from "./badges";

export const HomeDetails = () => {
  return (
    <div className={styles.homeDetails}>
      <Badges />
      <Course />

      <div className={styles.homeDetails__rankingContainer}>
        <Rating
          title="XP Leaderboard"
          topUsers={[
            { id: "u1", name: "Alex", avatar: "", xp: 12450, position: 1 },
            { id: "u2", name: "Mira", avatar: "", xp: 11200, position: 2 },
            { id: "me", name: "Pavel", avatar: "", xp: 10890, position: 3 },
            { id: "u4", name: "Lena", avatar: "", xp: 9870, position: 4 },
            { id: "u5", name: "Sasha", avatar: "", xp: 8920, position: 5 },
          ]}
          currentUser={{
            id: "me",
            name: "Pavel",
            xp: 10890,
            position: 3,
          }}
        />
        <Rating
          title="Courses Leaderboard"
          topUsers={[
            { id: "u1", name: "Alex", avatar: "", xp: 12450, position: 1 },
            { id: "u2", name: "Mira", avatar: "", xp: 11200, position: 2 },
            { id: "u3", name: "Pavel", avatar: "", xp: 10890, position: 3 },
            { id: "u4", name: "Lena", avatar: "", xp: 9870, position: 4 },
            { id: "u5", name: "Sasha", avatar: "", xp: 8920, position: 5 },
          ]}
          currentUser={{
            id: "me",
            name: "Boby",
            xp: 10890,
            position: 3,
          }}
        />
        <Rating
          title="Achievements Leaderboard"
          topUsers={[
            { id: "u1", name: "Alex", avatar: "", xp: 12450, position: 1 },
            { id: "u2", name: "Mira", avatar: "", xp: 11200, position: 2 },
            { id: "me", name: "Pavel", avatar: "", xp: 10890, position: 3 },
            { id: "u4", name: "Lena", avatar: "", xp: 9870, position: 4 },
            { id: "u5", name: "Sasha", avatar: "", xp: 8920, position: 5 },
          ]}
          currentUser={{
            id: "me",
            name: "Pavel",
            xp: 10890,
            position: 3,
          }}
        />
      </div>
    </div>
  );
};
