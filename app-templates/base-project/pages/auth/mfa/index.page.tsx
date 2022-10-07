import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


import PhoneIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import SmsIcon from '@mui/icons-material/SmsOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { MfaMethod, useMfaActiveMethods, useMfaConfiguration} from '@baseapp-frontend/core'
import {MfaMethodEnum} from '@baseapp-frontend/core'
import useNotifications from 'hooks/useNotifications';
import { MfaMethodHumanize } from './constants';


const MfaStatus: NextPage = () => {
  const MfaMethodIcon: { [key: string]: any }  = {
    [MfaMethodEnum.email]: EmailIcon,
    [MfaMethodEnum.smsTwilio]: SmsIcon,
    [MfaMethodEnum.app]: PhoneIcon,
  }

  const {showError} = useNotifications()
  const {activeMethods} = useMfaActiveMethods({enabled: true, onError: showError})
  const {configuration} = useMfaConfiguration({enabled: true, onError: showError})

  return (
    <>
      <Head>
        <title>Multi-Factor Authentication | BaseApp</title>
      </Head>
      {
        activeMethods && configuration && (
          <>
          <Typography component="h1" variant="h5">
            Two-factor authentication
          </Typography>
          <Typography variant="body1">
          Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.
          </Typography>
          <List sx={{maxWidth: 400}}>
          { 
              configuration.methods.map((name: string, index: number) => {
                  const Icon = MfaMethodIcon[name]
                  const method = activeMethods.find(am => am.name === name)
                  return (
                    <>
                    {
                      index > 0 && <Divider component="li" />
                    }
                    <ListItem key={name}>
                      <ListItemAvatar>
                          <Icon/>
                      </ListItemAvatar>
                      <ListItemText primary={MfaMethodHumanize[name as MfaMethod]} secondary={
                        <>
                        {
                        method ? (
                          <Typography color="success.main">active</Typography>
                        ) : (
                          <Typography>inactive</Typography>
                        )
                        }
                        {
                          method?.isPrimary && <Typography>{'Primary'}</Typography>
                        }
                        </>
                      } />
                      <Link href={`/auth/mfa/${name}`} passHref>
                      <IconButton edge="end">
                          <ChevronRightIcon/>
                      </IconButton>
                      </Link>
                    </ListItem>
                  </>
              )})
          }
          </List>
          </>
        )
      }
    </>
  )
}

export default MfaStatus