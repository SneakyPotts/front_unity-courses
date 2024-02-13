import type { PropsWithChildren } from 'react'

import type { TabsProps } from '@UI/Tabs/Tabs.props'

export type PageWrapperProps = PropsWithChildren<{ list?: undefined } | TabsProps>
