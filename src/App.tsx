import {
  Echoes,
  ResonatorDetail,
  Resonators,
  System,
  Weapons,
} from './components'
import { useSelector } from 'react-redux'
import { dispatch, State } from './store'
import { changePage, everyPage } from './slice/grobalSlice'

export default function App() {
  const page = useSelector((state: State) => state.grobalSlice.page)
  const subPage = useSelector((state: State) => state.grobalSlice.subPage)
  return (
    <>
      {page === '공명자' ? (
        subPage === '상세' ? (
          <ResonatorDetail />
        ) : (
          <Resonators />
        )
      ) : page === '무기' ? (
        <Weapons />
      ) : page === '에코' ? (
        <Echoes />
      ) : (
        <System />
      )}
      <h6
        style={{
          marginBottom: 'calc(env(safe-area-inset-bottom) + 3.25rem)',
          padding: '0.5rem',
          lineHeight: '1.5',
        }}
      >
        "명조: 워더링 웨이브" 플레이어를 위한 보조 프로그램. 모든 자료는 ©KURO
        GAMES의 저작물입니다.
      </h6>
      <footer>
        <nav>
          {everyPage.map(i => (
            <div
              key={i}
              data-selected={i === page}
              onClick={() => {
                dispatch(changePage(i))
              }}
            >
              <div className='nav_indicator'></div>
              <div>
                <span>{i}</span>
              </div>
            </div>
          ))}
        </nav>
      </footer>
    </>
  )
}
