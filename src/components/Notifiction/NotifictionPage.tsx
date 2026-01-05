


import { varfiyMyAccount } from '@/utils/verfiyToken'
import Notifiction from './Notifiction'
import { Notification, User } from '@prisma/client'

const NotifictionPage = async () => {
    const user: User & { Notification: Notification[] } = await varfiyMyAccount()

    
    return (

        <Notifiction user={user} />
    )
}

export default NotifictionPage
