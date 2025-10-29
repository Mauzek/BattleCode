import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from './ProfileInfoScreen.module.scss';
import type { RootState } from "@/store";
import Radar from "./Radar/Radar";

interface UserResponse {
  userId: string;
  username: string;
  email: string;
  roles: string[];
  avatarUrl: string;
  bio: string;
  isVerified: boolean;
}

// Кэш для пользователей
const userCache = new Map<string, UserResponse>();

// API функция для получения пользователя с кэшированием
const getUserProfile = async (username: string): Promise<UserResponse> => {
  if (userCache.has(username)) {
    return userCache.get(username)!;
  }

  const response = {
    userId: '1',
    username: 'boby_dev',
    email: 'boby@company.com',
    roles: ['admin', 'developer'],
    avatarUrl: '',
    bio: 'Full-stack developer and team lead',
    isVerified: true,
  };
  
  const userData = response;
  userCache.set(username, userData);
  return userData;
};

// Кэш для изображений
const imageCache = new Map<string, string>();

const ProfileInfo = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const navigate = useNavigate();



  // Получаем текущего авторизованного пользователя из Redux store
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const metrics = {
  readability: 4.8,
  efficiency: 4.2,
  scalability: 1.4,
  reliability: 3.4,
  maintainability: 2.0
};
const metricData = [
    { name: 'Читаемость', value: metrics.readability },
    { name: 'Эффективность', value: metrics.efficiency },
    { name: 'Масштабируемость', value: metrics.scalability },
    { name: 'Надёжность', value: metrics.reliability },
    { name: 'Сопровождаемость', value: metrics.maintainability },
  ];
  // Проверяем, является ли просматриваемый профиль профилем текущего пользователя
  const isOwnProfile = useMemo(() => {
    return currentUser && user && currentUser.userId === user.userId;
  }, [currentUser, user]);

  // Проверяем по username, если userId не совпадает
  // const isOwnProfileByUsername = useMemo(() => {
  //   return currentUser && username && currentUser.username === username;
  // }, [currentUser, username]);

  // const showButtons = useMemo(() => {
  //   return !isOwnProfile && !isOwnProfileByUsername;
  // }, [isOwnProfile, isOwnProfileByUsername]);

  // Мемоизированный вызов API
  const fetchUser = useCallback(async () => {
    if (!username) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setAvatarError(false);
      
      const userData = await getUserProfile(username);
      setUser(userData);

      if (userData.avatarUrl) {
        preloadImage(userData.avatarUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    } finally {
      setLoading(false);
    }
  }, [username]);

  // Предзагрузка изображения
  const preloadImage = (url: string) => {
    if (imageCache.has(url)) return;

    const img = new Image();
    img.src = url;
    img.onload = () => imageCache.set(url, url);
  };

  // Обработчик ошибки загрузки аватара
  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  // URL аватара с кэшированием
  const avatarUrl = useMemo(() => {
    if (!user) return '/noavatar.png';
    if (avatarError) return '/noavatar.png';
    return user.avatarUrl || `/api/avatar/${user.username}`;
  }, [user, avatarError]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Функция для расчета возраста
  const calculateAge = useCallback((birthDate?: string): number => {
    if (!birthDate) return 25; 
    
    try {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age;
    } catch {
      return 25; 
    }
  }, []);

  // Функция для форматирования даты рождения
  const formatBirthDate = useCallback((birthDate?: string): string => {
    if (!birthDate) return "15 января 1990"; 
    
    try {
      const date = new Date(birthDate);
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return "15 января 1990"; // Заглушка при ошибке
    }
  }, []);

  // Функция для определения пола (заглушка)
  const getGender = useCallback((): string => {
    // В реальном приложении это должно приходить с бэкенда
    return "муж.";
  }, []);

  const age = useMemo(() => calculateAge(), [calculateAge]);
  const formattedBirthDate = useMemo(() => formatBirthDate(), [formatBirthDate]);
  const gender = useMemo(() => getGender(), [getGender]);

  const handleNavigateEdit = useCallback(() => {
    navigate('edit/');
  }, [navigate]);

  if (loading) {
    return (
      <div className={styles.profileInfo}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.profileInfo}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h3 className={styles.errorTitle}>Ошибка загрузки</h3>
          <p className={styles.errorText}>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={fetchUser}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.profileInfo}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Пользователь не найден</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profileInfo}>
      <div className={styles.info__block}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar__container}>
            <img 
              src={avatarUrl}
              alt={`Аватар ${user.username}`}
              className={styles.avatar}
              onError={handleAvatarError}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className={styles.avatar__description}>@{user.username}</p>
          {isOwnProfile && (
            <div className={styles.ownProfileBadge}>Это вы</div>
          )}
        </div>
        
        <div className={styles.information}>
          <h2 className={styles.Names}>
            {user.username}
          </h2>
          
          <p className={styles.info__text}>
            {formattedBirthDate} <span className={styles.age}>({age} года)</span>
          </p>
          
          <a
            className={`${styles.info__link} ${styles.info__text}`}
            href={`https://t.me/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.username}
          </a>
          
          <p className={styles.info__text}>{user.email}</p>
          <p className={styles.gender}>{gender}</p>
          <div className={styles.topInfo__xpBar} data-xp={`${1923}xp`}>
            <div className={styles.topInfo__xpFill} style={{ width: "65%" }} />
          </div>
        </div>

        <fieldset className={styles.profile__description}>
          <legend className={styles.profile_description__title}>О Себе</legend>
          <p className={styles.profile_description__text}>
            {user.bio || "Пользователь пока не добавил информацию о себе."}
          </p>
        </fieldset>
      </div>
      <div className={styles.info__block} style={{marginTop:10, padding:40,justifyContent:'space-between'}}>

<ul style={{textAlign:'start'}}>
    {metricData.map(el=><li key={el.name}>
      {el.name} - {el.value}
  </li>
      )}

</ul>
<Radar data={metrics} size={300}/>
</div>
      {isOwnProfile && (
        <div className={styles.ownProfileActions}>
          <p className={styles.ownProfileText}>Это ваш профиль</p>
          <button className={styles.editProfile__button} onClick={handleNavigateEdit}>
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;