import React from 'react'
import notFound from '../../assets/404.svg'

const NotFound = () => {
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