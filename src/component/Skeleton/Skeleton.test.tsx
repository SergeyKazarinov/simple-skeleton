import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  test('render with default props', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector('[data-testid="skeleton"]');

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton');
    expect(skeleton).toHaveClass('wave');
    expect(skeleton).toHaveStyle({ width: '100px', height: '100%' });
    expect(skeleton).not.toHaveStyle({ '--simple-skeleton-animation-speed': '1.5s' });
    expect(skeleton).not.toHaveStyle({ '--simple-skeleton-bg': 'red' });
    expect(skeleton).not.toHaveStyle({ '--simple-skeleton-highlight': 'red' });
    expect(skeleton).not.toHaveStyle({ '--simple-skeleton-shadow': 'red' });
  });

  test('render with custom props', () => {
    const { container } = render(
      <Skeleton
        className="custom-skeleton"
        width={200}
        height={200}
        border="10px"
        backgroundColor="red"
        highlightColor="blue"
        shadowColor="green"
        animation="pulse"
        animationSpeed={1.5}
      />,
    );

    const skeleton = container.querySelector('[data-testid="skeleton"]');

    expect(skeleton).toHaveStyle({
      width: '200px',
      height: '200px',
      '--simple-skeleton-animation-speed': '1.5s',
      '--simple-skeleton-bg': 'red',
      '--simple-skeleton-highlight': 'blue',
      '--simple-skeleton-shadow': 'green',
    });
    expect(skeleton).toHaveClass('custom-skeleton');
    expect(skeleton).toHaveClass('pulse');
  });
});
