import { FormControl, FormHelperText, Input, Link } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
interface DVInputProps {
 labelLink?: string
 label?: string
 value?: string
 onChange?: (event: ChangeEvent<HTMLInputElement>) => void
 isRequired?: boolean
 placeholder?: string
 helperText?: string
}
export default function DVInput({
 onChange,
 value,
 label,
 labelLink,
 isRequired = false,
 placeholder,
 helperText
}: DVInputProps) {
 return (
  <FormControl isRequired={isRequired}>
   {label && <Link href={labelLink}>{label}</Link>}
   <Input
    value={value}
    size='sm'
    onChange={onChange}
    variant='outline'
    placeholder={placeholder ?? ''}
   />
   {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
 )
}
