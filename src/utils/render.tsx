import { ReactNode } from 'react'
import { Center } from "@chakra-ui/react"

export const displayNonData = (nonData: ReactNode): ReactNode => (
    <Center width="100%" minH={120}>{nonData}</Center>
)