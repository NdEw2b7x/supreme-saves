import { EchoId } from '../../slice/echoesSlice';
import styles from './EchoSubAdd.module.css';

export default function EchoSubAdd({ close, echoId }: { close: () => void; echoId: EchoId }) {
  return (
    <article className={styles.background}>
      <div className={styles.container}>
        {echoId}
        <input
          className={styles.cancel}
          type='button'
          value='취소'
          onClick={() => {
            close();
          }}
        />
        <input
          className={styles.save}
          type='button'
          value='저장'
          onClick={() => {
            close();
          }}
        />
      </div>
    </article>
  );
}
