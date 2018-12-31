import * as React from "react";
import * as Redux from "redux";
import { compose } from "redux";
import { State } from "../redux/state";
import { withRouter, InjectedRouter, Link } from "react-router";
import { Grid, Row, Col, Icon, Image, BurgerMenu, BurgerMenuItem } from "armstrong-react";
import { connect } from "react-redux";
import { IRouteComponentProps } from "../typings/app";

import "./shell.scss";

declare var FastClick: { attach(element: HTMLElement): void };

interface IProps extends IRouteComponentProps {
  logout: () => any;
}

export class Shell extends React.Component<IProps, {}> {
  render() {
    return (
      <main className="shell">
        {/* <Grid>
          <Row className="header">
            <Col width={45}>
              <BurgerMenu closeOnNavigate={true} buttonIcon={Icon.Icomoon.menu7} bodyId="host" mode="slide">
                <BurgerMenuItem title="Home" onClick={() => this.props.router.push("/")} />
              </BurgerMenu>
            </Col>
            <Col className="title" verticalAlignment="center" horizontalAlignment="center"></Col>
            <Col width={45} />
          </Row>
        </Grid> */}

        {this.props.children}
      </main>
    )
  }
}
