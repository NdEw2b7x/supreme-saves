import WeaponsAdd from './WeaponsAdd'
import WeaponsList from './WeaponsList'
import { useSelector } from 'react-redux'
import { State, dispatch } from '../../store'
import { changeSubPage, changefilter } from '../../slice/grobalSlice'
import { EveryRarity, everyWeaponCategory } from '../../types'

export default function Weapons() {
  const subPage = useSelector((state: State) => state.grobalSlice.subPage)
  const filters = useSelector((state: State) => state.grobalSlice.filter)
  return (
    <main id='Weapons'>
      <div className='filterContainer'>
        <div className='filter'>
          <div className='radio'>
            {['★★★★★', '★★★★', '★★★'].map(i => {
              const filter = filters.rarity
              return (
                <span
                  key={i.length}
                  data-filter={filter[i.length as EveryRarity]}
                  onClick={() => {
                    dispatch(
                      changefilter({
                        filter: 'rarity',
                        item: i.length as EveryRarity,
                      })
                    )
                  }}
                >
                  {i}
                </span>
              )
            })}
          </div>
          <div className='radio'>
            {everyWeaponCategory.map(i => {
              const filter = filters.weaponCategory
              return (
                <span
                  key={i}
                  data-filter={filter[i]}
                  onClick={() => {
                    dispatch(
                      changefilter({ filter: 'weaponCategory', item: i })
                    )
                  }}
                >
                  {i}
                </span>
              )
            })}
          </div>
        </div>
        <div
          className='addBtn'
          onClick={() => {
            dispatch(changeSubPage('추가'))
          }}
        >
          <span>무기 추가</span>
        </div>
      </div>
      <hr />
      {subPage === '추가' ? <WeaponsAdd /> : <WeaponsList />}
    </main>
  )
}
