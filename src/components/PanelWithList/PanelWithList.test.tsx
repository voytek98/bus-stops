import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PanelWithList, PanelWithListProps } from './';

const data = {
  title: 'Bus Line: 110',
  header: <div>Bus Stops</div>,
  label: 'stops',
  list: ['Cmentarz Grębałów', 'Cło', 'Rondo Grunwaldzkie'],
  activeItem: '',
  handleClick: vi.fn(),
};

const staticData = {
  title: 'Bus Stop: Krowodrza Górka',
  header: <div>Time</div>,
  label: 'times',
  list: ['6:37', '7:38', '10:11'],
};

const MockedPanel = (props: PanelWithListProps) => {
  const [activeItem, setActiveItem] = useState(props.activeItem);
  return (
    <PanelWithList
      {...props}
      activeItem={activeItem}
      handleClick={setActiveItem}
    />
  );
};

describe('PanelWithList', () => {
  describe('when component mounts', () => {
    it('should render panel with static list', () => {
      render(<PanelWithList {...staticData} />);
      const list = screen.getAllByRole('listitem');

      expect(screen.getByText(staticData.title)).toBeInTheDocument();
      expect(list).toHaveLength(staticData.list.length);
      list.forEach((item) => {
        expect(item).not.toHaveClass('clickable');
      });
    });

    it('should render panel with interactive list', () => {
      render(<MockedPanel {...data} />);
      const buttons = screen.getAllByRole('button');
      const list = screen.getAllByRole('listitem');

      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(list).toHaveLength(data.list.length);
      buttons.forEach((button) => {
        expect(button).not.toHaveClass('active');
      });
      list.forEach((item) => {
        expect(item).toHaveClass('clickable');
      });
    });
  });

  describe('when user interacts', () => {
    it('should set active item on click', () => {
      render(<MockedPanel {...data} />);
      const firstItem = screen.getByRole('listitem', { name: data.list[0] });
      const secondItem = screen.getByRole('listitem', { name: data.list[1] });

      expect(firstItem).not.toHaveClass('active');
      expect(secondItem).not.toHaveClass('active');

      fireEvent.click(firstItem);
      expect(firstItem).toHaveClass('active');
      expect(secondItem).not.toHaveClass('active');

      fireEvent.click(secondItem);
      expect(firstItem).not.toHaveClass('active');
      expect(secondItem).toHaveClass('active');
    });

    it('set active item when Enter or Space is pressed on it', async () => {
      render(<MockedPanel {...data} />);
      const firstItem = screen.getByRole('listitem', { name: data.list[0] });
      const secondItem = screen.getByRole('listitem', { name: data.list[1] });

      expect(firstItem).not.toHaveClass('active');
      expect(secondItem).not.toHaveClass('active');

      fireEvent.keyDown(firstItem, { key: 'Enter', code: 'Enter' });
      expect(firstItem).toHaveClass('active');
      expect(secondItem).not.toHaveClass('active');

      fireEvent.keyDown(secondItem, { key: ' ', code: 'Space' });
      expect(firstItem).not.toHaveClass('active');
      expect(secondItem).toHaveClass('active');
    });
  });
});
