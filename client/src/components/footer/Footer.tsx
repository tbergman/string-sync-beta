import * as React from 'react';
import styled from 'styled-components';

const FooterOuter = styled.div`
  width: 100%;
`;
const FooterInner = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  max-width: 980px;
  text-align: center;
`;

const Footer = () => (
  <FooterOuter>
    <FooterInner>
      <span>StringSync © 2017 Created by </span>
      <span>
        <a href="http://instagram.com/jaredplaysguitar/">
          Jared Johnson
        </a>
      </span>
    </FooterInner>
  </FooterOuter>
);

export default Footer;
