import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { PayPalButtonsComponentOptions } from '@paypal/paypal-js'
import { useFormikContext } from 'formik'

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPalButtonsComponentOptions['style']

type PayPalFormValues = { _paypal_token?: string }

type PayPalButtonProps = {}

const PayPalButtonFunctionComponent: React.FC<PayPalButtonProps> = () => {
  const formik = useFormikContext<PayPalFormValues>()
  const { submitForm, values, isValid, isSubmitting, setSubmitting } = formik

  const createOrderOrBillingAgreement = useCallback(async () => {
    submitForm() // submit will call api with form values and inject _paypal_token into the form values
    await sleepUntilSubmitted()
    if (isValid) setSubmitting(true)
    return values._paypal_token!
  }, [submitForm, isValid, setSubmitting, values])

  const sleepUntilSubmitted = async () => {
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    while (isSubmitting) {
      await sleep(100)
    }
  }

  const onApprove = async () => {
    // do something on success
  }

  const { paypal } = window
  if (!paypal) return null

  const Button = (paypal.Buttons! as any).driver('react', {
    React,
    ReactDOM,
  }) as React.ComponentType<PayPalButtonsComponentOptions & { commit: boolean; env: string }>

  return (
    <div>
      <div style={isSubmitting ? { display: 'none' } : {}}>
        <Button
          commit
          env="sandbox"
          createBillingAgreement={createOrderOrBillingAgreement}
          onApprove={onApprove}
          onCancel={() => setSubmitting(false)}
          onError={() => setSubmitting(false)}
          style={buttonStyle}
        />
      </div>
    </div>
  )
}

export default PayPalButtonFunctionComponent