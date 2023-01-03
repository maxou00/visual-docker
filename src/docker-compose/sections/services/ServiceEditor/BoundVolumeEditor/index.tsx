import { HStack, Text, VStack } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../../../../../components/Buttons/Primary'
import FieldEntry, { Entry } from './FieldEntry'

export default function BoundVolumeConfigEditor({
 value,
 onChange
}: {
 value: any
 onChange: (v: any) => any
}) {
 const [keys, setKeys] = useState<Entry[]>([])

 const onAppendKey = useCallback(() => {
  let cpy = [...keys]
  let collide = cpy.findIndex((c) => c.source === '')
  if (collide > -1) {
   toast.error('Please edit the existing source entry before adding another')
   return
  }
  cpy.push({
   id: nanoid(),
   source: '',
   type: 'volume'
  })
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
  <VStack w='full' alignItems='flex-start' spacing={4}>
   <VStack w='full' alignItems='flex-start' spacing={2}>
    <Text>Associated Volumes</Text>
    <Text fontSize='sm'>Here are listed volumes bound to this service.</Text>
   </VStack>
   <VStack w='full' spacing={4}>
    {keys.map((k) => {
     return (
      <FieldEntry
       entry={k}
       key={k.id}
       onChange={(entry) => onEntryChange(k.id || '', entry)}
       onDelete={() => onDeleteEntry(k.id || '')}
      />
     )
    })}
    <HStack w='full' justifyContent='flex-end'>
     <PrimaryButton variant='ghost' size='sm' onClick={onAppendKey}>
      Bind a volume
     </PrimaryButton>
    </HStack>
   </VStack>
  </VStack>
 )
}
