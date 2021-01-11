import React from 'react';
import styled from 'styled-components'
import { Algolia } from '@styled-icons/fa-brands/Algolia'

export const PoweredBy = () => (
  <span className="poweredBy">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
);
