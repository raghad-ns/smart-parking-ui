import React from "react"
import { ViewSideManContext } from "../../providers/view-side-man.provider"

const Info = () => {
    const viewSideManContext = React.useContext(ViewSideManContext)
    React.useEffect(() => {
        viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="page-wrapper">
            <div className="form-wrapper">
                Password set successfully!
                <br />
                You can now login with your credentials and get use of our services
            </div>
        </div>
    )
}

export default Info