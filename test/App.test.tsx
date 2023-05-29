import { queryByAttribute, render } from '@testing-library/react';

import App from '@/App';

it('should render main page', async () => {
  const queryById = queryByAttribute.bind(null, 'id');
  const dom = render(<App />);
  const keyboard = queryById(dom.container, 'calculator');
  expect(keyboard?.children.length).toBe(11);
});
