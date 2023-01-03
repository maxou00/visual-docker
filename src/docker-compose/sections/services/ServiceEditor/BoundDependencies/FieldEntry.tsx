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
 onChange: (entry: ServiceDependency) => any
 onDelete: () => any
}) {
 const composer = useDockerComposeProject()

 return (
  <VStack w='full' alignItems='center' spacing={2}>
   <HStack w='full' alignItems='flex-start' spacing={4}>
    <FormControl isRequired>
     <FormLabel>Service name</FormLabel>
     <Select
      value={entry.label}
      onChange={(nodeEv) => {
       onChange({ ...entry, label: nodeEv.target.value })
      }}
     >
      <option value=''>Choose a Dependences</option>
      {composer.state.dependencies.map((config) => {
       return <option value={config.label}>{config.label}</option>
      })}
     </Select>
    </FormControl>

    <FormControl>
     <FormLabel>Condition</FormLabel>
     <Select></Select>
    </FormControl>
   </HStack>

   <HStack w='full' justifyContent='flex-end'>
    <Button size='sm' onClick={() => onDelete()} aria-label={''}>
     Unbind this config
    </Button>
   </HStack>
  </VStack>
 )
}
