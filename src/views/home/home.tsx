import * as React from 'react'
import { Grid, Row, Col, Button, Image } from 'armstrong-react'
import { Credits } from '../credits/credits'

import './home.scss'

interface IProps {}

export function HomeView(props: IProps) {
  return (
    <div>
      <div className="logo-wrapper">
        <Image className="logo" source={require('../../assets/images/logo.svg')} />
      </div>
      <Credits />
    </div>
  )
}
