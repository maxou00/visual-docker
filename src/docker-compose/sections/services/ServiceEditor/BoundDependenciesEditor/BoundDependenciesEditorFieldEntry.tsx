import {
 Button,
 FormControl,
 FormLabel,
 HStack,
 Select,
 VStack
} from '@chakra-ui/react'
import { useDockerComposeProject } from '../../../../providers/DockerComposeProvider'
import { ServiceDependency } from '../../../../types'

export default function FieldEntry({
 entry,
 onChange,
 onDelete
}: {
 entry: ServiceDependency
 onChange: (entry: ServiceDependency) => void
 onDelete: () => void
}) {
 const composer = useDockerComposeProject()

 const conditions = [
  {
   name: 'service_started'
  },
  {
   name: 'service_healthy'
  },
  {
   name: 'service_completed_successfully'
  }
 ]

 return (
  <VStack w='full' alignItems='center' spacing={2}>
   <HStack w='full' alignItems='flex-start' spacing={4}>
    <FormControl isRequired>
     <FormLabel>Service name</FormLabel>
     <Select
      size='sm'
      value={entry.label}
      onChange={(nodeEv) => {
       onChange({ ...entry, label: nodeEv.target.value })
      }}
     >
      <option value=''>Choose a Service</option>
      {composer.state.services.map((config) => {
       return (
        <option key={config.label} value={config.label}>
         {config.label}
        </option>
       )
      })}
     </Select>
    </FormControl>

    <FormControl>
     <FormLabel>Service state condition</FormLabel>
     <Select
      size='sm'
      value={entry.condition}
      onChange={(nodeEv) => {
       onChange({ ...entry, condition: nodeEv.target.value as any })
      }}
     >
      <option value=''>Choose a condition</option>
      {conditions.map((config) => {
       return (
        <option key={config.name} value={config.name}>
         {config.name}
        </option>
       )
      })}
     </Select>
    </FormControl>
   </HStack>

   <HStack w='full' justifyContent='flex-end'>
    <Button size='sm' onClick={() => onDelete()} aria-label={'unbind'}>
     Unbind this dependency
    </Button>
   </HStack>
  </VStack>
 )
}
