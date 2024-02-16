import type { PropsWithChildren } from 'react'

import type { TabsProps } from '_ui/Tabs/Tabs.props'

export type PageWrapperProps = PropsWithChildren<{ list?: undefined } | TabsProps>
