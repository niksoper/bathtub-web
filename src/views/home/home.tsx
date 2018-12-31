import * as React from "react";
import { Grid, Row, Col, Button, Image } from "armstrong-react";

import './home.scss'

interface IProps { }

export function HomeView(props: IProps) {
  return (
    <div className="logo-wrapper">
      <Image className="logo" source={require('../../assets/images/flyer.jpg')} />
    </div>
  );
}
