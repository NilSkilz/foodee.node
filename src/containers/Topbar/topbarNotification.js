import React, { Component } from "react";
import { Popover, Avatar } from "antd";
import { Col, Row } from "reactstrap";
import Scrollbar from "../../components/utility/customScrollBar";
import { connect } from "react-redux";
import IntlMessages from "../../components/utility/intlMessages";
import TopbarDropdownWrapper from "./topbarDropdown.style";
import RowStock from "../../customApp/components/rowStock";
import moment from "moment";

class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }

  hide() {
    this.setState({ visible: false });
  }

  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  getProduct = id => {
    const { products } = this.props;
    return products.find(p => p._id === id);
  };

  getDate = date => {
    return moment(date).fromNow();
  };

  render() {
    const { customizedTheme, logs, products } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.notification" />
          </h3>
        </div>
        <div className="isoDropdownBody">
          <Scrollbar style={{ height: 300 }}>
            {logs &&
              products &&
              logs.map(notification => (
                <a
                  className="isoDropdownListItem"
                  key={notification._id}
                  href="# "
                >
                  <Row>
                    <Col xs="9">
                      <span className="isoDate">
                        {this.getDate(notification.created_at)}
                      </span>
                      <h5 className="p-0">{`Added 1x ${
                        this.getProduct(notification.product).name
                      }}`}</h5>
                    </Col>
                    <Col xs="3">
                      <Avatar
                        shape="square"
                        size={64}
                        src={this.getProduct(notification.product).image}
                      />
                    </Col>
                  </Row>
                </a>
              ))}
          </Scrollbar>
        </div>
        <a className="isoViewAllBtn" href="# ">
          <IntlMessages id="topbar.viewAll" />
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: customizedTheme.textColor }}
          />
          <span>{logs && logs.length}</span>
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App,
  customizedTheme: state.ThemeSwitcher.topbarTheme,
  logs: state.Logs.all,
  products: state.Products.all
}))(TopbarNotification);
