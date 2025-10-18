import {DictionaryItem, DictionaryModal} from '@/components/DictionaryModal'

const demoItems: DictionaryItem[] = [
  {id: 'apple', name: 'Apple', imageSrc: 'assets/images/characters/placeholder.png', definition: 'Heals a little.'},
  {id: 'gem', name: 'Blue Gem', imageSrc: 'assets/images/characters/placeholder.png', definition: 'Crafting material.'},
  {id: 'potion', name: 'Potion', imageSrc: 'assets/images/characters/placeholder.png', definition: 'Regeneration.'},
  {id: 'key', name: 'Old Key', imageSrc: 'assets/images/characters/placeholder.png', definition: 'Opens a door.'}
  // add up to 9; fewer will show “Empty” slots
]

export function Dictionary() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Dictionary page</h2>
      <DictionaryModal items={demoItems} title="3×3 Dictionary" onSelect={item => console.log('Selected:', item)} />
    </div>
  )
}
