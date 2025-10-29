import { useState } from "react";
import styles from "./course-edit.module.scss";

const CourseEdit = () => {
  const [formData, setFormData] = useState({
    title: "Основы сетевой инженерии",
    description:
      "Этот курс охватывает ключевые концепции сетевой инженерии: от модели OSI до настройки маршрутизаторов и коммутаторов.",
    difficulty: "beginner",
    durationWeeks: 8,
    tags: "Сети, Cisco, IT, Инфраструктура",
    skills: "TCP/IP, Маршрутизация, Коммутация, Безопасность сетей, Subnetting",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Сохранённые данные:", formData);
  };

  return (
    <div className={styles.edit}>
      <h2 className={styles.edit__title}>Редактирование курса</h2>

      <form className={styles.edit__form} onSubmit={handleSubmit}>
        <div className={styles.edit__field}>
          <label htmlFor="title" className={styles.edit__label}>
            Название курса
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={styles.edit__input}
            required
          />
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="description" className={styles.edit__label}>
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles.edit__textarea}
            rows={5}
            required
          />
        </div>

        <div className={styles.edit__field}>
          <label className={styles.edit__label}>Уровень сложности</label>
          <div className={styles.edit__radioGroup}>
            {[
              { value: "beginner", label: "Начинающий" },
              { value: "intermediate", label: "Средний" },
              { value: "advanced", label: "Продвинутый" },
            ].map((opt) => (
              <label key={opt.value} className={styles.edit__radioLabel}>
                <input
                  type="radio"
                  name="difficulty"
                  value={opt.value}
                  checked={formData.difficulty === opt.value}
                  onChange={handleInputChange}
                  className={styles.edit__radio}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="durationWeeks" className={styles.edit__label}>
            Длительность (недель)
          </label>
          <input
            type="number"
            id="durationWeeks"
            name="durationWeeks"
            min="1"
            max="52"
            value={formData.durationWeeks}
            onChange={handleInputChange}
            className={styles.edit__input}
          />
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="tags" className={styles.edit__label}>
            Теги (через запятую)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className={styles.edit__input}
            placeholder="Например: Сети, Cisco, IT"
          />
        </div>

        <div className={styles.edit__field}>
          <label htmlFor="skills" className={styles.edit__label}>
            Навыки (через запятую)
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            className={styles.edit__input}
            placeholder="Например: TCP/IP, Маршрутизация"
          />
        </div>

        <div className={styles.edit__actions}>
          <button type="submit" className={styles.edit__button}>
            Сохранить изменения
          </button>
          <button
            type="button"
            className={styles.edit__button + " " + styles.edit__button_cancel}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEdit;
