import Editor from '@monaco-editor/react';
import styles from './task.module.scss';

const TaskIndex = () => {
  return (
    <div className={styles.task}>

      <div className={styles.task__lecture}>
        <div className={styles.task__header}>
          <h2 className={styles.task__title}>JS Basic</h2>
          <div className={styles.task__tags}>
            <span className={styles.task__tag}>API</span>
            <span className={styles.task__tag}>JS</span>
            <span className={styles.task__tag}>Promise</span>
          </div>
        </div>
        <div className={styles.task__description}>
          <p>
            Лекция по основам JavaScript, включая переменные, функции и объекты.
          </p>
        </div>
        <div className={styles.task__code}>
          <pre className={styles.task__codeBlock}>
            {`function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World")); // Output: Hello, World!`}
          </pre>
        </div>
      </div>


      <div className={styles.task__assignment}>
        <div className={styles.task__editor}>
          <h3>Задание</h3>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            defaultValue="// Напишите функцию sum(a, b), которая возвращает сумму двух чисел"
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
            }}
          />
          <button className={styles.task__submitBtn}>Отправить решение</button>
        </div>

        <div className={styles.task__feedback}>
          <h3>Обратная связь</h3>
          <p>Ваше решение будет проверено автоматически. Результат появится здесь.</p>
        </div>
      </div>
    </div>
  );
};

export default TaskIndex;