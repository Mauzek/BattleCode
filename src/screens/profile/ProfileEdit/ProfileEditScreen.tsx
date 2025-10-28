import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './ProfileEditScreen.module.scss'

const ProfileEditScreen = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    displayName: "Иван Иванов",
    email: "user@example.com",
    bio: "Привет! Я участник этого замечательного сообщества. Люблю программирование и активный образ жизни.",
    website: "https://example.com",
    location: "Москва, Россия"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохранение данных:", formData);
    alert("Профиль успешно обновлен!");
    navigate(`/user/${username}`);
  };

  const handleCancel = () => {
    navigate(`/user/${username}`);
  };

  return (
    <div className={styles.profileEdit}>
      <h1 className={styles.title}>Редактирование профиля</h1>
      
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Основная информация</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="displayName" className={styles.label}>Отображаемое имя:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>Местоположение:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="website" className={styles.label}>Веб-сайт:</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>О себе</h3>
          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.label}>Биография:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className={styles.formTextarea}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={handleCancel} className={styles.btnSecondary}>
            Отмена
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditScreen;