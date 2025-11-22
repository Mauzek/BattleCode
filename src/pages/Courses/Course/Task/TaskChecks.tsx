import { Link } from 'react-router-dom';
import styles from './task-checks.module.scss';

const mockCheckers = [
  { id: '1', name: 'Анна Петрова', submittedAt: '2025-10-25T14:30:00' },
  { id: '2', name: 'Михаил Сидоров', submittedAt: '2025-10-26T09:15:00' },
  { id: '3', name: 'Елена Козлова', submittedAt: '2025-10-27T18:45:00' },
];

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const TaskChecks = () => {
  return (
    <div className={styles.checks}>
      <div className={styles.checks__list}>
        {mockCheckers.map((checker) => (
          <Link
            key={checker.id}
            to={`${checker.id}`}
            className={styles.checks__item}
          >
            <div className={styles.checks__info}>
              <h3 className={styles.checks__name}>{checker.name}</h3>
              <time className={styles.checks__date}>
                Отправлено: {formatDate(checker.submittedAt)}
              </time>
            </div>
            <span className={styles.checks__view}>Посмотреть →</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskChecks;