import {
 Button,
 HStack,
 Input,
 InputGroup,
 InputRightAddon,
 VStack
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { X } from 'phosphor-react'
import { useCallback, useState } from 'react'

type Entry = {
 id: string
 title: string
 value: string
}

const initial = { id: nanoid(), title: '', value: '' }
const FieldEntry = ({
 entry,
 onChange,
 onDelete
}: {
 entry: Entry
 onChange: (entry: Entry) => any
 onDelete: () => any
}) => {
 return (
  <HStack w='full' spacing={2}>
   <Input
    flexGrow={1}
    placeholder='Label'
    value={entry.title}
    onChange={({ target }) => onChange({ ...entry, title: target.value })}
   />
   <InputGroup flexGrow={2}>
    <Input
     placeholder='Value'
     value={entry.value}
     onChange={({ target }) => onChange({ ...entry, value: target.value })}
    />
    <InputRightAddon onClick={() => onDelete()}>
     <X />
    </InputRightAddon>
   </InputGroup>
  </HStack>
 )
}

export default function KeyValueInput({
 value,
 onChange
}: {
 value: any
 onChange: (v: any) => any
}) {
 const [keys, setKeys] = useState<Entry[]>([initial])

 const onAppendKey = useCallback(() => {
  let cpy = [...keys]
  cpy.push({ id: nanoid(), title: '', value: '' })
  onChange(cpy)
  setKeys(cpy)
 }, [keys, onChange])

 const onEntryChange = useCallback(
  (id: string, entry: Entry) => {
   let cpy = [...keys]
   let index = cpy.findIndex((k) => k.id === id)
   if (index > -1) {
    cpy[index] = entry
   }
   onChange(cpy)
   setKeys(cpy)
  },
  [keys, onChange]
 )

 const onDeleteEntry = useCallback(
  (id: string) => {
   const cpy = [...keys].filter((item) => item.id !== id)
   onChange(cpy)
   setKeys(cpy)
  },
  [keys, onChange]
 )

 return (
  <VStack w='full' spacing={4}>
   {keys.map((k) => {
    return (
     <FieldEntry
      entry={k}
      key={k.id}
      onChange={(entry) => onEntryChange(k.id, entry)}
      onDelete={() => onDeleteEntry(k.id)}
     />
    )
   })}
   <HStack w='full' justifyContent='flex-start'>
    <Button variant='ghost' size='sm' onClick={onAppendKey}>
     Add another field
    </Button>
   </HStack>
  </VStack>
 )
}
