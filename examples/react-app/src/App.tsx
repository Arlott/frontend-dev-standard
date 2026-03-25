import React from 'react';

interface Props {
  name: string;
}

function App({ name }: Props): React.JSX.Element {
  return <div>Hello, {name}!</div>;
}

export default App;
