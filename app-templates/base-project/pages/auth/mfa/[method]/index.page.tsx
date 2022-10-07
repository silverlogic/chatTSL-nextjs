import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'
import Head from 'next/head'
import {useUser, useMfaActivate, useMfaDeactivate, useMfaConfiguration, useMfaActiveMethods, MfaMethodEnum, useMfaActivateConfirm} from '@baseapp-frontend/core'
import QRCode from "react-qr-code";
import {
  TextField,
  ButtonWithLoading,
} from '@baseapp-frontend/design-system-mui'
import { Box, Card, CardContent, Typography, Link as MuiLink } from '@mui/material'
import useNotifications from 'hooks/useNotifications';


const MfaMethod: NextPage = () => {
  const router = useRouter()
  const methodName = router.query.method
  const {showError, showSuccess} = useNotifications()
  
  const { user } = useUser()
  const [isConfirming, setIsConfirming] = useState(false)
  const [activationResult, setActivationResult] = useState<any>(null)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)

  const {activeMethods} = useMfaActiveMethods({enabled: true, onError: showError})
  const {configuration} = useMfaConfiguration({enabled: true, onError: showError})
  const {mutate: activate} = useMfaActivate({
    onSuccess: (response: any) => {
      if (methodName !== MfaMethodEnum.app) {
        // app is not sending any code
        showSuccess("Code sent!")
      }
      setIsConfirming(true)
      setActivationResult(response.data)
    }
  })
  const {mutate: deactivate} = useMfaDeactivate({onError: showError})

  function handleActivationSuccess(response: any) {
    setConfirmationResult(response.data)
  }

  const {form: codeForm} = useMfaActivateConfirm({
    method: methodName as string,
    onSuccess: handleActivationSuccess
  })

  const method = activeMethods?.find(am => am.name === methodName)
  const isActive = !!method
  const isPrimary = method?.isPrimary
  const isConfirmed = !!confirmationResult
  const hasAppCodeUrl = methodName === MfaMethodEnum.app && activationResult

  useEffect(() => {
    if (!configuration) return

    if (methodName && !configuration.methods.includes(methodName)) {
      // this method can't be used
      router.replace('/auth/mfa')
      return
    }
    
    if (methodName === MfaMethodEnum.app) {
      activate({method: methodName as string})
    }

  }, [configuration])

  function handleActivateClick() {
    activate({method: methodName as string})
  }

  function handleDeactivateClick() {
    deactivate({method: methodName as string})
  }

  const renderMethodDetails = () => {
    if (!activeMethods) return null

    if (isConfirmed) {
      return (
        <>
         {renderActivationConfirmation()}
         {renderDeactivation()}
        </>
      ) 
    }

    if (isActive) {
      return renderDeactivation()
    }

    return renderActivation()
  }

  function renderActivation() {
    return (
      <>
        {
          hasAppCodeUrl ? (
            <>
            <Typography>Scan this code in your authenticator app</Typography>
            <QRCode value={activationResult.details as string}/>
            </>
          ) : (
            <ButtonWithLoading onClick={handleActivateClick}>
              Send activation code
            </ButtonWithLoading>
          )
        }
        {
          isConfirming && renderCodeForm()
        }
      </>
    )
  }

  function renderActivationConfirmation() {
    return (
      <>
      <Typography>Method has been activated</Typography>
      {
        confirmationResult.backupCodes && (
          <Card variant="outlined">
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Here are your backup codes
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {confirmationResult.backupCodes.map((c: string) => (
                <>
                <span>
                  {c}
                </span>
                <br/>
              </>
              ))}
              </Typography>
            </CardContent>
          </Card>
        )
      }
      </>
    )
  }

  function renderDeactivation() {
    return (
      <>
        <ButtonWithLoading onClick={handleDeactivateClick}>
          Deactivate
        </ButtonWithLoading>
      </>
    )
  }

  const renderCodeForm = () => {
    return (
      <Box component="form" onSubmit={codeForm.handleSubmit} sx={{mt: 2}}>
          <TextField
              label="Code"
              name="code"
              placeholder="Enter Code"
              form={codeForm}
              fullWidth
            />
            <ButtonWithLoading type="submit" form={codeForm} sx={{mt: 2}}>
              Send
            </ButtonWithLoading>
        </Box>
    )
  }  

  return (
    <>
      <Head>
        <title>Multi-Factor Authentication | BaseApp</title>
      </Head>
      <>
        <Typography>Go back to <Link href="/auth/mfa" passHref><MuiLink>MFA overview</MuiLink></Link></Typography>
        <Typography>{`MFA method: ${methodName}`}</Typography>
        <Typography>
          <>{`Status: ${isActive ? "active" : 'inactive'}`}</>
          <>{isPrimary && `, primary`}</>
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {renderMethodDetails()}
      </Box>
      </>
    </>
  )
}

export default MfaMethod