import React from 'react'
import BraintreeDropIn from './payment.page'
import { ViewSideManContext } from '../../providers/view-side-man.provider';

export const Visa = () => {
    const [paymentMethodNonce, setPaymentMethodNonce] = React.useState(null);
    const viewSideManContext = React.useContext(ViewSideManContext)

    React.useEffect(() => {
        viewSideManContext.setViewSideMan && viewSideManContext.setViewSideMan(false)
        // eslint-disable-next-line
    }, [])

    const handlePaymentSuccess = (nonce: any) => {
        // Handle the payment success, e.g., send the nonce to your server for further processing
        setPaymentMethodNonce(nonce);
    };
    React.useEffect(() => {
        console.log('nonce: ', paymentMethodNonce)
    }, [paymentMethodNonce])
    return (

        <div>
            <h1>React Braintree Integration</h1>
            {paymentMethodNonce ? (
                <div>
                    <h2>Payment Successful!</h2>
                    <p>Nonce: {paymentMethodNonce}</p>
                </div>
            ) : (
                <BraintreeDropIn onPaymentMethodNonce={handlePaymentSuccess} />
            )}
        </div>
    )
}
export default Visa
