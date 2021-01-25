import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/oceanicNext';
import Loadable from 'react-loadable';
import LoadingProvider from './loading';

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length;

  if (tokensLength === 0) {
    return tokens;
  }
  const lastToken = tokens[tokensLength - 1];

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1);
  }
  return tokens;
}

const LoadableComponent = Loadable({
  loader: () => import('./LiveProvider'),
  loading: LoadingProvider,
});

/* eslint-disable react/jsx-key */
const CodeBlock = ({ children: exampleCode, ...props }) => {
  let code;
  if(exampleCode.length > 0 && exampleCode.join)  {
    code = exampleCode.join("")
  } else {
    code = exampleCode;
  }
  // Fixme Overview 땜빵
  if (code === "||" || code.includes("let [a, b] = data") || code.includes("try a catch { | Err => ...}")) {
    return <span dangerouslySetInnerHTML={{__html:`<code>${code}<\/code>`}} />;
  }
  if (props['react-live']) {
    return <LoadableComponent code={exampleCode} />;
  } else {
    return (
      <Highlight {...defaultProps} code={code} language={props?.className?.split("-")[1] || "javascript"} theme={prismTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + ' pre'} style={style} p={3}>
            {cleanTokens(tokens).map((line, i) => {
              let lineClass = {};

              let isDiff = false;

              if (line[0] && line[0].content.length && line[0].content[0] === '+') {
                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content.length && line[0].content[0] === '-') {
                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '+') {
                lineClass = { backgroundColor: 'rgba(76, 175, 80, 0.2)' };
                isDiff = true;
              } else if (line[0] && line[0].content === '' && line[1] && line[1].content === '-') {
                lineClass = { backgroundColor: 'rgba(244, 67, 54, 0.2)' };
                isDiff = true;
              }
              const lineProps = getLineProps({ line, key: i });

              lineProps.style = lineClass;
              const diffStyle = {
                userSelect: 'none',
                MozUserSelect: '-moz-none',
                WebkitUserSelect: 'none',
              };

              let splitToken;

              return (
                <div {...lineProps} key={line + i}>
                  {line.map((token, key) => {
                    if (isDiff) {
                      if (
                        (key === 0 || key === 1) &
                        (token.content.charAt(0) === '+' || token.content.charAt(0) === '-')
                      ) {
                        if (token.content.length > 1) {
                          splitToken = {
                            types: ['template-string', 'string'],
                            content: token.content.slice(1),
                          };
                          const firstChar = {
                            types: ['operator'],
                            content: token.content.charAt(0),
                          };

                          return (
                            <React.Fragment key={token + key}>
                              <span
                                {...getTokenProps({ token: firstChar, key })}
                                style={diffStyle}
                              />
                              <span {...getTokenProps({ token: splitToken, key })} />
                            </React.Fragment>
                          );
                        } else {
                          return <span {...getTokenProps({ token, key })} style={diffStyle} />;
                        }
                      }
                    }
                    return <span {...getTokenProps({ token, key })} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    );
  }
};

export default CodeBlock;
