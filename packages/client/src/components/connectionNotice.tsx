import {useLocation} from "react-router-dom"
import {AppContext, NetworkConfig} from "../App"
import {CreditLine} from "../ethereum/creditLine"
import {UnlockedStatus, User} from "../ethereum/user"
import useNonNullContext from "../hooks/useNonNullContext"
import {Session, useSession, useSignIn} from "../hooks/useSignIn"
import UnlockUSDCForm from "./unlockUSDCForm"
import VerifyAddressBanner from "./verifyAddressBanner"
import {useForm, FormProvider} from "react-hook-form"
import LoadingButton from "./loadingButton"
import {KYC} from "../hooks/useGoldfinchClient"
import {AsyncResult} from "../hooks/useAsync"
import {assertNonNullable} from "../utils"

export interface ConnectionNoticeProps {
  creditLine?: CreditLine
  requireGolist?: boolean
  requireUnlock?: boolean
  requireSignIn?: boolean
  requireKYC?: {kyc: AsyncResult<KYC>; condition: (KYC: KYC) => boolean}
}

function SignInBanner() {
  const [, signIn] = useSignIn()
  const formMethods = useForm()

  return (
    <FormProvider {...formMethods}>
      <div className="info-banner background-container">
        <div className="message">Please sign in to continue.</div>
        <LoadingButton action={signIn} text="Sign in" />
      </div>
    </FormProvider>
  )
}

function TextBanner({children}: React.PropsWithChildren<{}>) {
  return (
    <div className="info-banner background-container">
      <div className="message">{children}</div>
    </div>
  )
}

interface ConditionProps extends ConnectionNoticeProps {
  network: NetworkConfig
  user: User
  session: Session
  location: any
}

interface ConnectionNoticeStrategy {
  devName: string
  match: (props: ConditionProps) => boolean
  render: (props: ConditionProps) => JSX.Element
}

export const strategies: ConnectionNoticeStrategy[] = [
  {
    devName: "install_metamask",
    match: (_props) => !(window as any).ethereum,
    render: (_props) => (
      <TextBanner>
        In order to use Goldfinch, you'll first need to download and install the Metamask plug-in from{" "}
        <a href="https://metamask.io/">metamask.io</a>.
      </TextBanner>
    ),
  },
  {
    devName: "wrong_network",
    match: ({network}) => !!network.name && !network.supported,
    render: (_props) => (
      <TextBanner>
        It looks like you aren't on the right Ethereum network. To use Goldfinch, you should connect to Ethereum Mainnet
        from Metamask.
      </TextBanner>
    ),
  },
  {
    devName: "not_connected_to_metamask",
    match: ({user, session}) => user.web3Connected && session.status === "unknown",
    render: (_props) => (
      <TextBanner>
        You are not currently connected to Metamask. To use Goldfinch, you first need to connect to Metamask.
      </TextBanner>
    ),
  },
  {
    devName: "not_signed_in",
    match: ({session, requireSignIn}) => !!requireSignIn && session.status !== "authenticated",
    render: (_props) => <SignInBanner />,
  },
  {
    devName: "no_credit_line",
    match: ({user, creditLine}) => user.loaded && !!creditLine && creditLine.loaded && !creditLine.address,
    render: (_props) => (
      <TextBanner>
        You do not have any credit lines. To borrow funds from the pool, you need a Goldfinch credit line.
      </TextBanner>
    ),
  },
  {
    devName: "no_golist",
    match: ({user, requireGolist}) => user.loaded && !user.goListed && !!requireGolist,
    render: (_props) => <VerifyAddressBanner />,
  },
  {
    devName: "kyc_error",
    match: ({requireKYC}) => {
      if (!requireKYC) {
        return false
      }
      const {kyc} = requireKYC
      return kyc.status === "errored"
    },
    render: (_props) => <TextBanner>Something went wrong. Please refresh the page and try again.</TextBanner>,
  },
  {
    devName: "kyc_loading",
    match: ({requireKYC}) => {
      if (!requireKYC) {
        return false
      }
      const {kyc} = requireKYC
      return kyc.status === "loading" || kyc.status === "idle"
    },
    render: (_props) => <TextBanner>Loading...</TextBanner>,
  },
  {
    devName: "kyc_succeeded",
    match: ({requireKYC, user}) => {
      if (!requireKYC) {
        return false
      }
      const {kyc} = requireKYC
      if (kyc.status !== "succeeded") {
        return false
      }
      const kycStatus = kyc.value
      return !requireKYC.condition(kycStatus)
    },
    render: (_props) => <VerifyAddressBanner />,
  },
  {
    devName: "require_unlock",
    match: ({requireUnlock, location, user}) => {
      let unlockStatus = getUnlockStatus({location, user})
      return user.loaded && !!requireUnlock && !!unlockStatus && !unlockStatus.isUnlocked
    },
    render: ({location, user}) => {
      let unlockStatus = getUnlockStatus({location, user})
      assertNonNullable(unlockStatus)
      return <UnlockUSDCForm unlockAddress={unlockStatus.unlockAddress} />
    },
  },
]

function getUnlockStatus({location, user}: {location: any; user: User}): UnlockedStatus | null {
  let unlockStatus: UnlockedStatus | null = null
  if (location.pathname.startsWith("/pools/senior")) {
    unlockStatus = user.getUnlockStatus("earn")
  } else if (location.pathname.startsWith("/borrow")) {
    unlockStatus = user.getUnlockStatus("borrow")
  }
  return unlockStatus
}

function ConnectionNotice(props: ConnectionNoticeProps) {
  props = {
    requireUnlock: true,
    requireGolist: false,
    requireSignIn: false,
    ...props,
  }
  const {network, user} = useNonNullContext(AppContext)
  const session = useSession()
  let location = useLocation()

  const strategyProps = {
    network,
    user,
    session,
    location,
    ...props,
  }

  for (let strategy of strategies) {
    if (strategy.match(strategyProps)) {
      return strategy.render(strategyProps)
    }
  }

  return null
}

export default ConnectionNotice