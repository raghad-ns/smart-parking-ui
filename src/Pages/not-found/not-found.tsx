import React from 'react'
import notFound from '../../assets/404.svg'
import { ViewSideManContext } from '../../providers/view-side-man.provider'

const NotFound = () => {
    const viewSideManContext = React.useContext(ViewSideManContext)
  React.useEffect(() => {
    viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    return (
        <div >
            <img src={notFound} alt="404" style={{ height: '70%', width: '100%' }} />
            <h1 style={{
                position: 'relative', bottom: '69px',
                left: '435px',
                color: '#0e0d70'
            }}>Page not found</h1>
        </div>
    )
}

export default NotFound