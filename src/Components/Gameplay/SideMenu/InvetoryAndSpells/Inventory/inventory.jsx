import './inventory.scss'
import InventoryFrame from '../InventoryFrame/inventory-frame'
import InventorySlot from '../../../../Common/InventorySlot/inventory-slot'
import ExtraSlotLine from './ExtraSlotLine/extra-slot-line'
import { useDispatch, useSelector } from 'react-redux'
import { selectExtraSlotState, selectInventorySlots, selectInvSlot, selectSelectedItemIndex } from '../../../../../redux/GameplaySlices/InventorySlice'

export default function Inventory() {
  const inventory = useSelector(selectInventorySlots)
  const extraSlotLines = useSelector(selectExtraSlotState)
  const dispatch = useDispatch()
  const selectedItem = useSelector(selectSelectedItemIndex)
  const onSelectItem = item => {
    if (item.index !== selectedItem) {
      dispatch(selectInvSlot(item.index))
      window.parent.BabelUI.UpdateSelectedInvSlot(item.index)
    }
  }
  const onActivateItem = item => {
    window.parent.BabelUI.UseInvSlotIndex(item.index)
  }
  return (
    <div className='inventory-area'>
      <InventoryFrame styles='item-list' >
        <div className='main-inv'>
        {
          inventory.slice(0,24).map( (item,index) => (
            <InventorySlot key={item.index} content={item} 
                            onSelect={onSelectItem} 
                            onActivate={onActivateItem}
                            selected={index === selectedItem}/>
          ))
        }
        </div>
        <div className='locked-lines'>
          <ExtraSlotLine locked={!extraSlotLines[0]} 
                          inventory={inventory} start={24} 
                          selectedItem={selectedItem}
                          onSelect={onSelectItem} 
                          onActivate={onActivateItem}/>
          <ExtraSlotLine locked={!extraSlotLines[1]} 
                         inventory={inventory} start={30} 
                         selectedItem={selectedItem}
                         onSelect={onSelectItem} 
                         onActivate={onActivateItem}/>
          <ExtraSlotLine locked={!extraSlotLines[2]} 
                         inventory={inventory} start={36} 
                         selectedItem={selectedItem}
                         onSelect={onSelectItem} 
                         onActivate={onActivateItem}/>
        </div>
      </InventoryFrame>
      <span className='delete-item'></span>
    </div>
  )
}