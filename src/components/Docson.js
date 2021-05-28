import React from 'react';
import styled from 'styled-components';

const Docson = ({ src }) => {
  const rendererURL = 'https://lbovet.github.io/docson/index.html'
  const docsonRef = React.createRef();
  React.useEffect(() => {
    let iframe = docsonRef.current;

    window.addEventListener('message', (e) => {
      let message = e.data;
      iframe.style.height = message.height + 'px';
      iframe.style.width = message.width + 'px';
    }, false);

  }, [])

  const StyledIFrame = styled('iframe')`
    width: 100%;
    overflow: hidden;
  `
  return <StyledIFrame
    frameBorder="0"
    src={`${rendererURL}#${src}`}
    ref={docsonRef}
  />
}
export default Docson;
