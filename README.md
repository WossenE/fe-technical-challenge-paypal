# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

    *Answer*: 

   A. Async Logic in Render: The render method contains asynchronous logic (sleepUntilSubmitted). This is not ideal as the render method should be synchronous and not contain logic that may cause delays.

   B. Direct Manipulation of window: Directly accessing the window object (window['paypal']) within a component is not recommended in React, as it can lead to issues, for example, in testing.

   C. HOC connect Usage: The usage of connect HOC makes the component less reusable and ties it closely to the specific connect API, potentially causing coupling issues.Using hooks is generally preferred over HOC in modern React.

   D. Uses class based component.

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).
   *Explanation*: 
   I was able to get rid of the HOC by using const formik = useFormikContext<PayPalFormValues>()
Generally, the connect HOC can be replaced by useFormik hook, or passing a render prop to the Formik component. I did not take either of these approaches simply because I did not want to change the API for the parent component.

4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

    *Answer*: 
    While researching this issue, I came across the following
https://stackoverflow.com/questions/73737311/formik-renders-twice-on-initialization

Double rendering occurs when we use Strict Mode because useEffect, and certain other hooks, are called twice by React.

First of all, we may ignore the issue since it only happens in development mode, i.e. production behavior is unchanged.
Alternatively, we can follow the answer in the above StackOverflow, but that involves editing a file in node_modules. Hence, our fix would only apply to our development environment, and we may run into issues after deployment.

Lastly, we can choose to put the button in part of the DOM tree that is not wrapped with React.StrictMode.

According to this post, https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react, the React team has intentinally added this behavior, and we should try to work with it, instead of finding ways around it.

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
